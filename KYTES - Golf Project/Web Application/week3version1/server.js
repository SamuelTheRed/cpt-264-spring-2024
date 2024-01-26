'use strict';
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
/*
 * Connects NodeJS to localhost instance of SQL Server
 */
const mysql = require('mysql2'); 

const con = mysql.createConnection({
    host: "localhost", // Local Host of Your Computer
    user: "kytesuser", // Create this user with permission to access your Locally Hosted Schemas
    password: "cprv38m1!00013J6m", // Password for your user
    database: "golfdb", // Make sure your database schema is named this
    port: 3306, // Port that SQL runs on
    multipleStatements: true
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
 * Selects All From Users in DB
 */
app.get('/getusers/', function (req, res) {

    var sqlsel = 'select * from users';
    var sql = mysql.format(sqlsel);

    con.query(sql, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        res.send(JSON.stringify(data));
    });
});

app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});