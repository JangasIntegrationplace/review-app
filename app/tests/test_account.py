from rest_framework.test import APITestCase
from django.urls import reverse
from unittest.mock import patch
from django.contrib.auth import get_user_model
from .fixtures import user as f_user
from .utils import AuthAPITestCase


class TestSignUp(APITestCase):
    path = reverse("auth_sign_up")

    @patch(
        "apps.accounts.serializers.SignUpSerializer.get_token",
        lambda *args, **kwargs: f_user.AUTH_TOKEN
    )
    def test_sign_up_successfully(self):
        response = self.client.post(path=self.path, data=f_user.AUTH_USER)
        self.assertEqual(response.status_code, 201)
        expected_response_data = {
            "username": f_user.AUTH_USER["username"],
            "token": f_user.AUTH_TOKEN
        }
        self.assertDictEqual(response.data, expected_response_data)

    def test_sign_up_failure(self):
        # Create User first
        get_user_model().objects.create_user(**f_user.AUTH_USER)
        # Try to create already created user
        response = self.client.post(path=self.path, data=f_user.AUTH_USER)
        self.assertEqual(response.status_code, 400)


class TestDashboard(AuthAPITestCase):
    path = reverse("auth_dashboard")

    def test_retrieve_initial_dashboard(self):
        response = self.client.get(path=self.path)
        self.assertEqual(response.status_code, 200)
        expected_response_data = {
            "username": f_user.AUTH_USER["username"],
            "reviews": []
        }
        self.assertDictEqual(response.data, expected_response_data)
