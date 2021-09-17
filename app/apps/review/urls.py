from django.urls import path
from .views import create_review, review_detail, sample


urlpatterns = [
    path("sample", sample, name="review_sample"),
    path("sample/<int:sample>/create", create_review),
    path("sample/<int:sample>/<int:review>", review_detail),
]
