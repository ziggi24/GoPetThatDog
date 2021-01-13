const socket = require('socket.io');


module.exports = (server) =>{
    const io = socket(server);

    io.on('connection', (socket) =>{
        console.log('user connected');
    })
}