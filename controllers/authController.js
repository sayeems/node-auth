const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: 'localhost',
    port: '3308',
    database: 'node-test',
    user: 'root',
    password: ''
});

db.connect((error, result) => {
    error ? console.log(error) : console.log('db connected');
});

exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.render('login', {
            title: 'login',
            message: 'Please enter email and password'
        });
    } else {
        db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
            if (error) {
                console.log(error);
            } else if (results.length < 1 || !bcrypt.compareSync(password, results[0].password)) {
                res.status(401).render('login', {
                    title: 'Login',
                    message: 'Email or password is incorrect!',
                });
            } else {
                const uid = results[0].id;
                const token = jwt.sign({ id: uid }, 'tahoeSecret123', {
                    expiresIn: '1d',
                });
                res.cookie('jwt', token, {
                    expires: new Date(Date.now + (1 * 24 * 60 * 60)),
                    httpOnly: true
                });
                return res.status(200).render('profile', {
                    title: 'Profile',
                    updateUrl: '/profile',
                    user: {
                        name: results[0].name,
                        email: results[0].email
                    }
                });
            }
        });
    }
}

exports.register = (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    //validation
    if (name.length < 1 || email.length < 1 || password.length < 4) {
        return res.render('register', {
            title: 'Register',
            message: 'Name, Email and Password is mendatory'
        });
    }
    if (password !== confirmPassword) {
        return res.render('register', {
            title: 'Register',
            message: 'password did not match',
        });
    } else {
        db.query('SELECT email FROM users WHERE email = ?', [email], (error, results) => {
            if (error) {
                console.log(error)
            }
            if (results.length > 0) {
                return res.render('register', {
                    title: 'Register',
                    message: 'The email is already in use',
                });
            }

            let hashedPassword = bcrypt.hashSync(password, 8);

            db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (error, results) => {
                if (error) {
                    console.log(error)
                } else {
                    return res.render('profile', {
                        title: 'Profile',
                        updateUrl: '/profile',
                        user: {
                            name,
                            email
                        },
                    });
                }
            });
        });
    }

}

exports.isLoggedIn = (req, res, next) => {
    req.title = "Profile";
    if (req.cookies.jwt) {
        try {
            const decoded = jwt.verify(req.cookies.jwt, 'tahoeSecret123');
            db.query('SELECT name,email,id FROM users WHERE id = ?', [decoded.id], (error, results) => {
                if (error) console.log(error);
                else if (results.length > 0) {
                    req.user = results[0];
                    return next();
                } else {
                    return next();
                }
            })
        } catch (error) {
            console.log(error)
        }
    } else {
        next();
    }

}

exports.logout = (req, res) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + (2 * 500)),
    });
    return res.redirect('/');
}