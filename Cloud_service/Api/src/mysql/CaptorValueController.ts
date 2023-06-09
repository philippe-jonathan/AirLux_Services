import mysql  from "mysql2";
import { Controller } from "./Controller";

const pool =  mysql.createPool({
  host: 'dbcloud',
  user: 'root',
  password: 'password',
  database: 'AirLuxDB',
  connectionLimit: 10,
});

export class CaptorValueController implements Controller
{
  // Function to select data from the buildings table
  select() {
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
  
      try {
        // SQL query
        const sql = 'SELECT * FROM captor_values';
        connection.query(sql, function(err, result) {
          if (err) throw err;
          console.log('captorValues select successfully : ', result);
        });
      } catch (error) {
        console.log(error);
      }
      finally {
        connection.release();
      }
  })
  }

  // Function to delete data from the captor_values table
  find(id: string) {
    // Check for invalid input
    if (!id) {
      console.error('Invalid input. id is a required field.');
      return;
    }
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      try {
        // SQL query using prepared statement
        const sql = 'SELECT * FROM captor_values WHERE id = ?';
        const data = [id];
      
        connection.execute(sql, data, function(err, result) {
          if (err) throw err;
          console.log('captorValues deleted successfully : ', result);
        });
        
      } catch (error) {
        console.log(error);
      }
      finally{
        connection.release();
      }
  
  
  })
  }
  
// Function to insert data into the captor_values table
async insert(json: string) {
  const parsedData = JSON.parse(json);
  // Check for invalid input
  if (!parsedData.captor_id || !parsedData.value) {
    console.error('Invalid input. captor_id and value are required fields.');
    return;
  }
  console.log('captor_id = ' + parsedData.captor_id + ', value = ' + parsedData.value + ' are required fields.');
  
      pool.getConnection(async function(err, connection) {
        if (err) { console.log(err); return; }// not connected!
        // Use the connection
        try {
          // SQL query using prepared statement
          const sql = 'INSERT INTO captor_values (captor_id, value) VALUES (?, ?)';
          const data = [parsedData.captor_id, parsedData.value];
        
          await connection.execute(sql, data, function(err, result) {
            if (err) console.log(err);
            else console.log('Captor value added successfully : ', result);
          });
        }
            
        catch (error) {
          console.log(error);
        }
        finally{
          connection.release();
        }
      })
    
  }

  // Function to update data in the captor_values table
  update(json: string) {
    const parsedData = JSON.parse(json);
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
      try{
        // Check for invalid input
        if (!parsedData.id || !parsedData.captor_id || !parsedData.value) {
          console.error('Invalid input. id, captor_id and value are required fields.');
          return;
        }
      
        // SQL query using prepared statement
        const sql = 'UPDATE captor_values SET captor_id = ?, value = ? WHERE id = ?';
        const data = [parsedData.captor_id, parsedData.value, parsedData.id];
      
        connection.execute(sql, data, function(err, result) {
          if (err) throw err;
          console.log('Captor value updated successfully : ', result);
        });
      }
      catch (error) {
        console.log(error);
      }
      finally{
        connection.release();
      }
    })
  }
  
  // Function to delete data from the captor_values table
  remove(id: string) {
    // Check for invalid input
    if (!id) {
      console.error('Invalid input. id is a required field.');
      return;
    }
    pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
      try{
        // SQL query using prepared statement
        const sql = 'DELETE FROM captor_values WHERE id = ?';
        const data = [id];

        connection.execute(sql, data, function(err, result) {
          if (err) throw err;
          console.log('captor_values deleted successfully : ', result);
        });
      }

    catch (error) {
      console.log(error);
    }
    finally{
      connection.release();
    }
  })
  }
}






