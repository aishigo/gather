const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
    const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
    if (image !== null) {
        return image;
    } else {
        throw new Error(`Image with src "${src}" not found in HTML string`);
    }
};

describe('Server path: /items/create', () => {
    const itemToCreate = buildItemObject();

    beforeEach(connectDatabaseAndDropData);

    afterEach(diconnectDatabase);

    // Write your describe blocks below:
    describe('GET', () => {
        it('renders empty input fields', async () => {
            const response = await request(app)
                .get('/items/create');
            assert.equal(parseTextFromHTML(response.text, 'input#title-input'), '');
            assert.equal(parseTextFromHTML(response.text, 'input#imageUrl-input'), '');
            assert.equal(parseTextFromHTML(response.text, 'textarea#description-input'), '');
        })
    });

    describe('POST', () => {
        it('requests to create a new item and successfully creates it', async () => {
            const itemToCreate = buildItemObject();
            const response = await request(app)
                .post('/items/create')
                .type('form')
                .send(itemToCreate);

            const createdItem = await Item.findOne(itemToCreate);

            assert.ok(createdItem, 'createdItem is null');
        });

        it('requests to create a new item and successfully creates it', async () => {
            const itemToCreate = buildItemObject();
            const response = await request(app)
                .post('/items/create')
                .type('form')
                .send(itemToCreate);

            const createdItem = await Item.findOne(itemToCreate);

            assert.ok(createdItem, 'createdItem is null');
            assert.strictEqual(response.status, 302);
            assert.strictEqual(response.headers.location, '/');
        });

        it('displays an error message if the request has no title', async () => {
            const invalidItemToCreate = {
                description: 'not Gizmo',
                imageUrl: 'https://fthmb.tqn.com/KCsrYJWtkPlYuPwP39YK5KOM31I=/960x0/filters:no_upscale()/jack-russel-dog-555907555-5873e2d55f9b584db35c28df.jpg'
            };

            const response = await request(app)
                .post('/items/create')
                .type('form')
                .send(invalidItemToCreate);

            const allItems = await Item.find({});
            assert.equal(allItems.length, 0);
            assert.equal(response.status, 400);
            assert.include(parseTextFromHTML(response.text, 'form'), 'required');
        });

        it('displays an error message if the request has no description', async () => {
            const invalidItemToCreate = {
                title: 'dog',
                imageUrl: 'https://fthmb.tqn.com/KCsrYJWtkPlYuPwP39YK5KOM31I=/960x0/filters:no_upscale()/jack-russel-dog-555907555-5873e2d55f9b584db35c28df.jpg'
            };

            const response = await request(app)
                .post('/items/create')
                .type('form')
                .send(invalidItemToCreate);

            const allItems = await Item.find({});
            assert.equal(allItems.length, 0);
            assert.equal(response.status, 400);
            assert.include(parseTextFromHTML(response.text, 'form'), 'required');
        });

        it('displays an error message if the request has no imageUrl', async () => {
            const invalidItemToCreate = {
                title: 'dog',
                description: 'not Gizmo',
            };

            const response = await request(app)
                .post('/items/create')
                .type('form')
                .send(invalidItemToCreate);

            const allItems = await Item.find({});
            assert.equal(allItems.length, 0);
            assert.equal(response.status, 400);
            assert.include(parseTextFromHTML(response.text, 'form'), 'required');
        });

    })
});
