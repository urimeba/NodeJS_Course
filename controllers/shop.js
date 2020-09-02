// const products = [];
const Product = require('../models/product');
// const Order = require('../models/order');

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


    // Product.fetchAll()
    //     .then(([rows, fielData]) => {
    //         res.render('shop/product-list', {
    //             prods: rows,
    //             docTitle: 'Shop',
    //             path: '/products',
    //             hasProducts: rows.length > 0,
    //             activeShop: true,
    //             productCSS: true,
    //         });
    //     })
    //     .catch(err => { console.log(err); });

    Product.fetchAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                docTitle: 'All products',
                path: '/products',
            });
        }).catch(err => {
            console.log(err);
        });
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
    // Product.findById(prodId)
    //     .then(([product]) => {
    //         res.render('shop/product-detail', {
    //             product: product[0],
    //             docTitle: product.title,
    //             path: '/products'
    //         });


    //     })
    //     .catch(err => { console.log(err); });
    // res.redirect('/');

    // Product.findAll({where: {id: prodId}})
    // .then(product => {

    //     res.render('shop/product-detail', {
    //         product: product[0],
    //         docTitle: product[0].title,
    //         path: '/products',
    //     });

    // })
    // .catch(err => {
    //     console.log(err);
    // });

    Product.findById(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                docTitle: product.title,
                path: '/products',
            });
        }).catch(err => {
            console.log(err);
        });
}

exports.getIndex = (req, res, next) => {
    // Product.fetchAll()
    //     .then(([rows, fielData]) => {
    //         res.render('shop/index', {
    //             prods: rows,
    //             docTitle: 'Shop',
    //             path: '/',
    //         });
    //     })
    //     .catch(err => { console.log(err); });

    Product.fetchAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                docTitle: 'Shop',
                path: '/',
            });
        }).catch(err => {
            console.log(err);
        });
};

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(products => {
            res.render('shop/cart', {
                path: '/cart',
                docTitle: 'Your cart',
                products: products
            });
        })
        .catch(err => console.log(err));
    // Cart.getProducts(cart => {
    //     Product.fetchAll(products => {
    //         const cartProducts = [];
    //         for (product of products) {
    //             const cartProductData = cart.products.find(prod => prod.id === product.id);
    //             if (cartProductData) {
    //                 cartProducts.push({ productData: product, qty: cartProductData.qty });
    //             }
    //         }

    //         res.render('shop/cart', {
    //             path: '/cart',
    //             docTitle: 'Your cart',
    //             products: cartProducts
    //         });

    //     });
    // });

};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);

        })
        .then(result => {
            console.log(result);
            res.redirect('/cart')
        })
        .catch(err => console.log(err));
    // let fetchedCart;
    // let newQuantity = 1;
    // req.user
    //     .getCart()
    //     .then(cart => {
    //         fetchedCart = cart;
    //         return cart.getProducts({ where: { id: prodId } })
    //     })
    //     .then(products => {
    //         let product;
    //         if (products.length > 0) {
    //             product = products[0];
    //         }

    //         if (product) {
    //             const oldQuantity = product.cartItem.quantity;
    //             newQuantity = oldQuantity + 1;
    //             return product;
    //         }

    //         return Product.findByPk(prodId);
    //     })
    //     .then(product => {
    //         return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
    //     })
    //     .then(() => {
    //         res.redirect('/cart')
    //     })
    //     .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    req.user
        .deleteItemFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));

}


exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
        .addOrder()
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => { console.log(err) });
}

exports.getOrders = (req, res, next) => {

    req.user.getOrders()
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                docTitle: 'Your orders',
                orders: orders
            });
        })
        .catch(err => {
            console.log(err);
        });


};

