const express = require('express');
const { getTopics } = require('./controllers/topics-controllers');
const { getArticleById, getArticles, getCommentsByArticleId, postComment, patchArticle } = require('./controllers/articles-controllers');
const { deleteComment } = require('./controllers/comments-controllers')
const { getUsers } = require('./controllers/users-controllers');
const { getEndpoints } = require('./controllers/api-controllers');
const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api', getEndpoints);

app.get('/api/articles/:article_id', getArticleById);
app.patch('/api/articles/:article_id', patchArticle);

app.get('/api/articles/', getArticles);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);
app.post('/api/articles/:article_id/comments', postComment);

app.delete('/api/comments/:comment_id', deleteComment);

app.get('/api/users', getUsers);


app.all('/*', (request, response, next) => {
    response.status(404).send({ msg: 'path not found' });
});


app.use((err, request, response, next) => {
    const errorCodes = ['22P02', '23503', '23502'];
    if (errorCodes.includes(err.code)) {
        response.status(400).send({ msg: 'bad request' })
    } else {
        next(err);
    }
});

app.use((err, request, response, next) => {
    if (err.status && err.msg) {
        response.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    }
});

app.use((err, request, response, next) => {
    console.log(err);
    response.status(500).send({ msg: 'internal server error' });
});


module.exports = app;