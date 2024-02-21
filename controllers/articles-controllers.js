const { articleData } = require('../db/data/test-data');
const { selectArticleById, selectArticles, selectCommentsByArticleId, insertComment } = require('../models/articles-models');

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params;
    selectArticleById(article_id).then((article) => {
        res.status(200).send({ article });
    }).catch((err) => {
        next(err);
    });
};

exports.getArticles = (req, res, next) => {
    selectArticles().then((articles) => {
        res.status(200).send({ articles });
    });
};

exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    const promises = [
        selectCommentsByArticleId(article_id),
        selectArticleById(article_id)
    ];
    Promise.all(promises).then((promiseResolutions) => {
        res.status(200).send({ comments: promiseResolutions[0] });
    }).catch((err) => {
        next(err);
    });
};

exports.postComment = (req, res, next) => {
    const { article_id } = req.params;
    const newComment = req.body;
    insertComment(article_id, newComment).then((comment) => {
        res.status(201).send({ comment });
    }).catch((err) => {
        next(err);
    });
};