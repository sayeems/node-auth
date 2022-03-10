const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const upload = require('express-fileupload');

const app = express();

//set view engine
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) { });

//start the server
app.listen(5000, 'localhost', () => {
    console.log('app started at http://localhost:5000');
});

//set public directory
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(upload());

// app.get('/', (req, res) => {
//     // res.send('hellow world');
//     res.render('index');
// });

//define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/article', require('./routes/article'));
app.use((req, res) => {
    res.status(404).render('404', {
        title: '404',
    });
});
