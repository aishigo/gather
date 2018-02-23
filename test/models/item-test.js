const Item = require('../../models/item');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

describe('Model: Item', () => {
    beforeEach(async () => {
        await mongoose.connect(databaseUrl, options);
        await mongoose.connection.db.dropDatabase();
    });

    afterEach(async () => {
        await mongoose.disconnect();
    });

    // Write your tests below:
    describe('title', () => {
        it('should be a string', () => {
            const title = 3;
            const item = new Item({title: title});

            assert.strictEqual(item.title, title.toString());
        });

        it('is required', () => {
            const item = new Item({});
            item.validateSync();

            assert.equal(item.errors.title.message, 'Path `title` is required.')
        });
    });

    describe('description', () => {
        it('should be a string', () => {
            const description = 3;
            const item = new Item({description: description});

            assert.strictEqual(item.description, description.toString());
        });

        it('is required', () => {
            const item = new Item({});
            item.validateSync();

            assert.equal(item.errors.description.message, 'Path `description` is required.')
        });
    });

    describe('imageUrl', () => {
        it('should be a string', () => {
            const imageUrl = 3;
            const item = new Item({imageUrl: imageUrl});

            assert.strictEqual(item.imageUrl, imageUrl.toString());
        });

        it('is required', () => {
            const item = new Item({});
            item.validateSync();

            assert.equal(item.errors.imageUrl.message, 'Path `imageUrl` is required.')
        });
    });
});
