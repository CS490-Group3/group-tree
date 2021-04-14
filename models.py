# pylint: disable=no-member
# pylint: disable=too-few-public-methods
"""This file creates our database with contacts and persons"""
from app import DB

class Person(DB.Model):
    """This class creates persons table"""
    __tablename__ = 'person'

    id = DB.Column(DB.Integer, primary_key=True)
    username = DB.Column(DB.String(30), nullable=False)
    contacts = DB.relationship('Contact', backref='person', lazy=True)

    def __repr__(self):
        return '<User %r>' % self.username

class Contact(DB.Model):
    """This class creates contacts table"""
    __tablename__ = 'contacts'

    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String(30), nullable=False)
    emails = DB.Column(DB.String(30), nullable=False)
    phoneNumber = DB.Column(DB.String(30), nullable=False) 
    nextReminder = DB.Column(DB.Integer, nullable=False)
    person_id = DB.Column(DB.Integer, DB.ForeignKey('person.id'), nullable=False)

    def __repr__(self):
        return '<Contact %r>' % self.name
        