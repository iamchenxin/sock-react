/**
 * Created by iamchenxin on 1/9/16.
 */
var io =require('socket.io-client');
var Task = require('./lib/Task.js').task;
var socket = io();
socket.__proto__.wait = function(name){
    return new Promise((resolve,reject)=>{
        this.on(name,data=>{
           resolve(data);
        });
    })
} ;

class chatClient{
    constructor(){
        this.socket = socket;
        this.chatData={
            messages:[]
        };

        this.socket.on("new message",data=>{
            this.chatData.messages.push(data);
            Task.outPut("chatClient",this.chatData);
        })
    }

    sendMessge=(data)=>{
        this.socket.emit("msg",data);
    };
}

module.exports=chatClient;