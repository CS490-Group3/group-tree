'''
    unit_tests.py
    This file tests the list of tuples in create_user_list function. This will test if the first element is a string and the second is an integer
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
    def setUp(self):
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
        for test in self.success_test_params:
            actual_result = get_number_days(test[KEY_INPUT])
            print(actual_result)
            
            expected_result = test[KEY_EXPECTED]
            print(expected_result)
            
            self.assertEqual(actual_result, expected_result)
            self.assertEqual(type(actual_result), type(expected_result))
            # self.assertEqual(type(actual_result[0][1]), type(expected_result[1]))
    
    
    def test_number_days_failure(self):
        for test in self.failure_test_params:
            actual_result = get_number_days(test[KEY_INPUT])
            print(actual_result)
            
            expected_result = test[KEY_EXPECTED]
            print(expected_result)
            
            self.assertNotEqual(actual_result, expected_result)
            self.assertNotEqual(type(actual_result), type(expected_result))
    
"""    
class MoveUserListTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT : [('Benjamin', 100)],
                KEY_EXPECTED : [('Benjamin', 100)]
            },
            {
                KEY_INPUT : [('Benjamin', 100), ('John', 200)],
                KEY_EXPECTED : [('Benjamin', 100), ('John', 200)]
            },
            {
                KEY_INPUT : [('Benjamin', 100), ('John', 200), ('Joe', 300)],
                KEY_EXPECTED : [('Benjamin', 100), ('John', 200), ('Joe', 300)]
            }
        ]
        
        self.failure_test_params = [
            {
                KEY_INPUT : [('Benjamin', 100)],
                KEY_EXPECTED : ('Benjamin', 100)
            },
            {
                KEY_INPUT : [('Benjamin', 100), ('John', 200)],
                KEY_EXPECTED : ('Benjamin', 100, 100)
            },
            {
                KEY_INPUT : [('Benjamin', 100), ('John', 200), ('Joe', 300)],
                KEY_EXPECTED : (('Benjamin', 100), ('John', 200), ('Joe', 300), ('Imposter', 10000))
            }
        ]
    
    def test_userMove_success(self):
        for test in self.success_test_params:
            actual_result = move_list(test[KEY_INPUT])
            print(actual_result)
            
            expected_result = test[KEY_EXPECTED]
            print(expected_result)
            
            self.assertEqual(type(actual_result), type(expected_result))
            self.assertEqual(len(actual_result), len(expected_result))
    
    def test_userMove_failure(self):
        for test in self.failure_test_params:
            actual_result = move_list(test[KEY_INPUT])
            print(actual_result)
            
            expected_result = test[KEY_EXPECTED]
            print(expected_result)
            
            self.assertNotEqual(type(actual_result), type(expected_result))
            self.assertNotEqual(len(actual_result), len(expected_result))
"""
    
if __name__ == '__main__':
    unittest.main()
