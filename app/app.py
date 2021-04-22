# pylint: disable=no-member
# pylint: disable=too-many-arguments

"""
Template Flask app
"""

import datetime
import json
import os

import flask_login
import requests
from dotenv import load_dotenv, find_dotenv
from flask import Flask, request, Response, send_from_directory

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


def add_event_info(
    contact_name, user_name, activity, date_time, person_id, frequency, amount
):
    """ helper method to add events to database """
    user_name = "admin"
    days = get_number_days(frequency)

    date_time_obj = datetime.datetime.strptime(date_time, "%Y-%m-%d")
    for i in range(int(amount)):
        time_change = datetime.timedelta(days=days * i)
        new_time = date_time_obj + time_change
        event = models.Events(
            contact_name=contact_name,
            user_name=user_name,
            activity=activity,
            date_time=new_time,
            person_id=person_id,
        )
        db.session.add(event)

    db.session.commit()


def get_number_days(frequency):
    """helper method that returns the number of days based on input type"""
    days = 1
    if frequency == "Single":
        days = 0
    elif frequency == "Daily":
        days = 1
    elif frequency == "Weekly":
        days = 7
    elif frequency == "Biweekly":
        days = 14
    elif frequency == "Monthly":
        days = 30
    return days


def get_user_events(person_id):
    """
    Helper method to get events from database
    """
    result = models.Events.query.get(person_id)
    contacts = []
    for row in result:
        r_dict = dict(row.items())  # convert to dict keyed by column names
        contacts.append(r_dict)
    # This returns a dictionary that contains key,value pairs of each data from database
    return contacts


def get_next_reminder(person_id, contact_name):
    """
    Helper method to get events from database
    """
    events = (
        db.session.query(models.Events)
        .filter_by(person_id=person_id, contact_name=contact_name)
        .order_by(models.Events.date_time.asc())
    )
    event_list = []

    for event in events:
        event_list.append(event.date_time)

    # Accessing current time to get closest to date value
    time_now = datetime.datetime.utcnow()
    next_reminder = get_closest_date(time_now, event_list)
    return next_reminder


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
    return "No Reminders"


def update_contact(contact_id, name, emails, phone_number):
    """
    Helper method to update contact info from database
    """
    contact = models.Contact.query.get(contact_id)
    contact.name = name
    contact.emails = emails
    contact.phoneNumber = phone_number
    db.session.commit()


def get_contact_info(user_id) -> list:
    """
    Helper method to get a user's list of contacts
    """
    return [
        {
            "name": contact.name,
            "emails": contact.emails,
            "phoneNumber": contact.phoneNumber,
        }
        for contact in models.Contact.query.filter_by(person_id=user_id).all()
    ]


@flask_app.route("/api/v1/contacts/all", methods=["GET"])
@flask_login.login_required
def api_all_contacts():
    """
    Endpoint for retreiving all contacts
    """
    return json.dumps(get_contact_info(flask_login.current_user.id))


@flask_app.route("/api/v1/addContact", methods=["GET", "POST"])
@flask_login.login_required
def api_add_contact():
    """
    Endpoint for adding a new contact
    """
    if request.method == "POST":
        # Gets the JSON object from the body of request sent by client
        request_data = request.get_json()
        new_contact = models.Contact(
            name=request_data["name"],
            emails=request_data["email"],  # PLEASE rename this to `email`
            phoneNumber=request_data["phoneNumber"],  # rename this to `phone_number`
            person_id=flask_login.current_user.id,
        )
        db.session.add(new_contact)
        db.session.commit()

    return json.dumps(get_contact_info(flask_login.current_user.id))


def get_event_info(user_name, date_time):
    """
    Helper method to get event from selected date
    """
    result = db.engine.execute(
        "SELECT * FROM CONTACTS WHERE user_name = "
        + user_name
        + "AND date_time = "
        + date_time
    )
    info = []
    for row in result:
        r_dict = dict(row.items())  # convert to dict keyed by column names
        info.append(r_dict)
    # This returns a dictionary that contains key,value pairs of each data from database
    return info


@flask_app.route("/api/v1/events", methods=["GET", "POST"])
def api_event():
    """
    Endpoint for adding a new event and get event info
    """
    # User wants to create a new event in the catalog
    if request.method == "POST":
        # Gets the JSON object from the body of request sent by client
        request_data = request.get_json()
        add_event_info(
            request_data["contact_name"],
            "admin",
            request_data["activity"],
            request_data["date_time"],
            flask_login.current_user.id,
            request_data["frequency"],
            request_data["amount"],
        )
        return {"success": True}  # Return success status if it worked

    event_date = request.args.get("event_id", "")
    if event_date is None:
        return Response(
            "Error: No date field provided. Please specify a date.", status=400
        )
    event_date = datetime.datetime(event_date.year, event_date.month, event_date.day)
    # For real DB, you would replace with a filter clause in SQLAlchemy
    results = get_event_info(request_data["user_name"], event_date)

    return json.dumps(results)


@flask_app.route("/login", methods=["POST"])
def login():
    """
    Endpoint for logging in with Google's login API.
    """
    request_data = request.get_json(silent=True)

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
                new_person = models.Person(id=user_id, username=name)
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
