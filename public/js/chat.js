var socket = io();

function scrollToBottom() {
	//selectors
	var messages = jQuery("#messages");
	var newMessage = messages.children("li:last-child");

	//heights
	var clientHeight = messages.prop("clientHeight");
	var scrollTop = messages.prop("scrollTop");
	var scrollHeight = messages.prop("scrollHeight");
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}


socket.on("connect", function () {
	console.log("Connected to the server");
	var params = jQuery.deparam(window.location.search);

	socket.emit("join", params, (err) => {
		if (err) {
			alert(err);
			window.location.href = "/";
		} else {
			console.log("no error");
		}
	});
});
socket.on("disconnect", function () {
	console.log("Disconnected from server");
});

socket.on("updateUserList", function (users) {
	var ol = jQuery("<ol></ol>");
	users.forEach((user) => {
		ol.append(jQuery("<li></li>").text(user));
	});

	jQuery("#users").html(ol);
});

socket.on("newMessage", function (newMessage) {
	var formattedTime = moment(newMessage.createdAt).format("h:mm a");
	var template = jQuery("#message-template").html();
	var html = Mustache.render(template, {
		text: newMessage.text,
		from: newMessage.from,
		createdAt: formattedTime
	});
	jQuery("#messages").append(html);
	scrollToBottom();
	// var li = jQuery("<li></li>");
	// li.text(`${newMessage.from}: ${formattedTime}  ${newMessage.text}`);
	// jQuery("#messages").append(li);
});

// socket.emit("createMessage",{
//     from: "xyz",
//     text: "working"
// }, function (data) {
//     console.log("Got it.", data);
// });

socket.on("newLocationMessage", function (message) {
	var formattedTime = moment(message.createdAt).format("h:mm a");
	var template = jQuery("#location-message-template").html();
	var html = Mustache.render(template, {
		url: message.url,
		from: message.from,
		createdAt: formattedTime
	});
	jQuery("#messages").append(html);
	scrollToBottom();

	// var li = jQuery("<li></li>");
	// var a = jQuery("<a target='_blank'>My Current Location</a>");

	// li.text(`${message.from} ${formattedTime}:`);
	// a.attr("href", message.url);
	// li.append(a);
	// jQuery("#messages").append(li);
});

var textMessage = jQuery("[name=message]");
jQuery("#messageform").on("submit", function (e) {
	e.preventDefault();

	socket.emit("createMessage", {
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

socket.on("notifyAll", function (username) {
	if(!(Notification in window)) {
		alert("The browser does not support notifications.");
	} 
	
	else if(Notification.permission === "granted") {
		notify(username);
	}
	
	else if(Notification.permission !== "denied") {
		Notification.requestPermission(function (permission) {
			if(permission === "granted") {
				notify(username);
			}
			else {
				alert("Notifications are disabled.");
			}
		});
	}
});
	
	
	
var notify = (username) => {
		
	var notification = new Notification(username, {
		icon: "https://www.google.co.in/imgres?imgurl=https%3A%2F%2Fcdn.iconscout.com%2Fpublic%2Fimages%2Ficon%2Fpremium%2Fpng-512%2Fnotification-one-email-letter-mail-message-envelope-37bdb1328250efde-512x512.png&imgrefurl=https%3A%2F%2Ficonscout.com%2Ficon%2Femail-notification-2&docid=sEwXTauE_uHzZM&tbnid=t_ng3Ac8erErqM%3A&vet=10ahUKEwiYvpL4zKXdAhULfCsKHcWqDDUQMwicASgCMAI..i&w=512&h=512&safe=active&bih=672&biw=1301&q=notification%20icons&ved=0ahUKEwiYvpL4zKXdAhULfCsKHcWqDDUQMwicASgCMAI&iact=mrc&uact=8",
		body: "New message received"
	});
	
	setTimeout(notification.close.bind(notification), 6000);
};