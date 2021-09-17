from django.urls import path
from .views import delivery_api


urlpatterns = [
    path("<delivery>", delivery_api, name="delivery_delivery_api"),
]
