from rest_framework.test import APITestCase
from tests.fixtures import user as f_user
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token


class AuthAPITestCase(APITestCase):
    def setUp(self):
        user = get_user_model().objects.create_user(**f_user.AUTH_USER)
        Token.objects.create(key=f_user.AUTH_TOKEN, user=user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f'Token {f_user.AUTH_TOKEN}'
        )
