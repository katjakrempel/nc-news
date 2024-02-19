const app = require('../app');
const request = require('supertest');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');
const apiData = require('../endpoints.json');


beforeEach(() => {
    return seed(testData);
});
afterAll(() => db.end());

describe('/api/topics', () => {
    test('GET:200 sends an array of topic objects ', () => {
        return request(app)
            .get('/api/topics')
            .expect(200)
            .then((response) => {
                expect(response.body.topics.length).toBe(3);
                response.body.topics.forEach((topic) => {
                    expect(typeof topic.slug).toBe('string');
                    expect(typeof topic.description).toBe('string');
                });
            });
    });
});

describe('path not found', () => {
    test('GET:404 returns error for invalid route', () => {
        return request(app)
            .get('/notvalid')
            .expect(404)
            .then((response) => {
                const error = response.body;
                expect(error.msg).toBe('path not found');
            });
    });
});

describe('/api', () => {
    test('GET:200 sends description of all available endpoints', () => {
        return request(app)
            .get('/api')
            .expect(200)
            .then((response) => {
                expect(response.body.endpoints).toEqual(apiData)
            });
    });
});