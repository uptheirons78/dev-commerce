# Dev-Commerce

A Full Stack Ecommerce project built with MERN: MongoDB, Express, React and Node.

#### Back End (Step By Step)

* Create Express server after `npm i express nodemon dotenv`;
* Create a Database on MongoDB Atlas (or with a local installation of MongoDB);
* Install Mongoose and connect with your DB;
* Create `routes` directory and manage routes;
* Create `controllers` directory and manage different controllers;
* Create `models` directory and Mongoose Schemas. Install uuid package;
* Create Virtuals in User Schema to generate an hashed password with crypto;
* Install Morgan package and call it inside `app.js`;
* Create an error handler to create more readable errors for database;
* Create the New User controller inside userController;
* Install express-validator, create a validators folder with all methods to use, import it inside user route and check for errors;
* Create signin route, its controller and authentication method inside User Model; [step-06]
* Create signiout route and its controller with express-jwt; [step-06]
* Create a middleware for protected routes: requireSignin; [step-06]

#### Refactoring Application Structure [step-07]

* Rename 'userControlle.js' to 'authController.js';
* Rename 'user.js' in routes folder to 'auth.js';
* Create 'userById' route and its controller;
* Create 2 methods in authController: isAuth and isAdmin;

#### Categories routes and schemas [step-08]

* Create Category Schema with Mongoose;
* Create Category Route;
* Create Category Controller and update app.js to use category route;
* Inside Category Route check if user is signedin, authenticated and also admin;