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

            socket.on("newLocationMessage", function (message) {
                var li = jQuery("<li></li>");
                var a = jQuery("<a target='_blank'>My Current Location</a>");

                li.text(`${message.from}:`);
                a.attr("href", message.url);
                li.append(a);
                jQuery("#messages").append(li);
            });

            jQuery("#messageform").on("submit", function(e) {
                e.preventDefault();

                socket.emit("createMessage", {
                    from: "User",
                    text: jQuery("[name=message]").val()
                }, function() {

                });
            });

            var locationButton = jQuery("#locationButton");
            locationButton.on("click", function() {
                if(!navigator.geolocation) {
                    alert("Geolocation API is not compatible with your browser");
                }

                navigator.geolocation.getCurrentPosition(function (position) {
                   socket.emit("createLocationMessage", {
                       latitude: position.coords.latitude,
                       longitude: position.coords.longitude
                   });
                });
            }, function() {
                alert("Unable to fetch the position.");
            });