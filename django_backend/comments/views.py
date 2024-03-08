from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from comments.models import Comment
from comments.serializers import CommentSerializer


def filtered_comments(user):
    if (user.is_staff):
        return Comment.objects.all()

    return Comment.objects.filter(user=user)


class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return filtered_comments(self.request.user)


class CommentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return filtered_comments(self.request.user)
