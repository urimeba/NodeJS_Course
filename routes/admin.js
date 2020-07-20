const path = require('path');
const express = require('express');
const router = express.Router();

const products = [];

const rootDir = require('../util/path');

router.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>');
    res.render('add-product', {
        docTitle: 'Add product',
        path: '/admin/add-product',
        activeAddProduct: true,
        formCSS: true,
        productCSS: true
    })
});

// Receiving only POST request
router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title});
    // Redirecting to Index
    res.redirect('/');
});

exports.routes = router;
exports.products = products;
