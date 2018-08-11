var socket = io();
            socket.on("connect", function () {
                console.log("Connected to the server");
            });
            socket.on("disconnect", function () {
                console.log("Disconnected from server");
            });
            socket.on("newMessage", function (newMessage) {
                console.log("Got new message");
                console.log(newMessage);
            });

            socket.emit("createMessage", ({
                from: "simran",
                message: "hey!"
            }));