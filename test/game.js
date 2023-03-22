const Game = require("../models/Game");
const { 
    chai,
    server,
} = require("./testConfig");
var constants = require("../helpers/constants").testConstants;

/**
 * Test cases to test all the game APIs
 * Covered Routes:
 * (1) Store game
 * (2) Get all games
 * (3) Get single game
 * (4) Update game
 * (5) Delete game
 */

describe("Game", () => {
    before((done) => {
        Game.deleteMany({}, () => {
            done();
        });
    });

    const testData = {
		"platforms": [{"_id": "6378ade1ba4eda3abcd41d91"}],
		"name": "TestGame",
		"gameRule": "Testing Rule",
		"totalRuns": 0,
		"playerCount": 0,
		"categories": [
			{
				"name": "Test%",
				"categoryRule": "Run starts at selection of Test Game"
			},
		],
		"image": ""
	};

    /**
     * Test the /POST route
     * Should succeed
     */
    describe("/POST game Store", () => {
		it("Should store the game", (done) => {
			chai.request(server)
				.post("/api/game")
				.send(testData)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Game posted successfully.");
					constants.gameId = res.body.data._id;
					done();
				});
		});
	});

    /**
     * Test the /GET route
     * Should succeed
     */
     describe("/GET All game", () => {
		it("Should GET all the games", (done) => {
			chai.request(server)
				.get("/api/game")
				// .set("Authorization", "Bearer " + constants.jwt)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Operation Success");
					done();
				});
		});
	});

    /**
	 * Test the /GET/:id route
	 * Should succeed
	 */
	describe("/GET/:id game", () => {
		it("Should GET the game", (done) => {
			chai.request(server)
				.get("/api/game/" + constants.gameId)
				// .set("Authorization", "Bearer " + constants.jwt)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Operation success");
					done();
				});
		});
	});

    /**
	 * Test the /PUT/:id route
	 * Should succeed
	 */
	describe("/PUT/:id game", () => {
		it("Should PUT the games", (done) => {
			chai.request(server)
				.put("/api/game/" + constants.gameId)
				.send(testData)
				// .set("Authorization", "Bearer " + constants.jwt)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Game updated succesfully.");
					done();
				});
		});
	});

    /**
	 * Test the /DELETE/:id route
	 * Should succeed
	 */
	describe("/DELETE/:id game", () => {
		it("Should DELETE the game", (done) => {
			chai.request(server)
				.delete("/api/game/" + constants.gameId)
				// .set("Authorization", "Bearer " + constants.jwt)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Game deleted successfully.");
					done();
				});
		});
	});
});