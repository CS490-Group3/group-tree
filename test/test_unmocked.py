"""
This file tests the function get_number_days from app.py
"""

import datetime
import unittest

from app.app import models, get_next_occurrence, event_occurs_on_date


class GetNextOccurrenceTestCase(unittest.TestCase):
    """
    Test case for `get_next_occurrence`
    """

    def setUp(self):
        """
        Set up
        """
        self.today = datetime.datetime.now()
        self.yesterday = self.today - datetime.timedelta(days=1)
        self.tomorrow = self.today + datetime.timedelta(days=1)

    def test_nonrecurring(self):
        """
        Test on a nonreccuring event
        """
        event = models.Event(activity="foo", start_time=self.today, period=None)

        self.assertEqual(get_next_occurrence(event, now=self.yesterday), self.today)
        self.assertEqual(get_next_occurrence(event, now=self.today), self.today)
        self.assertIsNone(get_next_occurrence(event, now=self.tomorrow))

    def test_recurring(self):
        """
        Test on a recurring event
        """
        daily = models.Event(activity="foo", start_time=self.today, period=1)

        self.assertEqual(get_next_occurrence(daily, now=self.yesterday), self.today)
        self.assertEqual(get_next_occurrence(daily, now=self.today), self.today)
        self.assertEqual(
            get_next_occurrence(daily, now=self.today + datetime.timedelta(seconds=1)),
            self.tomorrow,
        )


class EventOccursOnDateTestCase(unittest.TestCase):
    """
    Test case for `event_occurs_on_date`
    """

    def test_nonrecurring(self):
        """
        Test on a nonrecurring event
        """
        event = models.Event(
            activity="foo",
            start_time=datetime.datetime(1970, 1, 8, 16, 20),
            period=None,
        )

        self.assertFalse(event_occurs_on_date(event, datetime.date(1970, 1, 1)))
        self.assertTrue(event_occurs_on_date(event, datetime.date(1970, 1, 8)))
        self.assertFalse(event_occurs_on_date(event, datetime.date(1970, 1, 12)))
        self.assertFalse(event_occurs_on_date(event, datetime.date(1970, 1, 15)))

    def test_recurring(self):
        """
        Test on a recurring event
        """
        event = models.Event(
            activity="foo",
            start_time=datetime.datetime(1970, 1, 8, 16, 20),
            period=7,
        )

        self.assertFalse(event_occurs_on_date(event, datetime.date(1970, 1, 1)))
        self.assertTrue(event_occurs_on_date(event, datetime.date(1970, 1, 8)))
        self.assertFalse(event_occurs_on_date(event, datetime.date(1970, 1, 12)))
        self.assertTrue(event_occurs_on_date(event, datetime.date(1970, 1, 15)))
