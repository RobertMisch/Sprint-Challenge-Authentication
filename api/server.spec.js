const request = require("supertest");

const server = require("./server.js");
const db = require("../database/dbConfig.js");

afterAll(() => {
    return db.migrate.rollback().then(() => db.migrate.latest());
});
//.then(() => db.seed.run())

describe("server", () => {
    it("can run the tests", () => {
        expect(true).toBeTruthy();
    });
    describe("POST /api/auth/register", () => {
        it("should return 201", () => {
            return request(server)
                .post("/api/auth/register")
                .send({
                    "username": "lemons",
                    "password": "spooky"
                })
                .then(response => {
                    expect(response.status).toBe(201);
                    expect(response.body.data.username).toEqual("lemons")
                });
        });
    })


    describe("POST /login", () => {
        it("should return 201", () => {
            return request(server)
                .post("/api/auth/login")
                .send({
                    "username": "lemons",
                    "password": "spooky"
                })
                .then(response => {
                    expect(response.status).toBe(200);
                    expect(response.body.token).toBeDefined();
                });
        });
    })


    test("GET /api/joke to get all jokes", async () => {
        const register = await request(server)
            .post("/api/auth/register")
            .send({ username: "fancy", password: "way" });
        const login = await request(server)
            .post("/api/auth/login")
            .send({ username: "fancy", password: "way" });
        const res = await request(server)
            .get("/api/jokes")
            .set("authorization", login.body.token);
        expect(res.body).toHaveLength(20);
        expect(res.body[0]).toHaveProperty("id");
    });

    describe('GET /api/joke', function () {
        it('responds with json and 200', function (done) {
            request(server)
                .get('/api/jokes')
                .auth('lemons', 'spooky')
                .set("authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxlbW9ucyIsImlhdCI6MTU5MDE2MjAyMiwiZXhwIjoxNTkwMjQ4NDIyfQ.ZYiYau6J3kOHJPpt0ptaiovcAYELZz5HOMtUi7TE6YU")
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });
})