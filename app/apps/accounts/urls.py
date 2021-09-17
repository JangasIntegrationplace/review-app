from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import sign_up, dashboard


urlpatterns = [
    path("sign-up", sign_up, name="auth_sign_up"),
    path("sign-in", obtain_auth_token),
    path("dashboard", dashboard, name="auth_dashboard"),
]
