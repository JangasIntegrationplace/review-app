from rest_framework import serializers
from rest_framework.authtoken.models import Token
from apps.review.serializers import ReviewDashboardSerializer
from .models import User


class SignUpSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ("username", "password", "token")
        extra_kwargs = {
            "password": {"write_only": True},
            "token": {"read_only": True},
        }

    def get_token(self, obj):
        token, _ = Token.objects.get_or_create(user=obj)
        return token.key

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class DashboardSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ("username", "reviews", )

    def get_reviews(self, obj):
        threads = obj.reviews.filter(parent=None)
        serializer = ReviewDashboardSerializer(threads, many=True)
        return serializer.data
