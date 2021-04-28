# pylint: disable=no-member

"""
Template Flask app
"""

import json
import os

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


@flask_app.route("/api/v1/contacts", methods=["DELETE", "GET", "POST"])
@flask_login.login_required
def api_contacts():
    """
    Endpoint for API calls regarding contact books. The functionality is dependent on the
    HTTP method.

    `DELETE` - Delete a contact given the contact ID

    `GET` - Get a list of all the user's contacts in JSON

    `POST` - Add a new contact
    """
    user = flask_login.current_user

    if request.method == "DELETE":
        contact_id = request.args.get("id")
        contact = models.Contact.query.get(contact_id)

        # check if the contact exists and belongs to the user
        if contact is not None and contact.person == user:
            db.session.delete(contact)
            db.session.commit()

            return ("", 204)  # No Content
        return ("", 404)  # Not Found

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
def api_event():
    """
    Endpoint for adding a new event and get event info
    """
    # User wants to create a new event in the catalog
    if request.method == "POST":
        request_data = request.get_json()
        # new_event = models.Event()
        print("/api/v1/events POST", request_data)

        return ("", 204)  # No Content

    return ("", 405)  # Method Not Allowed


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
