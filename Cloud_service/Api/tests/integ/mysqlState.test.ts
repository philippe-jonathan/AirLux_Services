import mysql  from "mysql2";

const pool =  mysql.createPool({
    host: 'dbcloud',
    user: 'root',
    password: 'password',
    database: 'AirLuxDB',
    connectionLimit: 10,
  });
  

pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
})