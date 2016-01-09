/**
 * Created by iamchenxin on 1/7/16.
 */
var express = require('express');
var path = require("path");
var socketio = require("socket.io");

var server = express();
var httpServer = require("http").Server(server);
var io = socketio(httpServer);

function Run(port){


    server.get("/",(request,response)=>{
        response.send("welcome!");
    });
    server.get("/app", function (request, response) {
        response.sendFile(path.join(__dirname,"app/index.html"));
    });
    server.get("/app/:file", function (request, response) {
        console.log(request.params.file);
        response.sendFile(path.join(__dirname,`app/${request.params.file}`));
    });


    io.on("connection",socket=>{
       console.log(" a user connected");
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });


        socket.on('msg',msg=>{
         //   console.log(msg);

            console.log(`get msg :  -- ${JSON.stringify(msg)} --`);
            socket.broadcast.emit('new message',msg);
        })
    });


    httpServer.listen(port,()=>{
        console.log(`listen at ${port}`);
    });


}

Run(8828);