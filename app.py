"""
Template Flask app
"""

import os

import requests
from flask import Flask, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv


load_dotenv(find_dotenv())

app = Flask(__name__, static_folder="./build/static")
# Point SQLAlchemy to Heroku database
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
# Gets rid of a warning
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
# IMPORTANT: This must be AFTER creating db variable to prevent circular import issues
db.create_all()


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
