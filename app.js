// const http = require('http');
// const routes = require('./routes');
// const handlebars = require('express-handlebars');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

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
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')))

// Creating a NodeJS Server
// Needs a "requestListener" (anonymous function inside of it)
// Then, you need to storage that server to use the "listen" method
// const server = http.createServer(routes.handler);
// By default, uses the 80 port at production
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404page);

// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000);