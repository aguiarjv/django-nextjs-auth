# Next.js authentication with DRF backend

This project seeks to implement a Next.js app that uses JWT tokens provided by a Django Rest Framework backend.
It is a simple app where the user can create new posts and the main page shows a list of the user's posts information.

The main goal of this project was for studying purposes and to build an example for future references.

## Screenshots
TODO
- Register screen
- Login screen
- Dashboard table screen
- New post screen

## Auth
- [DRF Simple JWT](https://github.com/jazzband/djangorestframework-simplejwt) was used to implement token authentication in the django backend.
- [NextAuth.js](https://github.com/nextauthjs/next-auth) was used to implement authentication in the Next.js app.

## Features
- Register new user.
- User can create new posts.
- Table with user's posts information.
- Table with a search filter and pagination.
- Redirect to the login page if the user is not logged in.
- Redirect to the dashboard page if the user is logged in.
- When the token expires the user session will be deleted and they will be redirected to the login page.

## How to setup and additional info
For additional information on how the Next.js app or the django backend was built and how to set up the project:
- [Django backend information.](/django_backend/)
- [Next.js app information.](/next_frontend/)