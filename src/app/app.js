/**
 * Created by iamchenxin on 1/10/16.
 */
var Client = require('./chat-client.js');
var chatroom = require('./chatroom.js');


var ct = new Client();


chatroom.event.on("send",ct.sendMessge);

ct.output=chatroom.Render;

chatroom.Render({messages:[]});