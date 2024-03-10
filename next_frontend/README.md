# Next.js App
The main goal of this app was to learn how the NextAuth.js project works and how to implement a JWT Access Token provided by a separte backend server and of course to have a reference for future projects.

## NextAuth.js
### Basics
[NextAuth v5](https://authjs.dev/) was used to build the authentication logic. The authentication method only use Credentials. So providing a valid username/email and password in the Next.js App will trigger the Django backend to respond with a JWT Access Token.

The authentication verification happens in a middleware that redirects the user if needed. The functions `signIn` and `signOut` are used to server side create or delete a user session. Finally the `auth` function is used to server side get the current user session.

All the configuration and implementation of the authentication process are based on these three files:
- [*auth.config.ts*](/next_frontend/src/auth.config.ts)
- [*auth.ts*](/next_frontend/src/auth.ts)
- [*middleware.ts*](/next_frontend/src/middleware.ts)

### *auth.config.ts* file
This file is used to create the configuration that will be used by NextAuth.js. It sets the route to the login page and define a few callbacks that will be used by the authentication process.

- **_authorized_ callback**: it will be used by the *middleware.ts* file. Check the middleware section.
- **_jwt_ callback**: this callback is called on sign in or whenever the session is accessed. On sign in it will save the access token, refresh token and access token lifetime provided by the Django backend. When the session is accessed this callback will check if the access token is still valid, if not it will try to refresh it and if the refresh token has expired this callback will return an error.
- **_session_ callback**: data returned by this callback will be accessible to the client. This callback will return the JWT Access Token provided by the Django backend and the user's email or an error (if the token refresh failed).

### *auth.ts* file
This file effectively creates the authentication process using the *NextAuth* function with the configuration defined in the *auth.config.ts* file. Here is also defined the Credentials Provider which will send the credentials (username/email and password) to the Django backend. Finally it will return valid data provided by the backend or it will throw an error.

This file also exports three functions: `auth`, `signIn` and `signOut` which will be used throughout the application to perform server side logic.

### *middleware.ts* file
Every request to the application will pass through this middleware. All the logic was written in the *authorized* callback in the *auth.config.ts* file. 

This middleware will first check if there is a user session and if the user is trying to access a protected route. If the user session does not exist they will be redirected to the login page. If a valid user session exists and the user is trying to access the login page they will be redirected to the protected `/dashboard` route.

The middleware also checks if the *jwt* returned an error by accessing the session's error property. If it exists then the user will be redirected to the `/api/logout` route.

### *'api/logout/'* route
This route was created simply to use the server side `signOut` function. Whenever the user is redirected to this route the sign out function will be triggered, the current session will be deleted and the user will be redirected to the login page.

## Setup
There are a few enviroment variables that the project needs to work properly in both development and production enviroments:
- *AUTH_SECRET*: From the official [guide](https://authjs.dev/getting-started/deployment): This is used to encrypt cookies and tokens. On linux you can generate this with the following command:
    - `openssl rand -base64 32`
- *NEXTAUTH_URL*: From the official [guide](https://authjs.dev/getting-started/deployment): When deploying to production, set to the canonical URL of your site.
- *BACKEND_URL*: URL of the django backend server.

Configuration example of development environment (*.env* file):
```
AUTH_SECRET=8CH82uyuj0DfUYoOVyuPA3/sd/c+XVsqo36+Z3kNYHY=
BACKEND_URL=http://localhost:8000
NEXTAUTH_URL=http://localhost:3000
```

## Components Library
The components were built using [shadcn/ui](https://ui.shadcn.com/).