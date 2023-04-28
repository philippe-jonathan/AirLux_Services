const mqtt = require("mqtt");


var client = mqtt.connect('mqtt://broker');

client.on('connect', function(){
    client.subscribe("home/captor_values/create");
    console.log("Client has subscribe successfully");
});


module.exports = client;