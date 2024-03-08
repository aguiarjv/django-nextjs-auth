from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated

from accounts.serializers import (
    CustomTokenObtainPairSerializer, CustomTokenRefreshSerializer,
    RegistrationSerializer, PasswordChangeSerializer)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer


class RegistrationView(CreateAPIView):
    queryset = None
    serializer_class = RegistrationSerializer


class PasswordChangeView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = None
    serializer_class = PasswordChangeSerializer
