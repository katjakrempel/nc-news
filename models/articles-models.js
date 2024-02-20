const db = require('../db/connection');

exports.selectArticleById = (article_id) => {
    return db.query('SELECT * FROM articles WHERE article_id=$1;', [article_id])
        .then((result) => {
            if (result.rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'page not found' });
            }
            return result.rows[0];
        })
};

exports.selectArticles = () => {
    return db.query(`SELECT a.author, a.title, a.article_id, a.topic, a.created_at, a.votes, a.article_img_url, COUNT(c.*)::int AS comment_count
    FROM articles a
    LEFT JOIN comments c
    ON a.article_id = c.article_id
    GROUP BY 1,2,3,4,5,6,7
    ORDER BY a.created_at DESC;`)
        .then((result) => {
            return result.rows;
        })
};

exports.selectCommentsByArticleId = (article_id) => {
    return db.query(`SELECT * FROM comments WHERE article_id=$1 ORDER BY created_at DESC;`, [article_id])
        .then((result) => {
            return result.rows;
        })
};

exports.insertComment = (article_id, newComment) => {
    const { username, body } = newComment;
    return db.query(`INSERT INTO comments (body, article_id, author, votes) VALUES ($1, $2, $3, $4)
    RETURNING *;`, [body, article_id, username, 0])
        .then((result) => {
            return result.rows[0];
        })
}