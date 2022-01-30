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

app.use(express.static(path.join(__dirname, '/../public')));

app.get('/',()=>{
    res.sendFile('index');
})

app.all('*',(req,res)=>{
    res.status(404).send('404');
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