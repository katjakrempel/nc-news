const db = require('../db/connection');

exports.selectTopics = () => {
    return db.query('SELECT * FROM topics;')
        .then((result) => {
            return result.rows;
        });
}

exports.checkTopicExists = (topic) => {
    return db.query(`SELECT * FROM topics
    WHERE slug=$1;`, [topic])
        .then((result) => {
            if (result.rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'not found' });
            }
            return result.rows[0];
        });
}