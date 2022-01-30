# News Explorer
*News Explorer* is allows users to search for news, create an account and save articles. [You can watch the demo here!](https://www.loom.com/share/15c90be6c7cc4f018fda792be4a1f7b0?sharedAppSource=personal_library)
<br><br>
[my-news-explorer.students.nomoreparties.sbs](https://my-news-explorer.students.nomoreparties.sbs)<br />
[www.my-news-explorer.students.nomoreparties.sbs](https://www.my-news-explorer.students.nomoreparties.sbs)

**Note: Please see the [News Explorer frontend repository](https://github.com/rileydanejohnston/news-explorer-frontend) readme file for a details on how the full application works.
<br><br>

## Technologies, Features, Libraries
MongoDB - Express.js - Node.js

Backend
* JSON web tokens: simplifies the authentication process
* celebrate: inbound data validation
* mongoose: allows JavaScript to work with our database (MongoDB)
* bcryptjs: protects passwords with hashes and a 10 character salt
* middlewares: express request limiter, request and error logging with winston/express-winston, enabling CORS, authorization, HTTP headers with helmet
<br><br>

## Deployment
*News Explorer* is deployed with Google Cloud. It features HTTPS protocol via SSL certificates and redirects requests using NGINX. The app can be viewed at:<br><br>
[my-news-explorer.students.nomoreparties.sbs](https://my-news-explorer.students.nomoreparties.sbs)<br />
[www.my-news-explorer.students.nomoreparties.sbs](https://www.my-news-explorer.students.nomoreparties.sbs)
<br><br>

## Getting started - development
1. copy the repositories to your machine (links to repository below)
2. run 'npm i' in the root directory of each project
3. run 'npm run dev' from to launch the backend. [New Explorer backend respository](https://github.com/rileydanejohnston/news-explorer-backend)
4. run 'npm run start' from to launch the frontend. [News Explorer frontend repository](https://github.com/rileydanejohnston/news-explorer-frontend)
5. that's it. have fun!!
