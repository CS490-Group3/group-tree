# pylint: disable=no-member
# pylint: disable=wrong-import-position
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
from flask import Flask, request, send_from_directory


load_dotenv(find_dotenv())


def create_app():
    """ helper method to create app"""
    appp = Flask(__name__, static_folder="./build/static")
    # Point SQLAlchemy to Heroku database
    appp.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    # Gets rid of a warning
    appp.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    return appp


app = create_app()
app.secret_key = os.getenv("FLASK_LOGIN_SECRET_KEY")
login_manager = flask_login.LoginManager(app)

from exts import db
import models

db.create_all()

CURRENT_USERID = "11"  # to store the id of current user (t o d o)


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


def get_user_username(id_num):
    """ helper method to retrieve username from database """
    temp = models.Person.query.filter_by(id=id_num).first()
    # id_num - temp.id
    # print(id_num)
    username = temp.username
    print(username)


def add_event_info(
    contact_name, user_name, activity, date_time, person_id, frequency, amount
):
    """ helper method to add events to database """
    if frequency == "single":
        days = 0
        amount = 1
    elif frequency == "daily":
        days = 1
    elif frequency == "weekly":
        days = 7
    elif frequency == "biweekly":
        days = 14
    elif frequency == "monthly":
        days = 30
    date_time_obj = datetime.datetime.strptime(date_time, "%Y-%m-%d %H:%M:%S")
    for i in range(amount):
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


def get_user_events(person_id):
    """
    Helper method to get events from database
    """
    result = models.Events.query.get(person_id)
    print("EVENTS LIST FOR ID '" + str(person_id) + "'\n")
    contacts = []
    for row in result:
        # print(r[0]) # Access by positional index
        # print("Event Activity: " + row['name']) # Access by column name as a string
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
    print("Time now: ", end="")
    print(time_now)
    time = None
    # Obtaining closest date
    for time in event_list:
        print(time)
        if time > time_now:
            print("Next Reminder: ", end="")
            break
    print(time)
    return time


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


@app.route("/api/v1/contacts/all", methods=["GET"])
@flask_login.login_required
def api_all_contacts():
    """
    Endpoint for retreiving all contacts
    """
    return json.dumps(get_contact_info(flask_login.current_user.id))


@app.route("/api/v1/addContact", methods=["GET", "POST"])
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


@app.route("/login", methods=["POST"])
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
            flask_login.login_user(user)

    return ("", 204)  # empty response


@app.route("/logout", methods=["POST"])
@flask_login.login_required
def logout():
    """
    Endpoint for logging out.
    """
    flask_login.logout_user()

    return ("", 204)  # empty response


@app.route("/", defaults={"filename": "index.html"})
@app.route("/<path:filename>")
def index(filename):
    """
    Serves files from ./build
    """
    return send_from_directory("./build", filename)


app.run(
    host=os.getenv("IP", "0.0.0.0"),
    port=8081 if os.getenv("C9_PORT") else int(os.getenv("PORT", "8081")),
)
