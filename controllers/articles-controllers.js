const { articleData } = require('../db/data/test-data');
const { selectArticleById, selectArticles, selectCommentsByArticleId, insertComment, updateArticle } = require('../models/articles-models');
const { checkTopicExists } = require('../models/topics-models');

exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params;
    selectArticleById(article_id).then((article) => {
        res.status(200).send({ article });
    }).catch((err) => {
        next(err);
    });
};

exports.getArticles = (req, res, next) => {
    const { topic } = req.query;
    const promises = [selectArticles(topic)];

    if (topic) {
        promises.push(checkTopicExists(topic));
    }

    Promise.all(promises).then((promiseResolutions) => {
        res.status(200).send({ articles: promiseResolutions[0] })
    }).catch((err) => {
        next(err);
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

exports.patchArticle = (req, res, next) => {
    const { article_id } = req.params;
    const updatedArticle = req.body;
    updateArticle(article_id, updatedArticle).then((article) => {
        res.status(200).send({ article });
    }).catch((err) => {
        next(err);
    });
}