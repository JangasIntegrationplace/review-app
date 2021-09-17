from rest_framework.generics import (
    CreateAPIView,
    RetrieveAPIView,
    GenericAPIView,
    get_object_or_404
)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import Review, Sample
from .serializers import CreateReviewSerializer, SampleSerializer


class ReviewBase(GenericAPIView):
    queryset = Review.objects
    serializer_class = CreateReviewSerializer
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )


class CreateReview(ReviewBase, CreateAPIView):
    def get_sample_object(self):
        filter_kwargs = {"id": self.kwargs["sample"]}
        return get_object_or_404(Sample.objects, **filter_kwargs)

    def perform_create(self, serializer):
        serializer.save(
            author=self.request.user,
            sample=self.get_sample_object()
        )


class ReviewDetail(RetrieveAPIView, CreateReview):
    def get_object(self):
        filter_kwargs = {
            "id": self.kwargs["review"],
            "sample": self.kwargs["sample"]
        }
        return get_object_or_404(self.queryset, **filter_kwargs)

    def get_parent_object(self):
        if "review" not in self.kwargs:
            return None
        filter_kwargs = {"id": self.kwargs["review"]}
        return get_object_or_404(Review.objects, **filter_kwargs)

    def perform_create(self, serializer):
        serializer.save(
            author=self.request.user,
            sample=self.get_sample_object(),
            parent=self.get_parent_object()
        )


class RandomizeSample(RetrieveAPIView):
    queryset = Sample.objects
    serializer_class = SampleSerializer
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )

    def get_object(self):
        from random import choice
        samples = self.queryset.all()
        return choice(samples)


create_review = CreateReview.as_view()
review_detail = ReviewDetail.as_view()
sample = RandomizeSample.as_view()
