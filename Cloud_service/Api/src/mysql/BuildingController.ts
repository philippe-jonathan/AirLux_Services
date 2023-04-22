import mysql from "mysql2";
import { Controller } from "./Controller";

const pool =  mysql.createPool({
  host: 'dbcloud',
  user: 'root',
  password: 'password',
  database: 'AirLuxDB',
  connectionLimit: 10,
});

export class BuildingController implements Controller
{
  // Function to select data from the buildings table
  select() {
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
  
    // SQL query
    const sql = 'SELECT * FROM buildings';
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
    const sql = 'SELECT * FROM buildings WHERE id = ?';
    const data = [id];
  
    connection.execute(sql, data, function(err, result) {
      if (err) throw err;
      console.log('building deleted successfully : ', result);
    });
    connection.release();
  })
  }
  // Function to insert data into the buildings table
  insert(json: string) {
    const parsedData = JSON.parse(json);
    // Check for invalid input
    if (!parsedData.id || !parsedData.name || !parsedData.type) {
      console.error('Invalid input. id, name, type and user_id are required fields.');
      return;
    }
    pool.getConnection(function(err, connection) {
      
      if (err) { console.log(err); return; }// not connected!
      // Use the connection
    // SQL query using prepared statement
    const sqlPivot = 'INSERT INTO user_building (building_id, user_id) VALUES (?, ?)';
    const pivotData = [parsedData.id, parsedData.user_id];
  
    connection.execute(sqlPivot, pivotData, function(err, result) {
      if (err) console.log(err);
      else console.log('user_building pivot added successfully : ', result);
    });
  
    // SQL query using prepared statement
    const sql = 'INSERT INTO buildings (id, name, type) VALUES (?, ?, ?)';
    const data = [parsedData.id, parsedData.name, parsedData.type];
  
    connection.execute(sql, data, function(err, result) {
      if (err) console.log(err);
      else console.log('Building added successfully : ', result);
    });
    connection.release();
  })
  }
  
  // Function to update data in the buildings table
  update(json: string) {
    const parsedData = JSON.parse(json);
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
        // Use the connection
    
    // Check for invalid input
    if (!parsedData.id || !parsedData.name || !parsedData.type) {
      console.error('Invalid input. id, name, type and user_id are required fields.');
      return;
    }
  
    // SQL query using prepared statement
    const sql = 'UPDATE buildings SET name = ?, type = ? WHERE id = ?';
    const data = [parsedData.name, parsedData.type, parsedData.id];
  
    connection.execute(sql, data, function(err, result) {
      if (err) throw err;
      console.log('building updated successfully : ', result);
    });
    connection.release();
  })
  }
  
  // Function to delete data from the buildings table
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
    const sql = 'DELETE FROM buildings WHERE id = ?';
    const data = [id];
  
    connection.execute(sql, data, function(err, result) {
      if (err) throw err;
      console.log('building deleted successfully : ', result);
    });
    connection.release();
  })
  }
}