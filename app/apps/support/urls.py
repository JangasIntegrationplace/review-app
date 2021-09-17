from django.urls import path
from .views import chat, create_message


urlpatterns = [
    path("chat/", chat),
    path("message/", create_message),
]
