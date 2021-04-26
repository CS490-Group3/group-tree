"""
This file tests the function get_number_days from app.py
"""

import datetime
import unittest

from app.app import get_number_days, get_closest_date


KEY_INPUT = "input"
KEY_EXPECTED = "expected"


class NumberDaysTestCase(unittest.TestCase):
    """
    Unit test class to test get_number_days function
    """

    def setUp(self):
        """
        Method to create setup for unit tests
        """
        self.success_test_params = [
            {KEY_INPUT: "single", KEY_EXPECTED: 0},
            {KEY_INPUT: "weekly", KEY_EXPECTED: 7},
            {KEY_INPUT: "monthly", KEY_EXPECTED: 30},
        ]
        self.failure_test_params = [
            {KEY_INPUT: "single", KEY_EXPECTED: "12"},
            {KEY_INPUT: "biweekly", KEY_EXPECTED: "7"},
            {KEY_INPUT: "weekly", KEY_EXPECTED: "14"},
        ]

    def test_number_days_success(self):
        """
        Unit test method to test the given success inputs
        """
        for test in self.success_test_params:
            actual_result = get_number_days(test[KEY_INPUT])
            expected_result = test[KEY_EXPECTED]

            self.assertEqual(actual_result, expected_result)
            self.assertEqual(type(actual_result), type(expected_result))

    def test_number_days_failure(self):
        """
        Unit test method to test the given failure inputs
        """
        for test in self.failure_test_params:
            actual_result = get_number_days(test[KEY_INPUT])

            expected_result = test[KEY_EXPECTED]

            self.assertNotEqual(actual_result, expected_result)
            self.assertNotEqual(type(actual_result), type(expected_result))


class ClosestDateTestCase(unittest.TestCase):
    """
    Unit test class to test app.py get_closest_date function
    """

    def setUp(self):
        """ method to create setup for unit tests """
        date_time_now = datetime.datetime.strptime("2021-04-20", "%Y-%m-%d")
        date_time_param1 = datetime.datetime.strptime("2021-04-20", "%Y-%m-%d")
        date_time_param2 = datetime.datetime.strptime("2021-05-20", "%Y-%m-%d")
        self.success_test_params = [
            {
                KEY_INPUT: [date_time_now, [date_time_param1, date_time_param2]],
                KEY_EXPECTED: date_time_param2,
            },
            {
                KEY_INPUT: [date_time_now, [date_time_param1]],
                KEY_EXPECTED: "No Events",
            },
            {
                KEY_INPUT: [date_time_now, [date_time_param2]],
                KEY_EXPECTED: date_time_param2,
            },
        ]
        self.failure_test_params = [
            {
                KEY_INPUT: [date_time_now, [date_time_param1, date_time_param2]],
                KEY_EXPECTED: "No Events",
            },
            {
                KEY_INPUT: [date_time_now, [date_time_param1]],
                KEY_EXPECTED: date_time_now,
            },
            {KEY_INPUT: [date_time_now, [date_time_param2]], KEY_EXPECTED: None},
        ]

    def test_closest_date_success(self):
        """
        Unit test method to test the given success inputs
        """
        for test in self.success_test_params:
            actual_result = get_closest_date(test[KEY_INPUT][0], test[KEY_INPUT][1])
            expected_result = test[KEY_EXPECTED]

            self.assertEqual(actual_result, expected_result)
            self.assertEqual(type(actual_result), type(expected_result))

    def test_closest_date_failure(self):
        """
        Unit test method to test the given failure inputs
        """
        for test in self.failure_test_params:
            actual_result = get_closest_date(test[KEY_INPUT][0], test[KEY_INPUT][1])
            expected_result = test[KEY_EXPECTED]

            self.assertNotEqual(actual_result, expected_result)
            self.assertNotEqual(type(actual_result), type(expected_result))
