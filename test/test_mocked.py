# pylint: disable=wrong-import-position
# pylint: disable=assignment-from-no-return
# pylint: disable=unnecessary-pass
"""
    unit_tests.py
    This file tests the functions add_user & get_user_username from app.py
"""
import unittest
from unittest.mock import patch

from app.app import add_user, add_event_info


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
        pass

    def test_add_success(self):
        """ testing success of test params """
        for test in self.success_test_params:
            with patch("app.app.db.session.add", self.mocked_db_session_add):
                with patch("app.app.db.session.commit", self.mocked_db_session_commit):

                    actual_result = add_user(test[KEY_INPUT][0], test[KEY_INPUT][1])
                    print(actual_result)
                    expected_result = test[KEY_EXPECTED]

                    self.assertEqual(actual_result, expected_result)
                    self.assertEqual(type(actual_result), type(expected_result))

    def test_add_failure(self):
        """ testing failure of test params """
        for test in self.failure_test_params:
            with patch("app.app.db.session.add", self.mocked_db_session_add):
                with patch("app.app.db.session.commit", self.mocked_db_session_commit):

                    actual_result = add_user(test[KEY_INPUT][0], test[KEY_INPUT][1])
                    print(actual_result)

                    expected_result = test[KEY_EXPECTED]

                    self.assertNotEqual(actual_result, expected_result)
                    self.assertNotEqual(type(actual_result), type(expected_result))


class AddEventTestCase(unittest.TestCase):
    """ unit test class to test app.py add_event function """

    def setUp(self):
        """ setup for add_event function """
        self.success_test_params = [
            {
                KEY_INPUT: [
                    "Benjamin",
                    "admin",
                    "shopping",
                    "2021-05-20 05:20:00",
                    "123456",
                    "monthly",
                    3,
                ],
                KEY_EXPECTED: None,
            },
            {
                KEY_INPUT: [
                    "johnny",
                    "test",
                    "lifting",
                    "2021-04-20 04:20:00",
                    "666666",
                    "daily",
                    3,
                ],
                KEY_EXPECTED: None,
            },
            {
                KEY_INPUT: [
                    "Alex",
                    "the great",
                    "running",
                    "2021-06-20 06:20:00",
                    "777777",
                    "weekly",
                    3,
                ],
                KEY_EXPECTED: None,
            },
        ]

        self.failure_test_params = [
            {
                KEY_INPUT: [
                    123,
                    "admin",
                    "lifting",
                    "2021-05-20 05:20:00",
                    "123456",
                    "monthly",
                    3,
                ],
                KEY_EXPECTED: 123,
            },
            {
                KEY_INPUT: [
                    "1234",
                    "test",
                    "running",
                    "2021-04-20 04:20:00",
                    "8888",
                    "daily",
                    2,
                ],
                KEY_EXPECTED: True,
            },
            {
                KEY_INPUT: [
                    False,
                    "the great",
                    "shopping",
                    "2021-06-20 06:20:00",
                    "777777",
                    "weekly",
                    1,
                ],
                KEY_EXPECTED: False,
            },
        ]

        initial_person = INITIAL_USERNAME
        self.initial_db_mock = [initial_person]

    def mocked_db_session_add(self, name):
        """ mockup for database """
        self.initial_db_mock.append(name)

    def mocked_db_session_commit(self):
        """ mockup for database """
        pass

    def test_get_success(self):
        """ testing success of test params """
        for test in self.success_test_params:
            with patch("app.app.db.session.add", self.mocked_db_session_add):
                with patch("app.app.db.session.commit", self.mocked_db_session_commit):

                    actual_result = add_event_info(
                        test[KEY_INPUT][0],
                        test[KEY_INPUT][1],
                        test[KEY_INPUT][2],
                        test[KEY_INPUT][3],
                        test[KEY_INPUT][4],
                        test[KEY_INPUT][5],
                        test[KEY_INPUT][6],
                    )
                    print(actual_result)

                    expected_result = test[KEY_EXPECTED]

                    self.assertEqual(actual_result, expected_result)
                    self.assertEqual(type(actual_result), type(expected_result))

    def test_get_failure(self):
        """ testing failure of test params """
        for test in self.failure_test_params:
            with patch("app.app.db.session.add", self.mocked_db_session_add):
                with patch("app.app.db.session.commit", self.mocked_db_session_commit):

                    actual_result = add_event_info(
                        test[KEY_INPUT][0],
                        test[KEY_INPUT][1],
                        test[KEY_INPUT][2],
                        test[KEY_INPUT][3],
                        test[KEY_INPUT][4],
                        test[KEY_INPUT][5],
                        test[KEY_INPUT][6],
                    )
                    print(actual_result)

                    expected_result = test[KEY_EXPECTED]

                    self.assertNotEqual(actual_result, expected_result)
                    self.assertNotEqual(type(actual_result), type(expected_result))


if __name__ == "__main__":
    unittest.main()
