import mysql from "mysql2";
import { Controller } from "./Controller";

const pool =  mysql.createPool({
  host: 'dbcloud',
  user: 'root',
  password: 'password',
  database: 'AirLuxDB',
  connectionLimit: 10,
});

export class DeviceController implements Controller
{
  // Function to select data from the devices table
  select() {
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
  
    // SQL query
    const sql = 'SELECT * FROM devices';
    connection.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
    });
    connection.release();
  })
  }

  // Function to delete data from the buildings table
  find(id: string) {
    // Check for invalid input
    if (!id) {
      console.error('Invalid input. id is a required field.');
      return;
    }
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
  
  
    // SQL query using prepared statement
    const sql = 'SELECT * FROM devices WHERE id = ?';
    const data = [id];
  
    connection.execute(sql, data, function(err, result) {
      if (err) throw err;
      console.log('devices deleted successfully : ', result);
    });
    connection.release();
  })
  }
  
// Function to insert data into the devices table
insert(json: string) {
  const parsedData = JSON.parse(json);
  console.log('id = ' + parsedData.id + ', apns_token = ' + parsedData.apns_token + ' are required fields.');
// Check for invalid input
if (!parsedData.id || !parsedData.apns_token) {
  console.error('Invalid input. id, and apns_token are required fields.');
  return;
}
pool.getConnection(function(err, connection) {
  if (err) { console.log(err); return; }// not connected!
  // Use the connection

// SQL query using prepared statement
const sql = 'INSERT INTO devices (id, apns_token) VALUES (?, ?)';
const data = [parsedData.id, parsedData.apns_token];

connection.execute(sql, data, function(err, result) {
  if (err) console.log(err);
  else console.log('Device added successfully : ', result);
});
connection.release();
})
}

// Function to update data in the devices table
update(json: string) {
  const parsedData = JSON.parse(json);
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
  
  // Check for invalid input
  if (!parsedData.id || !parsedData.apns_token) {
    console.error('Invalid input. id and apns_token are required fields.');
    return;
  }

  // SQL query using prepared statement
  const sql = 'UPDATE devices SET apns_token = ? WHERE id = ?';
  const data = [parsedData.apns_token, parsedData.id];

  connection.execute(sql, data, function(err, result) {
    if (err) throw err;
    console.log('Device updated successfully : ', result);
  });
    connection.release();
})
}
// Function to delete data from the devices table
remove(id: string) {
  // Check for invalid input
  if (!id) {
    console.error('Invalid input. id is a required field.');
    return;
  }
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
    // Use the connection


  // SQL query using prepared statement
  const sql = 'DELETE FROM devices WHERE id = ?';
  const data = [id];

  connection.execute(sql, data, function(err, result) {
    if (err) throw err;
    console.log('Device deleted successfully : ', result);
  });
  connection.release();
})
}

}


