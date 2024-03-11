from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from django.conf import settings


class CustomPagination(PageNumberPagination):
    """
    Custom Pagination class made to include the page size
    in the responses
    """

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'default_page_size': settings.REST_FRAMEWORK.get("PAGE_SIZE"),
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data
        })
