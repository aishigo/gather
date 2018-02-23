const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');


describe('User visits /items/create', () => {
    beforeEach(connectDatabaseAndDropData);

    afterEach(diconnectDatabase);
    it('fills out and submits a new item', async () => {
        // create test data
        const itemToCreate = buildItemObject();
        // navigate to root
        browser.url('/');
        // click Add new item
        browser.click('a[href="/items/create"]');
        // we should now be on the form
        // fill in the fields and click submit button
        browser.setValue('#title-input', itemToCreate.title);
        browser.setValue('#description-input', itemToCreate.description);
        browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
        browser.click('#submit-button');
        // should now be back on '/'
        // click on the created item
        assert.include(browser.getText('body'), itemToCreate.description);
        console.log(browser.getText('body'));
        browser.click('.item-card a');
        // assert that created item's description appears on page
        // Get the html and check for 'description'

        assert.include(browser.getText('body'), itemToCreate.description);
    });

});