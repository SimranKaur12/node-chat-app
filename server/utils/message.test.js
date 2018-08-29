var expect = require("expect");
var {generateMessage, generateLocationMessage} = require("./message");

describe("generateMessage", () => {
    it("should check correct message is generated", () => {
        var from = "abc";
        var text = "testing";
        var message = generateMessage(from, text);
       expect(message).toMatchObject({from,text});
        expect(typeof message.createdAt).toBe("number");
    });
});

describe("generateLocationMessage", () => {
    it("should check correct location message is generated", () => {
        var from = "xyz";
        var latitude = 1;
        var longitude = 1;
        var locationMessage = generateLocationMessage(from, latitude, longitude);
        expect(typeof locationMessage.createdAt).toBe("number");
        expect(locationMessage.from).toBe(from);
        expect(locationMessage.url).toBe("https://www.google.com/maps?q=1,1");
    });
});