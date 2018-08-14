var socket = io();
            socket.on("connect", function () {
                console.log("Connected to the server");
            });
            socket.on("disconnect", function () {
                console.log("Disconnected from server");
            });
            socket.on("newMessage", function (newMessage) {
                console.log("Got new message");

                var li = jQuery("<li></li>");
                li.text(`${newMessage.from}:  ${newMessage.text}`);

                jQuery("#messages").append(li);
            });

            // socket.emit("createMessage",{
            //     from: "xyz",
            //     text: "working"
            // }, function (data) {
            //     console.log("Got it.", data);
            // });

            jQuery("#messageform").on("submit", function(e) {
                e.preventDefault();

                socket.emit("createMessage", {
                    from: "User",
                    text: jQuery("[name=message]").val()
                }, function() {

                });
            });