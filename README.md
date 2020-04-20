# nodejs-jumpstart
Feel good application for people to share their smile reasons during the tough times of COVID-19.

All Apis will respond with proper HTTP Response Code. A 200OK response code means success. Any response code other than 200OK means something wrong happend.

All apis accept request content type `application/json`. If other than this required, content type will be documented with the api.

Sample error JSON response:

```json
{
	"type": "Bad Request",
	"message": "Reason text already exists",
	"data": null
}
```

## Used Libraries
```shell
"@hapi/boom": "^9.1.0"
"@hapi/joi": "^17.1.1",
"aws-sdk": "^2.653.0",
"body-parser": "^1.19.0",
"dotenv": "^8.2.0",
"express": "^4.17.1",
"express-async-errors": "^3.1.1",
"express-joi-validation": "^4.0.3",
"firebase": "^7.13.2",
"jsonwebtoken": "^8.5.1",
"knex": "^0.20.10",
"lodash": "^4.17.15",
"log4js": "^6.1.2",
"moment": "^2.24.0",
"multer": "^1.4.2",
"mysql": "^2.18.1",
"node-cron": "^2.0.3",
"nodemon": "^2.0.2",
"objection": "^2.1.3",
"uuid": "^7.0.3"
```

## Directory Structure
```shell
|-- Root Directroy (wallet)
    |-- .env --> Environment variables( run time will be cloned from specific .env )
    |-- .env.development --> Environment variables for development
    |-- .env.production --> Environment variables for production
    |-- knexfile.js --> Config for knex migration commands
    |-- package.json --> Node packages list
    |-- bin --> Custom npm & usefull shell scripts
    |-- docs --> Documentations
    |-- src
        |-- main
            |-- index.js --> Entry point for express server
            |-- app
            |   |-- controllers --> Controllers files
            |   |-- crons --> Cron jobs & files in this directory imported automatically
            |   |-- commons --> All sort of helpers
            |   |-- middlewares --> All sort of middlewares
            |   |-- models --> All modes should be here
            |   |-- routes --> Routes & files in this directory imported automatically
            |-- boot --> Booting utilities
            |-- config --> App configurations
            |   |-- api.js --> Api related configs & constants
            |   |-- database.js --> Databse configuration
            |-- database --> Databasse table migrations and seeds
```

## Environment Setup
```shell
 Create .env.development & .env.production files in root directory.
 Clone the .env.sample into above two files and change the values accordingly.
```

### .env.sample
```shell
NODE_ENV=development
PORT=3000
APP_NAME=nodejs-jumpstart
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=nodejs-jumpstart
DB_USERNAME=root
DB_PASSWORD=
DB_PORT=3306
FIREBASE_API_KEY=
JWT_SECRET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=nodejs-jumpstart
```

## Run
```javascript
 Open terminal and move to the root directory.  Do the following steps :
 
 # Insall npm dependencies.
 > npm install
 
 # To create migration files
NODE_ENV=development ./node_modules/.bin/knex migrate:make users
 
 # Run migration to create tables
 > NODE_ENV=development ./node_modules/.bin/knex migrate:latest
 
 # To start server
 > npm run dev
 	or
 > npm run prod
 
 *Note :  if heroku set the .env
```