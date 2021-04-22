"""
This file tests the functions add_user & get_user_username from app.py
"""

import unittest
from unittest.mock import patch

from app.app import add_user


KEY_INPUT = "input"
KEY_EXPECTED = "expected"

INITIAL_USERNAME = "intial_user"


class AddUserTestCase(unittest.TestCase):
    """ unit test class to test app.py add_user function """

    def setUp(self):
        """ method to set up add user test """
        self.success_test_params = [
            {KEY_INPUT: ["123456", "Benjamin"], KEY_EXPECTED: None},
            {KEY_INPUT: ["12488595020", "GroupTree"], KEY_EXPECTED: None},
            {KEY_INPUT: ["9993338884477", "Jane Doe"], KEY_EXPECTED: None},
        ]

        self.failure_test_params = [
            {KEY_INPUT: ["59900234", "Ben"], KEY_EXPECTED: True},
            {KEY_INPUT: ["545461231", "GroupBore"], KEY_EXPECTED: False},
            {KEY_INPUT: ["99266673427", "Harry The Dog"], KEY_EXPECTED: "Jane Doe"},
        ]

        initial_person = INITIAL_USERNAME
        self.initial_db_mock = [initial_person]

    def mocked_db_session_add(self, name):
        """ method mock up database """
        self.initial_db_mock.append(name)

    def mocked_db_session_commit(self):
        """ method mock up database """

    def test_add_success(self):
        """ testing success of test params """
        for test in self.success_test_params:
            with patch("app.app.db.session.add", self.mocked_db_session_add):
                with patch("app.app.db.session.commit", self.mocked_db_session_commit):
                    self.assertIsNone(add_user(*test[KEY_INPUT]))

    def test_add_failure(self):
        """ testing failure of test params """
        for test in self.failure_test_params:
            with patch("app.app.db.session.add", self.mocked_db_session_add):
                with patch("app.app.db.session.commit", self.mocked_db_session_commit):
                    self.assertIsNone(add_user(*test[KEY_INPUT]))
