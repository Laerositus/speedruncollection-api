/* eslint-disable linebreak-style */
process.env.NODE_ENV = "test";
process.env.MONGODB_URL = "mongodb+srv://Laerositus:G7r1B=Hp=$(v@laerositus.jowup.mongodb.net/speedruncollection-test?retryWrites=true&w=majority";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
chai.use(chaiHttp);

//Export this to use in multiple files
module.exports = {
	chai: chai,
	server: server,
	should: should
};