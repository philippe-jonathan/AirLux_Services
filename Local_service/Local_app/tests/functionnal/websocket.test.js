const WebSocket = require('ws');

describe('WebSocket Connection', () => {
  test('should connect to WebSocket server', done => {
      const ws = new WebSocket('ws://cloud_app:6001');

    ws.on('open', () => {
      done();

      ws.on('message', message => {
        let response = message.toString('utf8');
  
        if(response !== 'Welcome to the server!'){
          expect(response).toBe('OK');
        }
      });

      ws.send(`tocloud//captor_values//{"captor_id": "0001", "value": "23", "created_at": "${new Date().getTime()}"}//insert`)
      

      ws.close();
    });


    ws.on('error', error => {
      done.fail(error);
    });

  });
});