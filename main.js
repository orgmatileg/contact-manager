const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'host',
    user: 'root',
    password: 'password',
    database: 'contact_manager'
});

app.use(express.json())
app.use(express.urlencoded({
    extended: true,

}))

//Serves static files (we need it to import a css file)
app.use(express.static('public'))

//Loads the handlebars module
const handlebars = require('express-handlebars');


//Sets handlebars configurations (we will go through them later on)
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: "hbs"
}));

// Sets our app to use the handlebars engine
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    pool.query('SELECT * FROM contacts', function (error, results, fields) {
        try {
            if (error) throw error;


            res.render('main', {
                layout: 'index', contacts: results, helpers: {
                    addOne: function (value, options) {
                        return parseInt(value) + 1;
                    }
                }
            });
        } catch (err) {
            res.render('main', { layout: 'error' });
        }

    });

})


app.get('/contacts', (req, res) => {

    pool.query('SELECT * FROM contacts', function (error, results, fields) {
        try {
            if (error) throw error;
            console.log('The solution is: ', results[0].solution);
            res.send({ results })
        } catch (err) {
            handleResErr(500, res, err)
        }

    });

})

app.post('/contacts', (req, res) => {

    const { name, email } = req.body


    pool.query('INSERT INTO contacts (name, email) values (?, ?)', [name, email], function (error, results, fields) {
        try {
            if (error) throw error;

            res.send({ results })
        } catch (err) {
            handleResErr(500, res, err)
        }

    });

})

app.get('/contacts/count', (req, res) => {

    pool.query('SELECT COUNT(*) as count FROM contacts', function (error, results, fields) {
        console.log(results)
        try {
            if (error) throw error;
            res.send({ count: results[0]['count'] })
        } catch (err) {
            handleResErr(500, res, err)
        }

    });

})

app.get('/contacts/:id', (req, res) => {

    const { id } = req.params

    pool.query('SELECT * FROM contacts WHERE id = ?', [id], function (error, results, fields) {
        try {
            if (error) throw error;
            res.send({ results })
        } catch (err) {
            handleResErr(500, res, err)
        }

    });

})

app.delete('/contacts/:id', (req, res) => {

    const { id } = req.params

    pool.query('DELETE FROM contacts WHERE id = ?', [id], function (error, results, fields) {
        try {
            if (error) throw error;
            res.send({ results })
        } catch (err) {
            handleResErr(500, res, err)
        }

    });

})

app.put('/contacts/:id', (req, res) => {

    const { id } = req.params
    const { name, email } = req.body

    pool.query('UPDATE contacts SET name=?, email=? WHERE id = ?', [name, email, id], function (error, results, fields) {
        try {
            if (error) throw error;
            res.send({ results })
        } catch (err) {
            handleResErr(500, res, err)
        }

    });

})



const handleResErr = (statusCode, res, err) => {
    res.status(statusCode)
    res.send({
        code: statusCode,
        errMessage: err.sqlMessage
    })
}

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

