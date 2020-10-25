# Kashware

## Table of Contents
1. General Info
2. Packages
3. Installation
4. Basic Requirement

## General Info
This project is focused toward building an API for Image Thumbnail with authentication with the help of PassportJWT and passport-local. Test cases has been build using JEST and SUPERTEST framework. All the routes are been covered in the test cases. Multer package is used to upload image. 

## Packages
1. Multer
2. Passport-local
3. Sequelize
4. Sharp
5. Jest
6. Express
7. PassportJWT

## Installation
1. Multer: npm i multer
  Multer is a node. js middleware for handling multipart/form-data , which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.
  
2. Passport-local: npm i passport-local
  This module lets you authenticate using a username and password in your Node. js applications. By plugging into Passport, local authentication can be easily and unobtrusively     integrated into any application or framework that supports Connect-style middleware, including Express.

3. Sequelize: npm i sequelize
  Sequelize is a powerful library in Javascript that makes it easy to manage a SQL database. ... At its core, Sequelize is an Object-Relational Mapper – meaning that it maps an     object syntax onto our database schemas. Sequelize uses Node. JS and Javascript's object syntax to accomplish its mapping
  
4. Sharp: npm i sharp
  The typical use case for this high speed Node. js module sharp is to convert large images in common formats to smaller dimensions.
 
5. Jest: npm i jest --save-dev
  Jest is a JavaScript test runner, that is, a JavaScript library for creating, running, and structuring tests. Jest ships as an NPM package, we need supertest installed with     jest to perform testing operations.
  
6. Express: npm i express
   The express framework is the most common framework used for developing Node js applications and helps in fast-tracking development of server-based applications. Routes are      used to divert users to different parts of the web applications based on the request made.

7. PassportJWT: npm i passport-jwt
   Passport is Express-compatible authentication middleware for Node.This module lets you authenticate endpoints using a JSON web token. It is intended to be used to secure        RESTful endpoints without sessions.
   
## Basic Requirement
   Basic Requirement to run this project is the nodeJs. One should has npm initializer setup by using npm init and other packages mention above installed.
   To run the application please use npm run start in command line and to run test cases please use npm run test.
