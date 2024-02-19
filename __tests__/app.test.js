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
    test('GET:200 sends an array of topic objects', () => {
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
                expect(response.body.endpoints).toEqual(apiData);
            });
    });
});

describe('/api/articles/:article_id', () => {
    test('GET:200 sends a single article to the client', () => {
        return request(app)
            .get('/api/articles/3')
            .expect(200)
            .then((response) => {
                const article = response.body.article;
                expect(article.title).toBe('Eight pug gifs that remind me of mitch');
                expect(article.topic).toBe('mitch');
                expect(article.author).toBe('icellusedkars');
                expect(article.body).toBe('some gifs');
                expect(article.created_at).toBe('2020-11-03T09:12:00.000Z');
                expect(article.votes).toBe(0);
                expect(article.article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700');
            });
    });
});