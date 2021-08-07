const express = require('express');
const cors=require("cors");

const config=require('./config');
var bodyParser = require('body-parser');

const accountRoutes = require('./routes/accountRoutes');
const itemsRoutes = require('./routes/itemsRoutes');
const lookUpRoutes = require('./routes/lookUpTablesRoutes');
const ordersRoutes = require('./routes/orderRoutes');

const app=express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));


app.use('/api',accountRoutes.routes);
app.use('/api',itemsRoutes.routes);
app.use('/api',lookUpRoutes.routes);
app.use('/api',ordersRoutes.routes);


const http=require('http');
const server=http.createServer(app);

app.get('/',(req,res)=>{
    res.send("Asalamulikum");
})


server.listen(config.port,()=>{    
    console.log(`Listing to port ${config.port}`);
})


