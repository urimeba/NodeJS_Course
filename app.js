// const http = require('http');
// const routes = require('./routes');
// const handlebars = require('express-handlebars');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
// const sequelize = require('./util/database');
// const Product = require('./models/product');
const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// // const Order = require('./models/order');
// const OrderItem = require('./models/order-item');
const mongoConnect = require('./util/database').mongoConnect;

// app.engine('hbs', handlebars({
//     layoutsDir: 'views/layout/',
//      defaultLayout: 'main-layout', 
//      extname: 'hbs'
//     }));
// app.set('view engine', 'hbs');
// app.set('view engine', 'pug');
// app.set('view engine', 'pug');
// app.set('views', 'views');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5f4deb3dd1a188d384a7ec50')
        .then(user => {
            req.user = new User(user.username, user.email, user.cart, user._id);
            next();
        })
        .catch(err => console.log(err));
    // next();

});

// Creating a NodeJS Server
// Needs a "requestListener" (anonymous function inside of it)
// Then, you need to storage that server to use the "listen" method
// const server = http.createServer(routes.handler);
// By default, uses the 80 port at production
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404page);

mongoConnect(() => {
    app.listen(3000);
});

// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

// sequelize
//     .sync()
//     // .sync({force: true})
//     .then(result => {
//         // console.log(result);
//         return User.findByPk(1);

//     })
//     .then(user => {
//         if (!user) {
//             return User.create({
//                 name: 'Uriel',
//                 email: 'urimeba511@gmail.com'
//             });
//         }
//         return Promise.resolve(user);

//     })
//     .then(user => {
//         console.log(user);
//         return user.createCart();

//     })
//     .then(cart => {
//         app.listen(3000);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// const server = http.createServer(app);
// server.listen(3000);
// app.listen(3000);