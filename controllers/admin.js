const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>');
    res.render('admin/edit-product', {
        docTitle: 'Add product',
        path: '/admin/add-product',
        editing: false,
        activeAddProduct: true,
        formCSS: true,
        productCSS: true
    })
};

exports.postAddProduct = (req, res, next) => {
    // products.push({title: req.body.title});
    // Redirecting to Index
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, price, description, imageUrl, null, req.user._id);
    product.save()
        .then(result => {
            console.log('Product created!');
            res.redirect('/admin/add-product');
        })
        .catch(err => {
            console.log(err);
        });

};

exports.getEditProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add product</button></form>');
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    // Product.findById(prodId, product => {

    //     if (!product) {
    //         return res.redirect('/');
    //     }

    //     res.render('admin/edit-product', {
    //         docTitle: 'Edit product',
    //         path: '/admin/edit-product',
    //         editing: editMode,
    //         product: product,
    //         activeAddProduct: true,
    //         formCSS: true,
    //         productCSS: true
    //     });

    // });
    // req.user.getProducts({ where: { id: prodId } })
    Product.findById(prodId)
        .then(product => {
            // const product = products[0];
            if (!product) {
                return res.redirect('/');
            }

            res.render('admin/edit-product', {
                docTitle: 'Edit product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product,
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;

    const product = new Product(
        updatedTitle, updatedPrice, updatedDescription, updatedImageUrl, prodId
    );
    product
        .save()
        .then(result => {
            console.log('Product updated');
            return res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                docTitle: 'Admin products',
                path: '/admin/products',
            });

        })
        .catch(err => {
            console.log(err);
        });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId)
        .then(() => {
            console.log('Product destroy');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));

}