const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const User = require('./models/user');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGODBURI = 'mongodb+srv://urimeba:mochila1@cluster0.7zq0l.mongodb.net/shop';

const app = express();
const store = new MongoDBStore({
    uri: MONGODBURI,
    collection: 'sessions',
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));


app.use((req, res, next) => {
    
    if (!req.session.user) {
        return next();
    }

    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404page);

mongoose
    .connect(MONGODBURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(result => {
        User
            .findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: 'uriel',
                        email: 'urimeba511@gmail.com',
                        cart: {
                            items: []
                        }
                    });
                    user.save();
                }
            })

        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })