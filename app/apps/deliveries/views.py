from rest_framework.generics import RetrieveAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response

from . import sample
from . import DELIVERIES


class DeliveryAPI(RetrieveAPIView, CreateAPIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )
    lookup_field = "delivery"

    def get_object(self):
        for delivery in DELIVERIES:
            if delivery.__name__.split(".")[-1].lower() == self.kwargs[self.lookup_field].lower():
                return delivery
        return sample

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instructions = instance.get_initial_instructions()
        assert "description" in instructions
        return Response(instructions)

    def create(self, request, *args, **kwargs):
        instance = self.get_object()
        input_text = request.data["body"]
        data = instance.receive_request(input_text)
        assert "data" in data
        return Response(data)


delivery_api = DeliveryAPI.as_view()
