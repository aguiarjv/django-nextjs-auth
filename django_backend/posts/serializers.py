from rest_framework import serializers
from posts.models import Post


class PostSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field='email', read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def validate(self, data):
        request = self.context.get("request")

        if (request is not None and request.method == "POST"):
            # When it is a post request, add the user to the data dict
            data['user'] = request.user

        return data
