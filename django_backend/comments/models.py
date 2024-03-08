from django.db import models
from accounts.models import CustomUser


class Comment(models.Model):
    user = models.ForeignKey(CustomUser, models.CASCADE)
    title = models.CharField(max_length=50)
    comment = models.TextField(max_length=255)
    created_at = models.DateTimeField(null=True, blank=True, auto_now_add=True)
