// Creating a class for users

class Users {
	constructor () {
		this.users = [];
	}
    
	addUser(id, name, room) {
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}
    
	removeUser(id) {
		var user = this.getUser(id);
		if(user) {
			this.users = this.users.filter((user) => user.id !== id);
		}
		return user;
	}
    
	getUser(id) {
		return this.users.filter((user) => user.id === id)[0];
	}

	getUserList(room) {
		var users = this.users.filter((user) => user.room === room);
		var usersArray = users.map((user) => user.name);
		return usersArray;
	}

	getRoomList() {
		var roomsArray = this.users.map(element => element.room).filter((x, i, a) => a.indexOf(x) == i);
		return roomsArray;
	}
}

module.exports = {
	Users
};