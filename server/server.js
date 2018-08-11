const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
// console.log(__dirname, "/../public");
// console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("createMessage", function(message) {
        console.log("message created", message);
        io.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on("disconnect", () =>{
        console.log("Client got disconnected");
    });
    
});


server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
