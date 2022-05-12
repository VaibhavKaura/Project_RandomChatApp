const nodemon = require("nodemon");

const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const users={};

io.on("connection", socket=>{

    socket.on("user-joined", namee=>{
        // console.log("joined", namee);
        users[socket.id] = namee;
        socket.broadcast.emit("joined", namee);
    });

    socket.on("Send-msg", message=>{
        socket.broadcast.emit("receive", {message: message, name: users[socket.id]});
    });

    socket.on("disconnect", message=>{
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });
});

