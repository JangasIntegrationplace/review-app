from django.db import models
from django.conf import settings


class Sample(models.Model):
    title = models.CharField(
        max_length=60,
        unique=True
    )
    body = models.TextField()

    def __str__(self):
        return self.title


class Review(models.Model):
    author = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="reviews"
    )
    sample = models.ForeignKey(
        to=Sample,
        on_delete=models.CASCADE,
        related_name="reviews"
    )
    parent = models.ForeignKey(
        to="Review",
        on_delete=models.CASCADE,
        related_name="comments",
        null=True,
        blank=True
    )
    body = models.TextField()
    timestamp = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ("-timestamp", )

    @property
    def is_thread(self):
        return self.parent is None

    def __str__(self):
        return f"Response to {self.sample.title} by {self.author.usernam}"
