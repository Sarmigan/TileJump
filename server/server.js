const express = require('express');
const path = require('path');
const http = require('http');
const PORT = process.env.PORT || 5000;
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const hack = require('./grid');
const { timeLog } = require('console');

app.use(express.static(path.resolve("./public")));

app.get('/',(req, res)=>{
    res.sendFile(path.resolve("./public") + '/index.html');
})

app.get('/grid',(req, res)=>{
    res.sendFile(path.resolve("./public") + '/grid.html');
})

app.get('/debug',(req,res)=>{
    res.sendFile(path.resolve("./public") + '/debug.html');
});

app.all('*',(req,res)=>{
    res.status(404).sendFile(path.resolve("./public") + '/404.html');
});

io.on('connection', socket =>{
    console.log(`Client {${socket.id}} connected`);

    socket.on('req-grid', data=>{
        var gridData = hack.run(data.endPoint[0], data.endPoint[1], data.rowSize, data.colSize, data.startCount);
        socket.emit('res-grid', {grid: gridData.grid, startPos: gridData.startPos});
        console.log(`Successful grid response to {${socket.id}}`);
    });

    socket.on('disconnect', (reason)=>{
        console.log(`Client {${socket.id}} disconnected (${reason})`);
    });
})

server.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
});