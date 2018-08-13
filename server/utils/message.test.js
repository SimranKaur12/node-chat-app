var expect = require("expect");
var {generateMessage} = require("./message");

describe("generateMessage", () => {
    it("should check correct message is generated", () => {
        var from = "abc";
        var text = "testing";
        var message = generateMessage(from, text);
       expect(message).toMatchObject({from,text});
        expect(typeof message.createdAt).toBe("number");
    });
});