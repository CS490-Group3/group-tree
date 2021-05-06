"""
This module contains unit tests with mocking
"""

import datetime
import unittest
from unittest.mock import patch

from app.app import add_new_event, models, User


class AddNewEventTest(unittest.TestCase):
    """Test case for `add_new_event`"""

    def setUp(self):
        """Set up"""
        self.mock_user = User(id=1000, name="Bill", tree_points=0)
        self.mock_events = []
        self.mock_contacts = {
            2000: models.Contact(
                id=2000,
                name="Dude",
                email="dude@example.com",
                phone="123-345-7890",
                person_id=1000,
            )
        }

    def mocked_db_session_add(self, event):
        """Mocked database function"""
        self.mock_events.append(event)

    def mocked_db_session_commit(self):
        """Mocked database function"""

    def mocked_contact_query_get(self, contact_id):
        """Mocked database function"""
        return self.mock_contacts.get(contact_id)

    def test_valid(self):
        """Test on valid input"""
        with patch("app.app.db.session.add", self.mocked_db_session_add), patch(
            "app.app.db.session.commit", self.mocked_db_session_commit
        ), patch("app.models.Contact.query") as mocked_query:
            mocked_query.get = self.mocked_contact_query_get
            result = add_new_event(
                {
                    "activity": "fishing",
                    "start_time": datetime.datetime.now(),
                    "period": "7",
                    "contact_id": "2000",
                },
                self.mock_user,
            )
            self.assertEqual(result.status_code, 204)
            self.assertEqual(len(self.mock_events), 1)

    def test_bad_request(self):
        """Test on valid input"""
        with patch("app.app.db.session.add", self.mocked_db_session_add), patch(
            "app.app.db.session.commit", self.mocked_db_session_commit
        ), patch("app.models.Contact.query") as mocked_query:
            mocked_query.get = self.mocked_contact_query_get
            result = add_new_event(
                {
                    "activity": "fishing",
                    "start_time": datetime.datetime.now(),
                    "period": "-1",
                    "contact_id": "2000",
                },
                self.mock_user,
            )
            self.assertEqual(result.status_code, 400)
            self.assertEqual(len(self.mock_events), 0)
