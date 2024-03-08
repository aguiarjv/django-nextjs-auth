from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from django.conf import settings


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        access_lifetime = settings.SIMPLE_JWT.get('ACCESS_TOKEN_LIFETIME')

        user = self.user

        data["email"] = user.email
        data["access_expires_in"] = access_lifetime

        return data


class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        access_lifetime = settings.SIMPLE_JWT.get('ACCESS_TOKEN_LIFETIME')

        data["access_expires_in"] = access_lifetime

        return data
