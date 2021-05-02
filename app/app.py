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


def update_tree_points(person_id, days_late):
    """
    Updates the `tree_points` column in person.
    Uses person_id to identify and the amount of late days to calculate points
    """
    points = 0
    if days_late <= 1:
        points = 7
    if days_late == 2:
        points = 6
    if days_late == 3:
        points = 5
    if days_late == 4:
        points = 4
    if days_late == 5:
        points = 3
    if days_late == 6:
        points = 2
    if days_late >= 7:
        points = 1

    person = models.Person.query.filter_by(id=person_id).first()
    person.tree_points += points
    db.session.commit()


# This updates a given person with person_id and days_late to compute points
# update_tree_points("101263858443596549461", 1)


def get_tree_index(person_id):
    """
    Computes the tree index to be sent to client
    This will be the index array of what image of tree that should be displayed
    """
    person = models.Person.query.filter_by(id=person_id).first()
    tree_points = person.tree_points
    tree_index = 0
    if 7 <= tree_points < 21:
        tree_index = 1
    if 21 <= tree_points < 42:
        tree_index = 2
    if 42 <= tree_points < 98:
        tree_index = 3
    if tree_points >= 98:
        tree_index = 4
    return tree_index


# get_tree_index("101263858443596549461")


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
    date_with_time = datetime.datetime(date.year, date.month, date.day)
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
        contacts = []
        for contact in user.contacts:
            #get all the occurence for each event
            now = datetime.datetime.now()
            occurences = []
            for event in contact.events:
                next_occur = get_next_occurrence(event, now)
                occurences.append(next_occur - now)
            
            print(contact.name, " : ", occurences)

            d = {
                    "id": contact.id,
                    "name": contact.name,
                    "email": contact.email,
                    "phone": contact.phone,
                }
            
            contacts.append(d)
        return json.dumps(contacts)

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


@flask_app.route("/api/v1/treeview", methods=["GET"])
@flask_login.login_required
def api_tree_points():
    """
    Endpoint for API calls tree points for the user
    """
    user = flask_login.current_user

    if request.method == "GET":
        return json.dumps([{"tree_points": user.tree_points}])

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
        date_string = request.args.get("date", None)
        try:
            date = (
                datetime.datetime.strptime(date_string, "%Y-%m-%d").date()
                if date_string is not None
                else None
            )
        except ValueError:
            return ("date format error", 400)  # Bad Request

        return {
            str(contact.id): [
                {
                    "id": event.id,
                    "activity": event.activity,
                    "start_time": event.start_time,
                    "period": event.period,
                }
                for event in contact.events
                if date is None or event_occurs_on_date(event, date)
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
            complete_time=None,
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
    now = datetime.datetime.now(datetime)
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
                new_person = models.Person(id=user_id, name=name, tree_points=0)
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
