import mysql  from "mysql2";
import { describe, expect, beforeAll, afterAll, test } from '@jest/globals';

describe('Testing MySQL database connection', () => {
    let connection : mysql.Connection;
    beforeAll( async () => {
        connection = await mysql.createConnection({
          host: 'db_cloud',
          user: 'root',
          password: 'password',
          database: 'AirLuxDB',
          charset: 'utf8mb4',
        });
    });
    
    test('Should be connected', () => {
      expect(connection).toBeDefined();
    });

    afterAll(async () => {
      await connection.end();
    });
});