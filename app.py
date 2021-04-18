# pylint: disable=no-member
# pylint: disable=wrong-import-position
"""
Template Flask app
"""

import os
# import datetime
import requests
from flask import Flask, request, send_from_directory, jsonify
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

CURRENT_USERID = '11' #to store the id of current user (t o d o)

def add_user(sub, name):
    ''' helper method to add new user to database '''
    temp = models.Person.query.filter_by(id=sub).first()
    if not temp:
        #working with databsse
        print("worked")
        new_user = models.Person(id=sub, username=name)
        db.session.add(new_user)
        db.session.commit()
# add_user(CURRENT_USERID, "john")

def add_contact(user_name, user_email, user_phone):
    ''' helper method to add new contact to database '''
    # checking if contact exits in database by email
    temp = models.Contact.query.filter_by(emails=user_email).first()

    if not temp:
        contact = models.Contact(name=user_name, emails=user_email,
                                 phoneNumber=user_phone, person_id=CURRENT_USERID)
        db.session.add(contact)
        db.session.commit()


def get_user_username(id_num):
    ''' helper method to retrieve username from database '''
    temp = models.Person.query.filter_by(id=id_num).first()
    #id_num - temp.id
    #print(id_num)
    username = temp.username
    print(username)

def get_contact_info(id_num):
    ''' helper method to retrieve contact info from database '''
    result = db.engine.execute("SELECT * FROM CONTACTS WHERE person_id = " + id_num)
    print("CONTACT LIST FOR ID \'" + str(id_num) + "\'\n")
    contacts = []
    for row in result:
        # print(r[0]) # Access by positional index
        print("Contact Name: " + row['name']) # Access by column name as a string
        r_dict = dict(row.items()) # convert to dict keyed by column names
        contacts.append(r_dict)
    # This returns a dictionary that contains key,value pairs of each data from database
    return contacts

# get_contact_info(CURRENT_USERID)

def add_event_info(contact_name, user_name, activity, date_time, person_id):
    ''' helper method to add events to database '''
    # result = db.engine.execute("INSERT INTO events VALUES(" + str(contact_name) +  + ")")
    event = models.Events(contact_name=contact_name, user_name=user_name, activity=activity,
                                                    date_time=date_time, person_id=person_id)
    db.session.add(event)
    db.session.commit()

# This example creates event with the current utc time as the datetime
# import datetime
# add_event_info("Contact1", "admin", "shopping", datetime.datetime.utcnow(), CURRENT_USERID)

# This example creates event with an inpurt utc time as the datetime
# add_event_info("Contact1", "admin", "shopping", "2021-06-09 04:20:00", CURRENT_USERID)

def get_user_events(person_id):
    ''' helper method to get events from database '''
    result = db.engine.execute("SELECT * FROM EVENTS WHERE person_id = " + person_id)
    print("EVENTS LIST FOR ID \'" + str(person_id) + "\'\n")
    contacts = []
    for row in result:
        # print(r[0]) # Access by positional index
        # print("Event Activity: " + row['name']) # Access by column name as a string
        r_dict = dict(row.items()) # convert to dict keyed by column names
        contacts.append(r_dict)
    # This returns a dictionary that contains key,value pairs of each data from database
    return contacts

# print(get_user_events(CURRENT_USERID))

def update_contact(contact_id, name, emails, phone_number):
    ''' helper method to update contact info from database
        IMPORTANT: MUST PASS CONTACT ID TO FIND CORRECT CONTACT TO CHANGE'''
    db.engine.execute("UPDATE contacts SET name=\'" + name + "\', emails=\'" + emails
                        + "\', \"phoneNumber\"=\'" + phone_number + "\' WHERE id = " + contact_id)

# This will update contact information with given values
# IMPORTANT: Must keep track of the user idea to update the correct value
# When passing contact info to React, must keep id value to send back to python later
update_contact("40", "JamesSmith", "newerEmail@gmail.com", "732-123-4567")

# A route to return all of the contacts of current user
@app.route('/api/v1/contacts/all', methods=['GET'])
def api_all():
    '''
    Endpoint for sending all contacts for current user
    '''
    return jsonify(get_contact_info(CURRENT_USERID))

# A route to create or access a specific entry in our catalog based on request.
@app.route('/api/v1/addContact', methods=['GET', 'POST'])
def api_id():
    '''
    Endpoint for adding a new contact
    '''
    print("here")
    # User wants to add new contact
    if request.method == 'POST':
        # Gets the JSON object from the body of request sent by client
        request_data = request.get_json()
        name = request_data['name']
        email = request_data["email"]
        phone_number = request_data["phoneNumber"]
        add_contact(name, email, phone_number)
        #return {'success': True} # Return success status if it worked

    return jsonify(get_contact_info(CURRENT_USERID))

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
