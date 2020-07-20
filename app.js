// const http = require('http');
// const routes = require('./routes');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const handlebars = require('express-handlebars');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();
// app.engine('hbs', handlebars({
//     layoutsDir: 'views/layout/',
//      defaultLayout: 'main-layout', 
//      extname: 'hbs'
//     }));
// app.set('view engine', 'hbs');
app.set('view engine', 'ejs');
// app.set('view engine', 'pug');
// app.set('view engine', 'pug');
// app.set('views', 'views');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')))

// Creating a NodeJS Server
// Needs a "requestListener" (anonymous function inside of it)
// Then, you need to storage that server to use the "listen" method
// const server = http.createServer(routes.handler);
// By default, uses the 80 port at production
app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', {
        docTitle: 'Page not found'
    });
});

// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000);