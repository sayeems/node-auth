const express = require('express');
const authController = require('../controllers/authController');
const articleController = require('../controllers/articleController');

const router = express.Router();

router.get('/', authController.isLoggedIn, (req, res) => {
    res.render('index', {
        title: 'Home',
        user: req.user
    });
});

router.get('/register', authController.isLoggedIn, (req, res) => {
    if (!req.user) {
        res.render('register', {
            title: 'Register'
        });
    } else {
        res.redirect('/profile')
    }
});

router.get('/login', authController.isLoggedIn, (req, res) => {
    if (!req.user) {
        res.render('login', {
            title: 'Login'
        });
    } else {
        res.redirect('/profile');
    }
});

router.get('/profile', authController.isLoggedIn, articleController.getAll, (req, res) => {
    if (req.user) {
        res.render('profile', {
            title: req.title,
            user: req.user,
            articles: req.articles
        })
    } else {
        res.redirect('/');
    }
});

router.get('/create', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render('create', {
            title: 'Create Article',
            user: req.user,
        })
    } else {
        res.redirect('/');
    }
});

module.exports = router;