var socket = io();
socket.on("connect", function () {
    console.log("Connected to the server");
});
socket.on("disconnect", function () {
    console.log("Disconnected from server");
});
socket.on("newMessage", function (newMessage) {
    console.log("Got new message");
    var formattedTime = moment(newMessage.createdAt).format("h:mm a");

    var li = jQuery("<li></li>");
    li.text(`${newMessage.from}: ${formattedTime}  ${newMessage.text}`);

    jQuery("#messages").append(li);
});

// socket.emit("createMessage",{
//     from: "xyz",
//     text: "working"
// }, function (data) {
//     console.log("Got it.", data);
// });

socket.on("newLocationMessage", function (message) {
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var li = jQuery("<li></li>");
    var a = jQuery("<a target='_blank'>My Current Location</a>");

    li.text(`${message.from} ${formattedTime}:`);
    a.attr("href", message.url);
    li.append(a);
    jQuery("#messages").append(li);
});

var textMessage = jQuery("[name=message]");
jQuery("#messageform").on("submit", function (e) {
    e.preventDefault();

    socket.emit("createMessage", {
        from: "User",
        text: textMessage.val()
    }, function () {
        textMessage.val("");
    });
});

var locationButton = jQuery("#locationButton");
locationButton.on("click", function () {
    if (!navigator.geolocation) {
        alert("Geolocation API is not compatible with your browser");
    }

    locationButton.attr("disabled", "disabled").text("Sending location...");
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr("disabled").text("Send location");
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    });
}, function () {
    locationButton.removeAttr("disabled").text("Send location");
    alert("Unable to fetch the position.");
});