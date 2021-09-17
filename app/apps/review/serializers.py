from django.db.models import fields
from rest_framework import serializers
from .models import Review, Sample


class SampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sample
        fields = "__all__"


class ReviewDashboardSerializer(serializers.ModelSerializer):
    sample = SampleSerializer()

    class Meta:
        model = Review
        fields = ("id", "sample", "timestamp")


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ("id", "author", "body", "timestamp", )


class CreateReviewSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    sample = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ("id", "author", "body", "timestamp", "comments", "sample", "parent")
        extra_kwargs = {
            "author": {"read_only": True},
            "parent": {"required": False}
        }

    def get_sample(self, obj):
        serializer = SampleSerializer(obj.sample)
        return serializer.data

    def save(self, **kwargs):
        return super().save(**kwargs)
