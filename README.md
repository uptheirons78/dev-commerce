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