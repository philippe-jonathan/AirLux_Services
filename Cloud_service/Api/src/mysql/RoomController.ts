import mysql from "mysql2";
import { Controller } from "./Controller";

const pool =  mysql.createPool({
  host: 'dbcloud',
  user: 'root',
  password: 'password',
  database: 'AirLuxDB',
  connectionLimit: 10,
});

export class RoomController implements Controller
{
  // Function to select data from the rooms table
  select() {
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection

    // SQL query
    const sql = 'SELECT * FROM rooms';
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
    const sql = 'SELECT * FROM rooms WHERE id = ?';
    const data = [id];
  
    connection.execute(sql, data, function(err, result) {
      if (err) throw err;
      console.log('rooms deleted successfully : ', result);
    });
    connection.release();
  })
  }
  // Function to insert data into the rooms table
  insert(json: string) {
    const parsedData = JSON.parse(json);
      console.log('id = ' + parsedData.id + ', name = ' + parsedData.name + ', building_id = ' + parsedData.building_id + ' are required fields.');
    // Check for invalid input
    if (!parsedData.id || !parsedData.name || !parsedData.building_id) {
      console.error('Invalid input. id, name and building_id are required fields.');
      return;
    }
    pool.getConnection(function(err, connection) {
      if (err) { console.log(err); return; }// not connected!
      // Use the connection

    // SQL query using prepared statement
    const sql = 'INSERT INTO rooms (id, name, building_id) VALUES (?, ?, ?)';
    const data = [parsedData.id, parsedData.name, parsedData.building_id];

    connection.execute(sql, data, function(err, result) {
      if (err) console.log(err);
      else console.log('Room added successfully : ', result);
    });
    connection.release();
  })
  }
  
  // Function to update data in the rooms table
  update(json: string) {
    const parsedData = JSON.parse(json);
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection

  // Check for invalid input
  if (!parsedData.id || !parsedData.name || !parsedData.building_id) {
    console.error('Invalid input. id, name, and building_id are required fields.');
    return;
  }

  // SQL query using prepared statement
  const sql = 'UPDATE rooms SET name = ?, building_id = ? WHERE id = ?';
  const data = [parsedData.name, parsedData.building_id, parsedData.id];

  connection.execute(sql, data, function(err, result) {
    if (err) throw err;
    console.log('Room updated successfully : ', result);
  });
  connection.release();
  })
  }
  
  // Function to delete data from the rooms table
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
    const sql = 'DELETE FROM rooms WHERE id = ?';
    const data = [id];

    connection.execute(sql, data, function(err, result) {
      if (err) throw err;
      console.log('Room deleted successfully : ', result);
    });
    connection.release();
  })
  }
}