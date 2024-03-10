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

    path("post/", PostListCreateView.as_view(), name='post-list-create'),
    path("post/<int:pk>/", PostRetrieveUpdateDestroyView.as_view(),
         name='post-detail-view'),

    path("register/", RegistrationView.as_view(), name='registration-view'),
    path("change-password/", PasswordChangeView.as_view(),
         name='password-change-view'),
]
