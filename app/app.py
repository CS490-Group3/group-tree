# pylint: disable=no-member

"""
Template Flask app
"""
import datetime
import json
import os
from typing import List, Union

import flask_login
import requests
from dotenv import load_dotenv, find_dotenv
from flask import Flask, request, send_from_directory

from app.exts import db
import app.models as models


load_dotenv(find_dotenv())


flask_app = Flask(__name__, static_folder="../build/static")
flask_app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
flask_app.secret_key = os.getenv("FLASK_LOGIN_SECRET_KEY")
login_manager = flask_login.LoginManager(flask_app)


class User(flask_login.UserMixin, models.Person):
    """
    Class that Flask-Login needs for some obscure reason.
    """


@login_manager.user_loader
def load_user(user_id):
    """
    `user_loader` callback needed by Flask-Login. Maps user ID to User object.
    """
    return User.query.get(user_id)


def add_user(sub, name):
    """ helper method to add new user to database """
    temp = models.Person.query.filter_by(id=sub).first()
    if not temp:
        # working with database
        new_user = models.Person(id=sub, username=name)
        db.session.add(new_user)
        db.session.commit()


def add_event_info(activity, time, contact_id):
    """ helper method to add events to database """

    date_time_obj = datetime.datetime.strptime(time, "%Y-%m-%d")
    print(contact_id)
    event = models.Event(
        activity=activity, time=date_time_obj, contact_id=contact_id, period=0
    )
    db.session.add(event)

    db.session.commit()


def get_number_days(frequency):
    """helper method that returns the number of days based on input type"""
    days = 1
    if frequency == "single":
        days = 0
    elif frequency == "daily":
        days = 1
    elif frequency == "weekly":
        days = 7
    elif frequency == "biweekly":
        days = 14
    elif frequency == "monthly":
        days = 30
    return days


def get_closest_date(time_now, event_list):
    """
    Helper method to get the next closest date.
    Needs an in ordered list of date from "smaller" dates.
    Needs time now we don't get dates before current date.
    """
    time = None
    # Obtaining closest date
    for time in event_list:
        if time > time_now:
            return time
    return "No Event"


def get_next_occurrence(
    event: models.Event, now: datetime.datetime
) -> Union[datetime.datetime, None]:
    """
    Gets the next occurrence of `event` from `now`.
    """
    if event.period is None:  # the event is nonrecurring
        if now <= event.start_time:
            return event.start_time
        return None

    # the event is recurring
    if now <= event.start_time:
        return event.start_time

    # calculate the event's most recent occurrence
    period = datetime.timedelta(days=event.period)
    diff = now - event.start_time
    most_recent = event.start_time + (diff - diff % period)

    if most_recent == now:
        return most_recent
    return most_recent + period


def complete_event(event: models.Event, now: datetime.datetime) -> bool:
    """
    Marks an event as completed, using `now` as the time of completion. Returns `True` on
    success, `False` otherwise.
    """
    next_occur = get_next_occurrence(event, now)

    if next_occur is not None and (
        event.complete_time is None or event.complete_time < next_occur
    ):
        event.complete_time = now
        db.session.commit()
        return True
    return False


def event_occurs_on_date(event: models.Event, date: datetime.date) -> bool:
    """
    Determines if `event` occurs on `date`.
    """
    # convert date to datetime
    date_with_time = datetime.datetime(
        date.year, date.month, date.day, tzinfo=datetime.timezone.utc
    )
    next_occur = get_next_occurrence(event, date_with_time)

    return next_occur is not None and next_occur.date() == date


def get_events_by_date(
    person: models.Person, date: datetime.date
) -> List[models.Event]:
    """
    Get all events that occur on the specified date.
    """
    return [event for event in person.events if event_occurs_on_date(event, date)]


