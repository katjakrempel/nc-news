const express = require('express');
const { getTopics } = require('./controllers/topics-controllers');
const { getArticleById } = require('./controllers/articles-controllers');
const { getEndpoints } = require('./controllers/api-controllers');
const app = express();


app.get('/api/topics', getTopics);

app.get('/api', getEndpoints);

app.get('/api/articles/:article_id', getArticleById);

app.all('/*', (request, response, next) => {
    response.status(404).send({ msg: 'path not found' });
});

module.exports = app;