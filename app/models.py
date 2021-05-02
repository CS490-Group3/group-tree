# pylint: disable=no-member
# pylint: disable=too-few-public-methods
"""
This module contains database models needed for the application
"""

from app.exts import db


class Person(db.Model):
    """
    Model for person table
    """

    __tablename__ = "person"

    id = db.Column(db.String(30), primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    tree_points = db.Column(db.Integer, default=0, nullable=False)

    contacts = db.relationship("Contact", backref="person", lazy=True)


class Contact(db.Model):
    """
    Model for contact table
    """

    __tablename__ = "contact"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(30), nullable=False)
    phone = db.Column(db.String(30), nullable=False)
    person_id = db.Column(db.String(30), db.ForeignKey("person.id"), nullable=False)

    events = db.relationship("Event", backref="contact", lazy=True)


class Event(db.Model):
    """
    Database model for `event` table

    Reccuring events have a `period` which measures the time in days between occurrences.
    Nonreccuring events have a null `period`.

    The `complete_time` column denotes the most recent time that the user completed the
    event. If `complete_time` is null, then the user has never completed the event.

    The user shall be limited to completing an event once per occurrence. Missed
    occurrences can never be completed. The server is able to enforce these policies
    through simple time calculations.
    """

    __tablename__ = "event"

    id = db.Column(db.Integer, primary_key=True)
    activity = db.Column(db.String(30), nullable=False)
    start_time = db.Column(db.DateTime(), nullable=False)
    period = db.Column(db.Integer, nullable=True)
    complete_time = db.Column(db.DateTime(), nullable=True)

    contact_id = db.Column(db.Integer, db.ForeignKey("contact.id"), nullable=False)