@flask_app.route("/api/v1/contacts", methods=["DELETE", "GET", "POST"])
@flask_login.login_required
def api_contacts():
    """
    Endpoint for API calls regarding contacts. The functionality is dependent on the HTTP
    method.
    """
    user = flask_login.current_user
    # delete a contact given the contact ID
    if request.method == "DELETE":
        contact_id = request.args.get("id")
        contact = models.Contact.query.get(contact_id)

        # check if the contact exists and belongs to the user
        if contact is not None and contact.person.id == user.id:
            db.session.delete(contact)
            db.session.commit()

            return ("", 204)  # No Content
        return ("", 404)  # Not Found
    # get a list of the user's contacts
    if request.method == "GET":
        return json.dumps(
            [
                {
                    "id": contact.id,
                    "name": contact.name,
                    "email": contact.email,
                    "phone": contact.phone,
                }
                for contact in user.contacts
            ]
        )
    # add a new contact
    if request.method == "POST":
        request_data = request.get_json()
        new_contact = models.Contact(
            name=request_data["name"],
            email=request_data["email"],
            phone=request_data["phone"],
            person_id=user.id,
        )
        db.session.add(new_contact)
        db.session.commit()

        return ("", 204)  # No Content

    return ("", 405)  # Method Not Allowed


@flask_app.route("/api/v1/events", methods=["GET", "POST"])
@flask_login.login_required
def api_events():
    """
    Endpoint for API calls regarding events. The functionality is dependent on the HTTP
    method.
    """
    user = flask_login.current_user
    # get a dictionary partitioned by contact where each entry is a list of events
    if request.method == "GET":
        return {
            contact.id: [
                {
                    "id": event.id,
                    "activity": event.activity,
                    "start_time": event.start_time,
                    "period": event.period,
                }
                for event in contact.events
            ]
            for contact in user.contacts
        }
    # add a new event
    if request.method == "POST":
        request_data = request.get_json()
        print(request_data)
        period = request_data["period"]
        new_event = models.Event(
            activity=request_data["activity"],
            start_time=request_data["start_time"],
            period=int(period) if period is not None else None,
            contact_id=int(request_data["contact_id"]),
        )
        # check if the contact exists and belongs to the user
        contact = models.Contact.query.get(new_event.contact_id)
        if contact is not None and contact.person_id == user.id:
            db.session.add(new_event)
            db.session.commit()

            return ("", 204)  # No Content
        return ("", 404)  # Not Found

    return ("", 405)  # Method Not Allowed


@flask_app.route("/api/v1/events/complete", methods=["POST"])
@flask_login.login_required
def api_events_complete():
    """
    Endpoint for API calls for completing events.
    """
    now = datetime.datetime.now(datetime.timezone.utc)
    user = flask_login.current_user

    request_data = request.get_json()
    event_id = request_data["id"]
    event = models.Event.query.get(event_id)

    # check if the event exists and belongs to the user
    if event is not None and event.contact.person_id == user.id:
        if complete_event(event, now):
            return ("", 204)  # No Content
        return ("", 403)  # Forbidden
    return ("", 404)  # Not Found


@flask_app.route("/login", methods=["POST"])
def login():
    """
    Endpoint for logging in with Google's login API.
    """
    request_data = request.get_json()

    if request_data:
        token = request_data.get("token")

        # ask Google to validate the token, instead of doing it manually
        google_response = requests.get(
            "https://www.googleapis.com/oauth2/v3/tokeninfo", {"id_token": token}
        )

        if google_response:  # user has been authenticated
            profile = google_response.json()
            sub = profile["sub"]  # can use as primary key
            name = profile["name"]
            # email = profile["email"]

            # add new user to database if not already there
            user_id = str(sub)
            if not models.Person.query.get(user_id):
                new_person = models.Person(id=user_id, name=name)
                db.session.add(new_person)
                db.session.commit()

            user = User.query.get(user_id)
            if flask_login.login_user(user):
                return {"success": True}

    return {"success": False}


@flask_app.route("/logout", methods=["POST"])
@flask_login.login_required
def logout():
    """
    Endpoint for logging out.
    """
    if flask_login.logout_user():
        return {"success": True}

    return {"success": False}


@flask_app.route("/", defaults={"filename": "index.html"})
@flask_app.route("/<path:filename>")
def index(filename):
    """
    Serves files from ../build
    """
    return send_from_directory("../build", filename)


if __name__ == "__main__":
    db.create_all()
    flask_app.run(
        host=os.getenv("IP", "0.0.0.0"),
        port=8081 if os.getenv("C9_PORT") else int(os.getenv("PORT", "8081")),
    )
