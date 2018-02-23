const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
    const items = await Item.find({});
    res.render('index', {items});
});

// Add additional routes below:
router.get('/items/create', async (req, res, next) => {
    res.render('create');
});

router.post('/items/create', async (req, res, next) => {
    // await Item.create(req.body);
    // const items = await Item.find({});
    // res.redirect('/');
    const {title, description, imageUrl} = req.body;
    const createdItem = new Item({title, description, imageUrl});
    createdItem.validateSync();
    if(createdItem.errors) {
        res.status(400).render('create', {newItem: createdItem});
    } else {
        await createdItem.save();
        res.redirect('/');
    }
});


module.exports = router;
