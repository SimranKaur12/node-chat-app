var expect = require("expect");
var {Users} = require("./users");

describe("Users", () => {

	var users;
    
	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: "1",
			name: "abc",
			room: "nodejs"
		},
		{
			id: "2",
			name: "pqr",
			room: "nodejs"
		},
		{
			id: "3",
			name: "xyz",
			room: "reactjs"
		}];
	});

	it("should add a user", () => {
		var users = new Users();
		var user = {
			id: "1",
			name: "abc",
			room: "node"
		};

		var response = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});
    
	it("should give the list of users for nodejs room", () => {
		var response = users.getUserList("nodejs");
		expect(response).toEqual(["abc", "pqr"]);
	});
    
	it("should give the list of users for reactjs room", () => {
		var response = users.getUserList("reactjs");
		expect(response).toEqual(["xyz"]);
	});
    
	it("should remove the user with the specified id", () => {
		var response = users.removeUser("2");
		expect(response.id).toBe("2");
		expect(users.users.length).toBe(2);
	});

	it("should not remove the user when the specified id is not present", () => {
		var response = users.removeUser("99");
		expect(response).toBeFalsy();
		expect(users.users.length).toBe(3);
	});
    
	it("should give the user with the specified id", () => {
		var response = users.getUser("3");
		expect(response.id).toBe("3");
	});
    
	it("should not give the user when the specified id is not present", () => {
		var response = users.getUser("9");
		expect(response).toBeFalsy();
	});
});