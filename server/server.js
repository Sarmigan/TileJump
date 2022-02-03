const express = require('express');
const path = require('path');
const http = require('http');
const PORT = process.env.PORT || 5000;
const socketio = require('socket.io');
const res = require('express/lib/response');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const hack = require('./grid');

app.use(express.static(path.resolve("./public")));

app.get('/',(req, res)=>{
    res.sendFile(path.resolve("./public") + '/index.html');
})

app.get('/grid',(req, res)=>{
    res.sendFile(path.resolve("./public") + '/grid.html');
})

app.all('*',(req,res)=>{
    res.status(404).sendFile(path.resolve("./public") + '/404.html');
});

io.on('connection', socket =>{
    console.log('Client connected');

    socket.on('req-grid', async data=>{
        var grid = await hack.createPath(1, 0, 6, 6, 7, 7);
        socket.emit('res-grid', {grid: grid});
    });
})

server.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
});