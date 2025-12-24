
MERN Stack Chess App


This is a repo of a basic fullstack chess webapp that is deployed on AWS at the url below:

*insert url*

The app does a couple of things currently:
It supports account creation and login.
It calls the Lichess daily puzzle endpoint and saves the puzzle to the database.
It shows the last ten daily lichess puzzles.
It supports a basic score system, solving a puzzle while logged into an account gives you a point. It shows the top 5 scoring users across the website.
For logged in users it supports puzzle creation, viewing, and deleation.
You can browse and play through all saved user puzzles.

The purpose of this app is to showcase my software engineering abilities. As such, I will go through a more detailed overview of the code below.


Table of Contents
Project Walkthrough
  -Backend
    -Testing
  -Frontend
  -Deployment
  

Project Walkthrough

Overview:
  The webapp is built with a client-server architecture, where as the backend is seperate from the frontend. The backend contains the database, mongodb in this case, the service layer, and the routing layer. It also contains some middleware for data validation and authentication, unit and integration testing, logging utlities, and a simple job script. The apis are accessed via the frontend's api handler layer which is either accessed through react hooks or directly in components or pages. The frontend also contains authentication contexts to handle tokens.
  

Backend

Packages used:

"axios": API Request package, used to ping the lichess daily puzzle endpoint. I used axios for mocking within my unit testing in jest so that I didn't have to actually hit the lichess endpoint when doing testing. I used curl for the actual puzzle retreival as curl is easier to impliment, a simple one liner, to do HTTP get requests.

"bcrypt": Encryption package for encrypting user passwords.

"compression": As the name suggest, the compression package compresses JS code.

"cors": Cross-Origin Resource Sharing, so that my backend api is accessable by my frontend.

"cron": An automatic script runner, used to run the fetch jobs to retreive the lichess dailypuzzle daily. I have the script run twice a day, in the morning and evening, to fetch the daily chess puzzle when it is udpated. The lichess daily puzzle updates randomly during the day. Duplicate puzzles are ignored.
The job scripts are in the below filepath:
chess/backend/src/service/jobs

"curl": HTTP Request package used to ping the lichess daily puzzle endpoint.

"dotenv": Enviormental variables.

"express": The backend framework used with node.

"express-jwt": Express implimentation of jsonwebtokens, see below.

"express-mongo-sanitize": Mongo-Sanatization middleware to prevent sql injection attacks

"helmet": Helmet middleware for HTTP security.

"joi": Middleware for input validation.

"jsonwebtoken": JSON web tokens for hashing account passwords before saving them to the database.

"mongoose": Database ARM to run queries into mongodb.

"morgan": middleware for logging http requests.  

"react": Frontend framework.

"react-dom": React router for front end.

"swagger": Backend API Documentation. See below url to view the swaggar documents for the backend api:

"swagger-jsdoc": See swagger above.

"swagger-ui-express": See swagger above.

"winston": Logging.


Dev Dependencies Used:

"@eslint/js": 

"@types/react": 

"@types/react-dom": 

"@vitejs/plugin-react": 

"cross-env": 

"eslint": 

"eslint-plugin-react-hooks": 

"eslint-plugin-react-refresh":

"globals":

"jest": The testing suite I used for unit testing and integration testing. My tests can be found in the below path:
chess/backend/src/__tests__

I use testing to also automate CI/CO with github actions. I will write more on my CI/CO implimentation in the deployment section.

"mongodb-memory-server": 

"supertest": 

"vite": 

  
WIP

