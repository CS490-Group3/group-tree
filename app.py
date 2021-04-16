# pylint: disable=no-member
# pylint: disable=wrong-import-position
"""
Template Flask app
"""

import os

import requests
from flask import Flask, request, send_from_directory
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

def create_app():
    ''' helper method to create app'''
    appp = Flask(__name__, static_folder="./build/static")
    # Point SQLAlchemy to Heroku database
    appp.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    # Gets rid of a warning
    appp.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    return appp

app = create_app()
from exts import db
import models
db.create_all()

CURRENT_USERID = 1 #to store the id of current user (t o d o)

def add_user(sub, name):
    ''' helper method to add new user to database '''
    temp = models.Person.query.filter_by(id=sub).first()
    if not temp:
        #working with databsse
        new_user = models.Person(id=sub, username=name)
        db.session.add(new_user)
        db.session.commit()

def add_contact(user_name, user_email, user_phone):
    ''' helper method to add new contact to database '''
    contact = models.Contact(name=user_name, emails=user_email,
                             phoneNumber=user_phone, person_id=CURRENT_USERID)
    db.session.add(contact)
    db.session.commit()

#add_contact("aria", "aria@gmail.com", "000000344")

def get_contact_username(id_num):
    temp = models.Person.query.filter_by(id=id_num).first()
    username = temp.username
    print(username)
# get_contact_username(2)

@app.route("/login", methods=["POST"])
def login():
    """
    Endpoint for authenticating with Google's login API.
    """
    request_data = request.get_json()

    if request_data:
        token = request_data.get("token")

        # ask Google to validate the token, instead of doing it manually
        google_response = requests.get(
            "https://www.googleapis.com/oauth2/v3/tokeninfo", {"id_token": token}
        )

        if google_response:  # not error
            profile = google_response.json()
            sub = profile["sub"]  # can use as primary key
            name = profile["name"]
            email = profile["email"]
            add_user(sub, name)

        print(sub, name, email)

    return {}


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
