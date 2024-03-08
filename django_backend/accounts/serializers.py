from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework import serializers
from django.conf import settings

from accounts.models import CustomUser


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


class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        style={"input_type": "password"}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        user = CustomUser(
            email=self.validated_data['email'], username=self.validated_data['email'])

        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError(
                {'password': 'Passwords must match.'})

        user.set_password(password)
        user.save()

        return user


class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField(
        style={"input_type": "password"}, required=True, write_only=True)
    new_password = serializers.CharField(
        style={"input_type": "password"}, required=True, write_only=True)
    new_password2 = serializers.CharField(
        style={"input_type": "password"}, required=True, write_only=True)
    message = serializers.CharField(
        read_only=True, default="Successfully changed the password")

    def validate_current_password(self, value):
        if not self.context['request'].user.check_password(value):
            raise serializers.ValidationError(
                {'current_password': 'Does not match'})
        return value

    def validate(self, data):
        if data['new_password'] != data['new_password2']:
            raise serializers.ValidationError(
                {'password': 'Passwords must match.'})

        data['user'] = self.context.get('request').user

        return data

    def create(self, validated_data):
        user = validated_data['user']
        user.set_password(validated_data['new_password'])
        user.save()
        return user
