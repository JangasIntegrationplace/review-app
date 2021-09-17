from django.contrib import admin
from .models import Sample, Review


@admin.register(Sample)
class SampleAdmin(admin.ModelAdmin): ...


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin): ...
