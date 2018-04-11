
// Load npm module
const mysql = require('mysql');
const DBCREDS = require('./credentials').dbcreds;

// Create connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: DBCREDS.user,
    password: DBCREDS.password,
    database: DBCREDS.database
});

// Create connection to DB
connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');
});


/*
 * Class to model a User in the database
 *
 */
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    static async CreateTable() {
        const sql = 'CREATE TABLE IF NOT EXISTS USERS (' +
            'ID INTEGER AUTO_INCREMENT PRIMARY KEY,' +
            'NAME TEXT,' +
            'AGE INTEGER)';

        console.log('Preparing to create the USERS table...');

        await connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Success!");
        });
    }

    static async Find(id) {
        const sql =
            'SELECT * ' +
            'FROM USERS ' +
            'WHERE ID = ? ' +
            'LIMIT 1';

        console.log(`Querying for user id ${id}... `);

        await connection.query(sql, [id], function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    }

    static async All() {
        const sql = 'SELECT * FROM USERS';

        console.log('Loading all users...');
        await connection.query(sql, function (err, result, fields) {
            if(err) throw err;
            console.log(result);
        });
    }
    /*
    NOTE:
    Info escaping values: https://github.com/mysqljs/mysql#escaping-query-values
    Info escaping identifiers: https://github.com/mysqljs/mysql#escaping-query-identifiers
    Info template literals: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
     */
    async Insert() {
        const sql = `INSERT INTO USERS (NAME, AGE) VALUES(?, ?)`;

        console.log(`Inserting user ${this.name} into database...`);

        await connection.query(sql, [this.name, this.age] , function (err, result) {
            if(err) throw err;
            console.log('1 record inserted');
        });
    }
}

User.CreateTable();
User.Find(1);
User.All();
module.exports = User;