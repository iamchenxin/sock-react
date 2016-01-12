/**
 * Created by iamchenxin on 1/10/16.
 */
var Client = require('./chat-client.js');
var chatroom = require('./chatroom.js');
var Task = require('./lib/Task.js').task;


var client = new Client();


Task.task("send", (data)=>{
    client.sendMessge(data);
});

Task.dataflow("chatClient",data=>{
    chatroom.Render(data);
    console.log(JSON.stringify(data) );
});

chatroom.Render({});

