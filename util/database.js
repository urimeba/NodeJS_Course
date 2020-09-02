// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost', 
//     user: 'root',
//     database: 'node-complete',
//     password: ''
// });

// module.exports = pool.promise();






// const Sequelize = require('sequelize');

// const sequelize = new Sequelize(
//     'node-complete',
//     'root',
//     '',
//     {
//         dialect: 'mysql',
//         host: '127.0.0.1'
//     }
// );

// module.exports = sequelize;

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        'mongodb+srv://urimeba:mochila1@cluster0.7zq0l.mongodb.net/shop?retryWrites=true&w=majority'
    )
        .then(client => {
            console.log('Connected!');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
