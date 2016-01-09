/**
 * Created by iamchenxin on 12/31/15.
 */
var express = require("express");

function mkmid(message) {
    return function mid1(request, response, next) {
     //   response.write(message);
        console.log(message);
        response.mMessage =`message = [${message}], time = [${process.hrtime()}]`;
        next();
    }
}

function server(port){
    var app = express();
    app.use(mkmid("mid before"));

    app.use("/u/:id",mkmid("user~~"));

    app.get("/",(request,response)=>{
        console.log("a client connected");
        response.send(`hello! ${response.mMessage}`);
    });
    app.get("/u/:id",(request,response)=>{
        response.send(`user!!! ${response.mMessage},id=${request.params.id}`);
    });


    app.use(mkmid("mid after"));

    app.listen(port,()=>{
        console.log(`server start at  [${port}]`);
    });
}

server(8828);