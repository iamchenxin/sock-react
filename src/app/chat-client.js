/**
 * Created by iamchenxin on 1/9/16.
 */
var io =require('socket.io-client');
var socket = io();


class chatClient{
    constructor(){
        this.socket = socket;
        this.chatData={
            messages:[]
        };


        this.socket.on("new message",this._onNewMessage);
        this.output=this.defaultOutput;
    }

    _onNewMessage=(data)=>{
        this.chatData.messages.push(data);
        this.output(  this.chatData);
    };

    defaultOutput(data){
        console.log(JSON.stringify(data));
    }

    sendMessge=(data)=>{
        this.socket.emit("msg",data);
    };
}

module.exports=chatClient;