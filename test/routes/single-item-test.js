const {assert} = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Item = require('../../models/item');


const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:itemId', () => {
    beforeEach(connectDatabaseAndDropData);
    afterEach(diconnectDatabase);
    // create Item in database using seedItemToDatabse
    console.log("test test test ENTRY")
    const newItem =  seedItemToDatabase();
    console.log(newItem);

    // Write your test blocks below:
    // Make request for item to route /items/:/itemId
    describe('GET', () => {
        it('renders the single item view', async () => {
            // req.params: { "itemId": newItem._id}
            console.log("_id: " + newItem._id);
            const found = Item.findById(newItem._id, function(err, item){
                if (err) {
                    console.log("ERROR: " + err);
                }
                else {
                    console.log("ITEM: " + item);
                }
            });
            console.log("PRE WTF");
            // console.log(found);
            console.log("WTF");
            const response = await request(app)
                .get('/items/5a8fb5fafeaba83628a6fbf5');
        // .get('/items/5a8fb5fafeaba83628a6fbf5', function (req, res) {
        //         res.send(req.params);
        //     });
            // assert newItem title & description are in the returned HTML
            console.log(response.text);
            assert.include(parseTextFromHTML(response.text, 'input#item-title'), '');
            assert.include(parseTextFromHTML(response.text, 'textarea#item-description'), '');

        })
    })
});
