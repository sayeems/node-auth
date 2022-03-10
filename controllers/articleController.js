const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;

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

exports.getAll = (req, res, next) => {
    db.query("SELECT *, DATE_FORMAT(created_at,'%d-%M-%y') as date FROM articles WHERE created_by = ? ORDER BY created_at DESC", [req.user.id], (error, results) => {
        if (!error) {
            req.articles = results;
            next();
        } else {
            console.log(error);
            next();
        }
    });
}

exports.read = (req, res) => {
    const articleId = req.params.id;
    db.query('SELECT * FROM articles WHERE id = ?', [articleId], (error, results) => {
        if (!error) {
            return res.render('single', {
                article: results[0],
                updateUrl: `/articles/${articleId}`
            })
        }
    });
}

exports.create = (req, res) => {
    const { title, body } = req.body;
    let decoded;
    if (req.cookies.jwt) {
        decoded = jwt.verify(req.cookies.jwt, 'tahoeSecret123');
    } else {
        return;
    }
    if (!title && !body) {
        return res.render('create', {
            message: 'title and body is required'
        })
    } else {
        if (req.files) {
            var filename = `${uuid()}_${req.files.image.name}`;
            let file = req.files.image;
            try {
                file.mv('./public/uploads/' + filename);
            } catch (err) {
                console.log(err);
            }
        }
        db.query('INSERT INTO articles SET ?', { title: title, body: body, photo: filename || null, created_by: decoded.id }, (error, results) => {
            if (error) {
                console.log(error)
            } else {
                return res.render('create', {
                    message: 'article added successfully'
                });
            }
        })
    }
}

// exports.getAll = (req, res) => {
//     let decoded;
//     if (req.cookies.jwt) {
//         decoded = jwt.verify(req.cookies.jwt, 'tahoeSecret123');
//     } else {
//         return;
//     }
//     db.query('SELECT * FROM articles WHERE created_by = ?', [decoded.id], (error, results) => {
//         if (results.length > 0) {
//             console.log(results);
//         }
//     })
// }