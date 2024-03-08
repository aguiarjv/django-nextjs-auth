from rest_framework import serializers
from comments.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field='email', read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'

    def validate(self, data):
        request = self.context.get("request")

        if (request is not None and request.method == "POST"):
            data['user'] = request.user

        return data
