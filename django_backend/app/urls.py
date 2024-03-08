from django.contrib import admin
from django.urls import path

from accounts.views import (
    CustomTokenObtainPairView, CustomTokenRefreshView,
    RegistrationView, PasswordChangeView)
from posts.views import PostListCreateView, PostRetrieveUpdateDestroyView


urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/token/", CustomTokenObtainPairView.as_view(),
         name="token_obtain_pair"),
    path("api/token/refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),

    path("comment/", PostListCreateView.as_view(), name='comment-list-create'),
    path("comment/<int:pk>/", PostRetrieveUpdateDestroyView.as_view(),
         name='comment-detail-view'),

    path("register/", RegistrationView.as_view(), name='registration-view'),
    path("change-password/", PasswordChangeView.as_view(),
         name='password-change-view'),
]
