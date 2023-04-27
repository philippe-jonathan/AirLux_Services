const WebSocket = require('ws');

describe('WebSocket Connection', () => {
  test('should connect to WebSocket server', async done => {
      const ws = new WebSocket('ws://cloud_app:6001');

      
    ws.on('message', message => {
      let response = message.toString('utf8');

      if(response !== 'Welcome to the server!'){
        console.log('Response for message is : ' + response);
        expect(response).toBe('OK');
      }
    });

    ws.on('open', async () => {
      done();
      ws.send(`tocloud//captor_values//{"captor_id": "0001", "value": "23", "created_at": "${new Date().getTime()}"}//insert`)
      await new Promise((r) => setTimeout(r, 5000));
      ws.close();
    });


    ws.on('error', error => {
      done.fail(error);
    });
    await new Promise((r) => setTimeout(r, 6000));
  });
});