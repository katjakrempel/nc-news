const express = require('express');
const { getTopics } = require('./controllers/topics-controllers');
const { getArticleById, getArticles } = require('./controllers/articles-controllers');
const { getEndpoints } = require('./controllers/api-controllers');
const app = express();


app.get('/api/topics', getTopics);

app.get('/api', getEndpoints);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles/', getArticles);

app.all('/*', (request, response, next) => {
    response.status(404).send({ msg: 'path not found' });
});


app.use((err, request, response, next) => {
    if (err.code === '22P02') {
        response.status(400).send({ msg: 'bad request' })
    } else {
        next(err);
    }
})

app.use((err, request, response, next) => {
    if (err.status && err.msg) {
        response.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    }
})

app.use((err, request, response, next) => {
    console.log(err);
    response.status(500).send({ msg: 'internal server error' });
})


module.exports = app;