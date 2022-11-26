const Platform = require("../models/Platform");
const { chai, server } = require("./testConfig");
var constants = require("../helpers/constants").testConstants;

describe("Platform", () => {
    before((done) => {
        Platform.deleteMany({}, () => {
            done();
        });
    });

    const testData = {
        "name": "Testing Platform",
		"games": []
    };

    /**
     * Test the /POST route
     * Should succeed
     */
    describe("/POST platform Store", () => {
		it("Should store the platform", (done) => {
			chai.request(server)
				.post("/api/platform")
				.send(testData)
				.end((err, res) => {
					res.should.have.status(200);
					// res.body.should.have.property("message").eql("Platform posted successfully.");
					constants.platformId = res.body.data._id;
					done();
				});
		});
	});

    /**
     * Test the /GET route
     * Should succeed
     */
     describe("/GET All platform", () => {
		it("Should GET all the platforms", (done) => {
			chai.request(server)
				.get("/api/platform")
				// .set("Authorization", "Bearer " + constants.jwt)
				.end((err, res) => {
					res.should.have.status(200);
					// res.body.should.have.property("message").eql("Operation Success");
					done();
				});
		});
	});

    /**
	 * Test the /GET/:id route
	 * Should succeed
	 */
	describe("/GET/:id platform", () => {
		it("Should GET the platform", (done) => {
			chai.request(server)
				.get("/api/platform/" + constants.platformId)
				// .set("Authorization", "Bearer " + constants.jwt)
				.end((err, res) => {
					res.should.have.status(200);
					// res.body.should.have.property("message").eql("Operation Success");
					done();
				});
		});
	});

    /**
	 * Test the /PUT/:id route
	 * Should succeed
	 */
	describe("/PUT/:id platform", () => {
		it("Should PUT the platforms", (done) => {
			chai.request(server)
				.put("/api/platform/" + constants.platformId)
				.send(testData)
				// .set("Authorization", "Bearer " + constants.jwt)
				.end((err, res) => {
					res.should.have.status(200);
					// res.body.should.have.property("message").eql("Platform updated succesfully.");
					done();
				});
		});
	});

    /**
	 * Test the /DELETE/:id route
	 * Should succeed
	 */
	describe("/DELETE/:id platform", () => {
		it("Should DELETE the platform", (done) => {
			chai.request(server)
				.delete("/api/platform/" + constants.platformId)
				// .set("Authorization", "Bearer " + constants.jwt)
				.end((err, res) => {
					res.should.have.status(200);
					// res.body.should.have.property("message").eql("platform deleted successfully.");
					done();
				});
		});
	});
});