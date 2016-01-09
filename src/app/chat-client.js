/**
 * Created by iamchenxin on 1/9/16.
 */
var io =require('socket.io-client');
var socket = io();
var chatroom = require('./chatroom.js');

class chatClient{
    constructor(){
        this.socket = socket;
        this.chatroom = chatroom;
        this.chatData={
            messages:[]
        };

        this.chatroom.event.on("send",this.sendMessge);
        this.socket.on("new message",this._onNewMessage);
        this._onNewMessage({user:"new user",message:"a user connected"});
    }

    _onNewMessage=(data)=>{
        console.log(`client receive msg -- ${JSON.stringify(data)} --`);
        this.chatData.messages.push(data);
        chatroom.Render(this.chatData);
    };

    sendMessge=(data)=>{
        console.log(`client on send -- ${JSON.stringify(data)} --`);

        this.socket.emit("msg",data);
    };
}

module.exports=chatClient;