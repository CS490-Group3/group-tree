# pylint: disable=no-member
# pylint: disable=too-few-public-methods
"""This file creates our database with contacts and persons"""
import os
#from app import db
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

class Person(db.Model):
    """This class creates persons table"""

    __tablename__ = "person"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False)
    contacts = db.relationship("Contact", backref="person", lazy=True)

    def __repr__(self):
        return "<User %r>" % self.username


class Contact(db.Model):
    """This class creates contacts table"""

    __tablename__ = "contacts"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    emails = db.Column(db.String(30), nullable=False)
    phoneNumber = db.Column(db.String(30), nullable=False)
    person_id = db.Column(db.Integer, db.ForeignKey("person.id"), nullable=False)

    def __repr__(self):
        return "<Contact %r>" % self.name