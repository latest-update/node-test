const mysql = require ( "mysql2" );
require( "dotenv" ).config();

class db {
    constructor () {
        this.connection = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            database: process.env.DATABASE,
            password: process.env.PASSWORD
        }).promise();
        const sql = `create table if not exists apps (
              id int primary key auto_increment,
              data longtext COLLATE utf8mb4_general_ci
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`

        this.connection.query(sql)
            .then(res => {
                console.log("Table has checked");
            })
            .catch(err => {
                console.log("Error")
            });
    }
}

module.exports = db;