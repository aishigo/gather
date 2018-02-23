const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

// Add your tests below:
describe('user visits create page', () => {
    describe('user posts a new item', () => {
        it('renders the new item', () => {
            const itemObject = buildItemObject();
            browser.url('/items/create');
            browser.setValue('#title-input', itemObject.title);
            browser.setValue('#description-input', itemObject.description);
            browser.setValue('#imageUrl-input', itemObject.imageUrl);
            browser.click('#submit-button');
            assert.include(browser.getText('body'), itemObject.title);
            // assert.include(browser.getText('body'), itemObject.description);
            assert.include(browser.getAttribute('body img', 'src'), itemObject.imageUrl)
        })
    })
})
