from django.urls import reverse
from unittest.mock import patch
from apps.review.models import Sample
from .fixtures import review as f_review
from .utils import AuthAPITestCase


class TestRandomizeSample(AuthAPITestCase):
    path = reverse("review_sample")

    def setUp(self):
        super().setUp()
        Sample.objects.create(**f_review.SAMPLE_1)
        Sample.objects.create(**f_review.SAMPLE_2)

    @patch("random.choice", lambda *args, **kwargs: Sample.objects.get(id=1))
    def test_get_random_sample(self):
        response = self.client.get(path=self.path)
        self.assertEqual(response.status_code, 200)
        expected_response_data = {**f_review.SAMPLE_1, "id": 1}
        self.assertDictEqual(response.data, expected_response_data)
