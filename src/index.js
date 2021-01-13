const express = require('express');
const morgan = require('morgan');
const path = require('path');
const http = require('http');

const sockets = require('./sockets');

const PORT = process.env.PORT || 8080

const app = express(); 
const server = http.createServer(app);
sockets(server);

app.use(express.static(path.join(__dirname, '..', 'public')))



app.listen(PORT, () =>{
    console.log(`app runnning at http://localhost:${PORT}`);
});