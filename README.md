# Northcoders News API

### Project Summary

This project mimics the building of a real world backend service for an application such as reddit. The API can be used to access and manipulate articles, comments and user data via different endpoints.  

The database is PSQL, and it is interacted with using node-postgres.

Feel free to clone the repo or take a look at the hosted version here: [https://nc-news-p6u3.onrender.com/api](https://nc-news-p6u3.onrender.com/api)  



### Setup
#### 1. Clone the repo
In order to clone the repo, run the following command from your terminal
```
git clone https://github.com/katjakrempel/nc-news.git
cd nc-news
```

#### 2. Install dependencies
Once you've cloned the repo, you can install any required dependencies by running
```
npm install
```

#### 3. Setup and seed database
There are two databases, one for real-looking development data, and another for simpler test data.

In order to connect to the databases locally, create two `.env` files: `.env.test` and `.env.development`. Into each, add `PGDATABASE=`, with the correct database name for that environment (see `/db/setup.sql` for the database names).

In order to set up and seed the databases, run the following command
```
npm run setup-dbs
npm run seed
```

#### 4. Run tests
This API was created using Test Driven Development (TDD). You can run the test suite with this command 

```
npm test
```
Please note this will run all tests by default. In order to run tests individually, add `.only` to the respective test or describe block.

### Prerequisites
This project was built using Node.js v21.5.0 and PostgreSQL v14.0.