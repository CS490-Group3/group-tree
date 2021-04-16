# pylint: disable=no-member
# pylint: disable=too-few-public-methods
"""This file creates our database with contacts and persons"""
from exts import db

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

class Events(db.Model):
    """This class creates events table"""

    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    contact_name = db.Column(db.String(30), nullable=False)
    user_name = db.Column(db.String(30), nullable=False)
    activity = db.Column(db.String(30), nullable=False)
    date_time = db.Column(db.DateTime(), nullable=False)
    person_id = db.Column(db.Integer, db.ForeignKey("person.id"), nullable=False)

    def __repr__(self):
        return "<Contact %r>" % self.name
