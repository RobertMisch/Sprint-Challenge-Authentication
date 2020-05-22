const request = require("supertest");

const server = require("./server.js");
const db = require("../database/dbConfig.js");

beforeEach(() => {
    return db.migrate.rollback().then(() => db.migrate.latest()).then(() => db.seed.run());
});


describe("POST /register", () => {
    it("should return 201", () => {
        return request(server)
            .post("/register")
            .send({
                "username": "spooky",
                "password": "lemons"
            })
            .then(response => {
                expect(response.status).toBe(201);
                expect(response.body.data.username).toEqual("spooky")
            });
    });
})


describe("POST /login", () => {
    it("should return 201", () => {
        return request(server)
            .post("/login")
            .send({
                "username": "spooky",
                "password": "lemons"
            })
            .then(response => {
                expect(response.status).toBe(200);
                expect(response.body.token).toBe(true)
            });
    });
})


describe('GET /user', function () {
    it('responds with json', function (done) {
        request(server)
            .get('/user')
            .auth('username', 'password')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});