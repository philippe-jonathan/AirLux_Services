//Redis
'use strict';

// NOTE - Require
const redis = require('redis');

// NOTE - REDIS
const client = redis.createClient({
  url: 'redis://db_local',
  port: 6379,
  socket: {
    reconnectStrategy() {
        console.log('reconnectStrategy', new Date().toJSON());
        return process.env.JEST_WORKER_ID ? 2147483647 : 5000;
    }
}
});

let isReady = false;

// handle Redis connection errors
client.on('error', function (err) {
  isReady = false;
  console.log('Redis error: ' + err);
});
// handle Redis connection errors
client.on('ready', function () {
  isReady = true;
  console.log('Redis ready');
});

async function redis_connection() {
  //check if its a test (ye I know)
  if(process.env.JEST_WORKER_ID) return;
  client.connect(function(err) {
    if(err)  console.log("Redis database not connected : " + err);
    console.log("Redis database connected!")
  })
}
// --------------------

// NOTE - Redis connection
redis_connection();


function getTimestamp() {
  return Date.now().toString();
}

async function postData(data){
  if(!isReady) return;
    let time = getTimestamp();
    
    console.log("Try post value at " + time);

    await client.set(time, data);
}
module.exports = {
 postCaptorValue: function (captorid, value)
    {
        let data = {
            'captor_id' : captorid,
            'client_id' : "q8sf651-654sdf-45s-7qd54",
            'value': value
        };
        // Send to redis DB
        let data_send = JSON.stringify(data);

        // Filter data in redis DB
        let json = JSON.parse(data_send);
        if(json.value && json.captor_id && json.client_id) {
            console.log("value type is OK");
            
            try{
              postData(data_send);
            }
            catch{
              console.log("Redis database not connected");
            }
            return true;
        } else {
            console.log("ERROR value type in database");
            return false;
        }
        
        
    }
}