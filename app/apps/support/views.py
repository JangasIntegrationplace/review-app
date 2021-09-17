from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from .models import Thread, Message
from .serializers import ThreadSerializer, PostMessageSerializer


class Chat(CreateAPIView):
    queryset = Thread.objects
    serializer_class = ThreadSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class CreateMessage(CreateAPIView):
    queryset = Message.objects
    serializer_class = PostMessageSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


chat = Chat.as_view()
create_message = CreateMessage.as_view()
