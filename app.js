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
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

const app = express();
const store = new MongoDBStore({
    uri: MONGODBURI,
    collection: 'sessions',
});
const csrfProtection = csrf({});
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    }else{
        cb(null, false);
    }
    

};
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter:fileFilter}).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, 'images')));
app.use(session({
    secret: 'my  ',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use(csrfProtection);
app.use(flash());
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }

    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => {
            next(new Error(err));
        });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.get('/500', errorController.get500page);
app.use(errorController.get404page);
app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).render('500', {
        path: '/500',
        docTitle: 'Error',
        isAuthenticated: req.session.isLoggedIn
    });
});
mongoose
    .connect(MONGODBURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })