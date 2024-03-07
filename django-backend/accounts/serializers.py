from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.conf import settings


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        access_lifetime = settings.SIMPLE_JWT.get('ACCESS_TOKEN_LIFETIME')
        refresh_lifetime = settings.SIMPLE_JWT.get('REFRESH_TOKEN_LIFETIME')

        user = self.user

        data["email"] = user.email
        data["access_expires_in"] = access_lifetime
        data["refresh_expires_in"] = refresh_lifetime

        return data
