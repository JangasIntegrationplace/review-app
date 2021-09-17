import uuid
from django.db import models
from django.conf import settings


class Thread(models.Model):
    id = models.UUIDField(
        primary_key=True,
        editable=False,
        default=uuid.uuid1
    )
    user = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="threads"
    )
    timestamp = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.id


class Message(models.Model):
    thread = models.ForeignKey(
        to=Thread,
        on_delete=models.CASCADE,
        related_name="messages"
    )
    user = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="messages"
    )
    timestamp = models.DateTimeField(
        auto_now_add=True
    )
    body = models.TextField()

    class Meta:
        ordering = ('-timestamp', )

    def __str__(self):
        return f"Msg for Thread {self.thread.id} by {self.user.username}"
