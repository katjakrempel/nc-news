const db = require('../db/connection');
const fs = require('fs/promises');

exports.selectEndpoints = () => {
    return fs.readFile('./endpoints.json', 'utf8')
    .then((result) => {
        return JSON.parse(result);
    }); 
}