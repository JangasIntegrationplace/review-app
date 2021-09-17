import uuid
import time
from functools import partial
from django.urls import reverse
from apps.deliveries import DELIVERIES
from .utils import AuthAPITestCase


class TestDeliveryAPI(AuthAPITestCase):
    path = partial(reverse, viewname="delivery_delivery_api")

    def test_sample(self):
        path = self.path(kwargs={"delivery": "sample"})
        response = self.client.get(path)
        self.assertEqual(response.status_code, 200)

    def test_invalid_input(self):
        path = self.path(kwargs={"delivery": uuid.uuid4().hex})
        response = self.client.get(path)
        self.assertEqual(response.status_code, 200)

    def test_all_deliveries(self):
        for delivery in DELIVERIES:
            t1 = time.time()
            path = self.path(kwargs={"delivery": delivery.__name__.split(".")[-1]})
            response = self.client.get(path)
            t2 = time.time()
            self.assertEqual(response.status_code, 200)
            # Warning: If you are using debugging, this test might break
            self.assertTrue(t2 - t1 < 2)

    def test_post_all_deliveries(self):
        for delivery in DELIVERIES:
            t1 = time.time()
            path = self.path(kwargs={"delivery": delivery.__name__.split(".")[-1]})
            data = {"body": "This is an input"}
            response = self.client.post(path, data)
            t2 = time.time()
            self.assertEqual(response.status_code, 200)
            # Warning: If you are using debugging, this test might break
            self.assertTrue(t2 - t1 < 5)
