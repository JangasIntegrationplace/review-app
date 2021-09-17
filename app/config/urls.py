from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/auth/", include("apps.accounts.urls")),
    path("api/review/", include("apps.review.urls")),
    path("api/support/", include("apps.support.urls")),
    re_path(".*", TemplateView.as_view(template_name='index.html')),
]
