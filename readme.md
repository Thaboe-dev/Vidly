![](https://cdn.dribbble.com/users/444784/screenshots/5418922/vidly-final-logo-color.jpg)

# Vidly Express Server

A practical node-express project in order to increase my backend implement skills using javaScript .

# Getting Started

### These instructions will get you a copy of the project up and running on your local machine for development and testing purposes:

## Primary exception of sharing this is repository is your attention on notes I'm attached on the following of this passage:

## Prerequisites

- clone the source code using git or download it using top right link

## Installing

run following command on project root in order to installing dependencies and dev-dependencies

> npm install

# Running the tests

Application writing base on test driven development;
whole tests source codes available on tests directory.

## Break down into unit and integration tests

### jest testing command embedded into npm scripts test you can test all aspects of application using following command:

> npm run test

### here's lists of all tests passed by _routeHandlers_ and _middleWares_ also end point address provided as topic on top of each describe:

```
PASS  tests/integration/movie.test.js
  /api/movie
    GET/
      ✓ Should return all movies when send GET request (414ms)
      ✓ should return 404 if no movie found (7ms)
    GET/:id
      ✓ Should return 404 when receive an invalid id (9ms)
      ✓ Should return the movie by given id. (9ms)
    POST/
      ✓ Should return 401 if no token provided (15ms)
      ✓ Should return 400 if movieTitle less than 3 character (11ms)
      ✓ Should return 400 if movieTitle more than 255 character (5ms)
      ✓ Should return 400 no genresId is provided (5ms)
      ✓ Should return 400 no numberInStock is less than 0 (6ms)
      ✓ Should return 400 dailyRentalRate is less than 0 (5ms)
      ✓ should return 200 if request is valid (7ms)
      ✓ Should save the movie if request is valid (8ms)
      ✓ Should return movie if request is valid (6ms)
    PUT/
      ✓ Should return 401 if no token provided (5ms)
      ✓ Should return 400 if movieTitle less than 3 character (6ms)
      ✓ Should return 400 if movieTitle more than 255 character (21ms)
      ✓ Should return 400 no genresId is provided (15ms)
      ✓ Should return 400 no numberInStock is less than 0 (5ms)
      ✓ Should return 400 dailyRentalRate is less than 0 (5ms)
      ✓ Should return 404 if no movie founded by the given id (9ms)
      ✓ should return 200 if request is valid (13ms)
      ✓ Should update the movie if request is valid (11ms)
      ✓ Should send Updated movie if request is valid (10ms)
    DELETE/
      ✓ should return 401 if token not provided (4ms)
      ✓ should return 404 if no movie founded by the given id (5ms)
      ✓ should return 200 if user is admin and id is valid (5ms)
      ✓ should remove movie given id if user is admin and id is valid (7ms)
      ✓ should send movie genre to the user (5ms)

 PASS tests/integration/users.test.js
  /api/users
    GET/me
      ✓ should return 401 if no token provided (80ms)
      ✓ should return 200 if request is valid (91ms)
      ✓ should send user if request is valid (76ms)
    POST/
      ✓ should return 401 if not token provided (3ms)
      ✓ should return 400 if user name is less than 3 character (2ms)
      ✓ should return 400 if user email is less than 10 character (7ms)
      ✓ should return 400 if user name is more than 50 character (9ms)
      ✓ should return 400 if user email is more than 255 character (4ms)
      ✓ should return 400 if user password is less than 8 character (3ms)
      ✓ should return 400 if user password is more than 30 character (2ms)
      ✓ should return 400 if user password does not contain at least one lowerCase character (3ms)
      ✓ should return 400 if user password does not contain at least one UpperCase character (2ms)
      ✓ should return 400 if user password does not contain at least one numeric character (3ms)
      ✓ should return 400 if user already exist by given email (5ms)
      ✓ should save the user if request is valid (85ms)
      ✓ should return 200 if request is valid (75ms)
      ✓ should send userInfo if request is valid (74ms)

 PASS  tests/integration/authentication.test.js
   /auth
    POST/
      ✓ should return 400 if email less than 10 character (148ms)
      ✓ should return 400 if password less than 8 character (75ms)
      ✓ should return 400 if email more than 255 character (75ms)
      ✓ should return 400 if password more than 1024 character (73ms)
      ✓ should return 400 if user by the given email not found (77ms)
      ✓ should return 400 if password is not correct (146ms)
      ✓ return 200 if request is valid (140ms)
      ✓ should send specific string if request is valid (140ms)

 PASS  tests/integration/rental.test.js
     /api/rentals
    GET/
      ✓ should return 401 if no token provided (81ms)
      ✓ should return 404 if not rental available (15ms)
      ✓ should return 200 if request is valid (16ms)
      ✓ should send all rentals (15ms)
    GET/:id
      ✓ should return 401 if no token provided (10ms)
      ✓ should return 404 if not rental available by given id (12ms)
      ✓ should return 200 if request is valid (13ms)
      ✓ should send rental if request is valid (13ms)
    POST/
      ✓ should return 401 if no token provided (14ms)
      ✓ should return 400 if no customer found by the given id (21ms)
      ✓ should return 400 if no movie found by the given id (14ms)
      ✓ should return 400 if movie.numberInStock is zero (22ms)
      ✓ should return 200 if request is valid (19ms)
      ✓ should save rental in db if request is valid (21ms)
      ✓ should decrease movie number in stock if request is valid (19ms)
      ✓ should send rental if request is valid (20ms)

 PASS  tests/integration/home.test.js
  /
    GET/
      ✓ should 200 receiving get request (444ms)

 PASS  tests/integration/customer.test.js
  /api/customer
    GET/
      ✓ should return 404 if customer by the given id not found (94ms)
      ✓ should return 200 if request is valid (6ms)
      GET/:id
        ✓ should return 404 if customer by given id not found (6ms)
        ✓ should return 200 if request is valid (7ms)
      POST/
        ✓ should return if not token provided (6ms)
        ✓ should return 400 if customer name is less than 3 character (6ms)
        ✓ should return 400 if customer phone is less than 5 character (5ms)
        ✓ should return 400 if customer name is more than 255 character (5ms)
        ✓ should return 400 if customer phone is more than 255 character (4ms)
        ✓ should return 400 if customer phone is more than 255 character (4ms)
        ✓ should return 200 if request is valid (5ms)
        ✓ should add the given customer into the db if request is valid (6ms)
        ✓ should send customer to user (6ms)
      PUT/
        ✓ should return if not token provided (4ms)
        ✓ should return 400 if customer name is less than 3 character (4ms)
        ✓ should return 400 if customer phone is less than 5 character (3ms)
        ✓ should return 400 if customer name is more than 255 character (4ms)
        ✓ should return 400 if customer phone is more than 255 character (4ms)
        ✓ should return 400 if customer phone is more than 255 character (4ms)
        ✓ should return 200 if requset is valid (7ms)
        ✓ should change the given customer into the db if request is valid (8ms)
        ✓ should send edited customer to user if requset is valid (11ms)
      DELETE/
        ✓ should return 401 if no toke provided (4ms)
        ✓ should return 404 if no customer by the given id (4ms)
        ✓ should return 200 request is valid (5ms)
        ✓ should delete customer by the given id if request is valid (5ms)
        ✓ should send deleted customer to user if request is valid (5ms)

 PASS  tests/integration/genres.test.js
  /api/genres
    GET/
      ✓ Should return all genres when send GET request (60ms)
    GET/:id
      ✓ Should return the genre by given id. (8ms)
      ✓ Should return 404 when receive an invalid id (5ms)
    POST/
      ✓ Should return 401 when user not logged in. (5ms)
      ✓ Should return 400 when genre name is less than 5 character (3ms)
      ✓ Should return 400 when genre name is more than 50 character (3ms)
      ✓ Should save the genres req is valid (7ms)
      ✓ Should return genre if req is valid (4ms)
    PUT/
      ✓ should return 401 if user not provided token (12ms)
      ✓ should return 400 if id not found (11ms)
      ✓ should return 400 if genre no name provided (10ms)
      ✓ should return 400 if genre name lessThan 5 character (13ms)
      ✓ should return 400 if genre name moreThan 50 character (14ms)
      ✓ should return 200 if genre name is valid (28ms)
      ✓ should update genre by the given id (9ms)
      ✓ should place updated genre into res.body (6ms)
    DELETE/
      ✓ should return 401 if token not provided (4ms)
      ✓ should return 403 if user not admin (5ms)
      ✓ should return 404 if genre not found (5ms)
      ✓ should return 200 if user is admin and id is valid (6ms)
      ✓ should remove genre by given id if user is admin and id is valid (5ms)
      ✓ should send removed genre to the user (6ms)

 PASS  tests/integration/return.test.js
  /api/return
    POST/
      ✓ should return 401 if user not logged in. (76ms)
      ✓ should return 400 if customerId is not provided (12ms)
      ✓ should return 400 if userId is not provided (8ms)
      ✓ should return 404 if no rental found for given customer or movie (11ms)
      ✓ should return 400 if rental already processed. (13ms)
      ✓ should return 200 if we have a valid  request (16ms)
      ✓ should set dateReturned on rental object if request is valid (17ms)
      ✓ should calculate rental fee (17ms)
      ✓ should increase number of movie in stock (17ms)
      ✓ should return rental if request is valid (13ms)

 PASS  tests/integration/authorization.test.js
  authorization-integration
    ✓ should return 401 if no token perovide (151ms)
    ✓ should return 400 if token is invalid (7ms)

info: listening on port 3000...
info: Connected to mongodb://localhost/vidly-test
 PASS  tests/unit/middlewares/authorization.test.js
  authorization-unit
    ✓ should place decoded into req.user if token is valid (3ms)

 PASS  tests/unit/models/user.test.js
  user.generateAuthToken
    ✓ Should return a valid jwt by the given payload (2ms)
```

# Built With

- @types/jest
- bcrypt
- compression
- config
- debug
- express
- express-async-errors
- fawn
- helmet
- joi
- joi-objectid
- joi-password-complexity
- jsonwebtoken
- lodash
- moment
- mongoose
- morgan
- pug
- winston
- winston-mongodb
- jest
- supertest
