
MERN Stack Chess App

Introduction

This is a repo of a basic fullstack chess webapp that is deployed on AWS at the url below:

*insert url*

The app does a couple of things currently:
It supports account creation and login.
It calls the Lichess daily puzzle endpoint and saves the puzzle to the database.
It shows the last ten daily lichess puzzles.
It supports a basic score system, solving a puzzle while logged into an account gives you a point. It shows the top 5 scoring users across the website.
For logged in users it supports puzzle creation, viewing, and deleation.
You can browse and play through all saved user puzzles.

The purpose of this app is to showcase my software engineering abilities. As such, I will go through a more detailed overview below.

Project Walkthrough

System Architecture
  The webapp is built with a client-server architecture, where as the backend is seperate from the frontend. The backend contains the database, mongodb in this case, the service layer, and the routing layer. It also contains some middleware for data validation and authentication, unit and integration testing, logging utlities, and a simple job script. The apis are accessed via the frontend's api handler layer which is either accessed through react hooks or directly in components or pages. The frontend also contains authentication contexts to handle tokens.

Packages used:

Security : bcrypt: Encryption package for encrypting user passwords.
Utility: axios, dotenv, compression, cors, cron, mongoose, morgan, winston, swagger, eslint
Testing: jest, mongodb-memory-server, supertest
Frontend: React, Vite, Chess.js, react-chessboard, tanstack, jwt-decode, react-router-dom

Breakdown
Security
bcrypt: Hashing package for encrypting user passwords.
express-jwt
express-mongo-sanitize:  Mongo-Sanatization middleware to prevent sql injection attacks
joi: Middleware for input validation.
helmet: Helmet middleware for HTTP security.
jsonwebtoken: JSON web tokens for session authentication.

Utility:
axios: API Request package, used to send HTTP GET request to Lichess dailypuzzle backend.
compression: Compresses HTTP responses.
cors: Cross-Origin Resource Sharing, so that the backend api is accessable to the frontend.
cron: An automatic script runner, used to run the fetch jobs to retreive the lichess dailypuzzle daily. I have the script run twice a day, in the morning and evening, to fetch the daily chess puzzle when it is udpated. The lichess daily puzzle updates randomly during the day. Duplicate puzzles are ignored. The job scripts are in the below filepath:
chess/backend/src/service/jobs
mongoose: Database ARM to run queries into mongodb.
morgan: middleware for logging http requests.  
winston: Logging.
swagger: Backend API Documentation. See below url to view the swaggar documents for the backend api:
eslint: JS linter.
cross-env: Enviornmental variable.

Test:
jest: The testing suite I used for unit testing and integration testing.
mongodb-memory-server: Memory server used during testing. Instead of using my development db, I use an in memory db to mock db usage for testing.
supertest: Integration and end to end test package.

Frontend
React: Frontend framework.
Vite: Frontend build tool.
Chess.js: Handles the chess game logic.
react-chessboard: React chessboard component to display the board conditions, interacts with chess.js for rule handling.
tanstack: Querying tool for react.
jwt-decode: for decoding jwt tokens made in the backend, for validating frontend user session.
react-router-dom: routing for frontend in react.


File structure

Backend File Structure

|mern_chess/chess/backend/src/
├──__tests__/ # Unit test and integration testing.
├──db/ #Stores the database init script and models.
├──middleware/ #joi data validation and jwt auth.
├──routes/ # routing logic.
├──service/ # business logic.
| └──jobs/ # cronjob scripts.
├──swagger/ #swagger endpoint documentation setup files
├──tests/ # testing setup teardown files
├──utils/ # Winston logging.
|app.js #entry point
|server.js # server setup

Frontend





Cron Job




Testing, CI/CD, and Deployment




Security


  
WIP

