from rest_framework import generics
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from posts.models import Post
from posts.serializers import PostSerializer


def filtered_posts(user):
    if (user.is_staff):
        return Post.objects.all()

    return Post.objects.filter(user=user)


class PostListCreateView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering = ['-created_at']

    def get_queryset(self):
        title = self.request.query_params.get('title')
        if title is not None:
            return filtered_posts(self.request.user).filter(title__icontains=title)

        return filtered_posts(self.request.user)


class PostRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return filtered_posts(self.request.user)
