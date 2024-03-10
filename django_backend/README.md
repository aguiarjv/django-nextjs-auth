# Backend built with Django Rest Framework

## Views and endpoints
- Register new user view
    - `resgister/`

- Create and List posts view
    - `post/`
    - Posts can be filtered by the title.
    - Super users can list all posts.
    - Regular users can only list their posts.

- Retrieve and Destroy posts view
    - `post/<int:pk>/`
    - Super users can retrieve/destroy any post.
    - Regular users can only retrieve/destroy their posts.

- Obtain and Refresh token views
    - `api/token/`
    - `api/token/refresh/`

## Custom Token Obtain/Refresh Serializers
The default views of the [Simple JWT](https://github.com/jazzband/djangorestframework-simplejwt) package responds the request with only the access token (in the Refresh view) and with the access token and refresh token (in the Obtain Token view). But our Next.js app expects additional information: user email and the access token lifetime in seconds.

The solution was to change the serializer used in the Obtain and Refresh token views so that information would be sent. Thus a Custom Serializer and a Custom View were created to provide the needed functionality. You can check it in the [accounts/serializers.py](/django_backend//accounts/serializers.py) and [accounts/views.py](/django_backend/accounts/views.py) files.

## Setup
Simply create a new virtual environment, source it and pip install the requirements.txt. Then run:
- `python manage.py makemigrations` 
- `python manage.py migrate`
- `python manage.py runserver`

