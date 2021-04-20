# pylint: disable=wrong-import-position
'''
    unit_tests.py
    This file tests the function get_number_days from app.py
'''
import unittest
import sys
import os
sys.path.append(os.path.abspath('../../'))

from app import get_number_days

KEY_INPUT = "input"
KEY_EXPECTED = "expected"
KEY_LENGTH = "length"
KEY_FIRST_ELEMENT = "first_element"
KEY_SECOND_ELEMENT = "second_element"


class NumberDaysTestCase(unittest.TestCase):
    """ unit test class to test get_number_days function """
    def setUp(self):
        """ method to create setup for unit tests """
        self.success_test_params = [
            {
                KEY_INPUT : "single",
                KEY_EXPECTED : 0
            },
            {
                KEY_INPUT : "weekly",
                KEY_EXPECTED : 7
            },
            {
                KEY_INPUT : "monthly",
                KEY_EXPECTED : 30
            }
        ]
        self.failure_test_params = [
            {
                KEY_INPUT : "single",
                KEY_EXPECTED : "12"
            },
            {
                KEY_INPUT : "biweekly",
                KEY_EXPECTED : "7"
            },
            {
                KEY_INPUT : "weekly",
                KEY_EXPECTED : "14"
            }
        ]
    def test_number_days_success(self):
        """ unit test method to test the given success inputs """
        for test in self.success_test_params:
            actual_result = get_number_days(test[KEY_INPUT])
            print(actual_result)
            expected_result = test[KEY_EXPECTED]
            print(expected_result)

            self.assertEqual(actual_result, expected_result)
            self.assertEqual(type(actual_result), type(expected_result))
            # self.assertEqual(type(actual_result[0][1]), type(expected_result[1]))


    def test_number_days_failure(self):
        """ unit test method to test the given failure inputs """
        for test in self.failure_test_params:
            actual_result = get_number_days(test[KEY_INPUT])
            print(actual_result)

            expected_result = test[KEY_EXPECTED]
            print(expected_result)

            self.assertNotEqual(actual_result, expected_result)
            self.assertNotEqual(type(actual_result), type(expected_result))

if __name__ == '__main__':
    unittest.main()
