// const products = [];
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    // const products = adminData.products;
    // Product.fetchAll((products) => {

    // });

    // res.render('shop/product-list', {
    //     prods: products,
    //     docTitle: 'Shop',
    //     path: '/',
    //     hasProducts: products.length > 0,
    //     activeShop: true,
    //     productCSS: true,
    // });


    Product.fetchAll()
        .then(([rows, fielData]) => {
            res.render('shop/product-list', {
                prods: rows,
                docTitle: 'Shop',
                path: '/products',
                hasProducts: rows.length > 0,
                activeShop: true,
                productCSS: true,
            });
        })
        .catch(err => { console.log(err); });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    // Product.findById(prodId, product => {
    //     res.render('shop/product-detail', {
    //         product: product,
    //         docTitle: product.title,
    //         path: '/products'
    //     });
    // });
    Product.findById(prodId)
        .then(([product]) => {
            res.render('shop/product-detail', {
                product: product[0],
                docTitle: product.title,
                path: '/products'
            });


        })
        .catch(err => { console.log(err); });
    // res.redirect('/');
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fielData]) => {
            res.render('shop/index', {
                prods: rows,
                docTitle: 'Shop',
                path: '/',
            });
        })
        .catch(err => { console.log(err); });
};

exports.getCart = (req, res, next) => {
    Cart.getProducts(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }

            res.render('shop/cart', {
                path: '/cart',
                docTitle: 'Your cart',
                products: cartProducts
            });

        });
    });

};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    // console.log(prodId);
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    // console.log(prodId);
    Product.findById(prodId, product => {
        // console.log(product.price);
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });

}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        docTitle: 'Your orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        docTitle: 'Checkout'
    });
};
