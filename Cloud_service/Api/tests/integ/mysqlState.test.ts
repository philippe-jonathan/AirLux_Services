import mysql from 'mysql2/promise';
import { describe, test } from '@jest/globals';

describe('Test MySQL Connection : ', () => {
  test('Should connect to MySQL', async () => {
   await mysql.createConnection({
      host: 'dbcloud',
      user: 'root',
      password: 'password',
      database: 'AirLuxDB',
      charset: 'utf8mb4'
    });    
  }, 10000);
});