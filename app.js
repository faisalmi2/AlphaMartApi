const express = require('express');
const cors=require("cors");

const config=require('./config');
var bodyParser = require('body-parser');

const accountRoutes = require('./routes/accountRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

const app=express();
app.use(cors());
app.use(bodyParser.json());


app.use('/api',accountRoutes.routes);
app.use('/api',conversationRoutes.routes);

const http=require('http');
const server=http.createServer(app);
const io = require('socket.io')(server);



let connectedUser={};

io.on('connection',(socket)=>{
    console.log('socket is connected');

    const userId = socket.handshake.query.id
    connectedUser[userId]=socket.id;

    socket.join(socket.id);

    //console.log(connectedUser);
    socket.on('private-message',(data)=>{
        const toSocketId=connectedUser[data.ReceiverId];
        //console.log('toSocketId',toSocketId,'data.to',data.to);
        io.sockets.to(toSocketId).emit("recieve-message", data);
    });

    
})

app.get('/',(req,res)=>{
    res.send("Asalamulikum");
})


server.listen(config.port,()=>{    
    console.log(`Listing to port ${config.port}`);
})


