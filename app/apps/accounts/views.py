from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .serializers import SignUpSerializer, DashboardSerializer
from .models import User


class SignUp(CreateAPIView):
    queryset = User.objects
    serializer_class = SignUpSerializer


class Dashboard(RetrieveAPIView):
    queryset = User.objects
    serializer_class = DashboardSerializer
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )

    def get_object(self):
        return self.request.user


sign_up = SignUp.as_view()
dashboard = Dashboard.as_view()
