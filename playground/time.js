const moment = require("moment");

var date = moment();
date.add(7, "d").subtract(4, "years");
console.log(date.format("MMM YYYY"));


var someTimestamp = moment().valueOf();
console.log(someTimestamp);
var createdAt = 123456789;
var newdate = moment(createdAt);
console.log(newdate.format("h:mm a"));