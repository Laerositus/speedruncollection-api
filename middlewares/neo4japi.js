const neo4j = require("neo4j-driver").v1;
const User = require("../models/neo4j/User");
// import

var driver = neo4j.driver(
	process.env.NEO4J_URL,
	neo4j.auth.basic(process.env.NEO4J_USR, process.env.NEO4J_PW)
);

// Create a session to run Cypher statements in.
// Note: Always make sure to close sessions when you are done using them!\
var session = driver.session();

exports.searchUserByUsername = function searchUserByUsername(username) {
	return new Promise((resolve, reject) => {
		var query = 
			`MATCH (user:User {username: "${username}"}) 
			RETURN user`;
			
		session
			.run(query)
			.then((result) => {
				session.close();

				if (result.records.length == 0) {
					resolve();
				}

				result.records.forEach((record) => {
					var string = record.get("user").properties;
					resolve(new User(string.userName, string.password));
				});
			}).catch((error) => {
				session.close();
				reject(error);
			});
	});
};

exports.addUser = function addUser(user) {
	return new Promise((resolve, reject) => {
		var query = 
			`MERGE (user:User {
				username: "${user.username}", 
				password: "${user.password}"
			})RETURN user`;

		session
			.run(query)
			.then((result) => {
				session.close();

				result.records.forEach((record) => {
					console.log("Added User: " + record.get("user").properties.username);
					resolve(record.get("user"));
				});

			}).catch((error) => {
				console.log(error);
				session.close();
				reject(error);
			});
	});
};