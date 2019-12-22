# Dev-Commerce

A Full Stack Ecommerce project built with MERN: MongoDB, Express, React and Node.

## Back End (Step By Step)

#### Initial Setup [step-01]

* Create Express server after `npm i express nodemon dotenv`;

#### DB Creation, Mongoose, connection and dotenv [step-02]

* Create a Database on MongoDB Atlas (or with a local installation of MongoDB);
* Install Mongoose and connect with your DB;

#### First routes and their controllers [step-03]

* Create `routes` directory and manage routes;
* Create `controllers` directory and manage different controllers;

#### Models and Schemas with Mongoose [step-04]

* Create `models` directory and Mongoose Schemas. Install uuid package;
* Create Virtuals in User Schema to generate an hashed password with crypto;
* Install Morgan package and call it inside `app.js`;

#### Error Handling, Validation and New User controller [step-05]

* Create an error handler to create more readable errors for database;
* Create the New User controller inside userController;
* Install express-validator, create a validators folder with all methods to use, import it inside user route and check for errors;

#### Sign-in Route, Controller and Schemas [step-06]

* Create signin route, its controller and authentication method inside User Model;
* Create signiout route and its controller with express-jwt;
* Create a middleware for protected routes: requireSignin;

#### Refactoring Application Structure [step-07]

* Rename 'userControlle.js' to 'authController.js';
* Rename 'user.js' in routes folder to 'auth.js';
* Create 'userById' route and its controller;
* Create 2 methods in authController: isAuth and isAdmin;

#### Categories Route and Schemas [step-08]

* Create Category Schema with Mongoose;
* Create Category Route;
* Create Category Controller and update app.js to use category route;
* Inside Category Route check if user is signedin, authenticated and also admin;

#### Products Routes and Schemas [step-09]

* Create Product Schema with Mongoose;
* Create Product Routes and Controllers;
* Install Formidable and Lodash to load files like images;
* Apply some validation inside Controller (fields and file size check);