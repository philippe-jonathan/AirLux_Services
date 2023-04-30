import mysql from 'mysql2/promise';
import { describe, test } from '@jest/globals';

describe('Test MySQL Connection', () => {
  test('Should connect to MySQL', async () => {
    const connection = await mysql.createConnection({
      host: 'db_cloud',
      user: 'root',
      password: 'password',
      database: 'AirLuxDB'
    });    
  }, 10000);
});