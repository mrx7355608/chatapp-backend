import "dotenv/config";
import { Server } from "http";
import supertest, { SuperAgentTest } from "supertest";
import connectDB from "@utils/databaseConnection";
import app from "../src/app";
import mongoose from "mongoose";
let token = "";
let server: Server;
let agent: SuperAgentTest;

describe("Testing rooms route", () => {
    beforeAll(async () => {
        // Connect to db
        connectDB();

        // Login to get token
        const response = await supertest(app).post("/auth/login").send({
            username: "mastermind123",
            password: "jadugarbhai123",
        });
        token = response.body.accessToken;
    });
    afterAll(() => {
        mongoose.disconnect();
    });

    beforeEach((done) => {
        server = app.listen(4000, () => {
            agent = supertest.agent(server);
            agent.set("Authorization", `Bearer ${token}`);
            done();
        });
    });
    afterEach((done) => {
        server && server.close(done);
    });

    describe("Get room data", () => {
        const roomid = "638e0b99ae132c4bc24f48c9";

        it("responds with 400 and an error message with invalid room id", async () => {
            await agent.get("/rooms/123123123").expect("Content-type", /json/).expect(400, {
                message: "Invalid ID",
            });
        });
        it("returns 404 with the id of non-existing room", async () => {
            await agent
                .get("/rooms/638ecfbafde1463c28023650")
                .expect("Content-type", /json/)
                .expect(404, {
                    message: "Room does not exists",
                });
        });
        it("returns room data when valid data is given", async () => {
            const response = await agent
                .get(`/rooms/${roomid}`)
                .expect("Content-type", /json/)
                .expect(200);
            expect(response.body).toEqual({
                data: {
                    name: expect.any(String),
                    _id: expect.any(String),
                    admin: expect.any(String),
                    bannedUsers: expect.any(Array),
                },
            });
        });
    });
    describe("Join room", () => {
        const endpoint = "/rooms/join";
        const roomid = "638e0b99ae132c4bc24f48c9";

        it("returns 400 when an invalid password is given", async () => {
            await agent
                .post(endpoint)
                .send({
                    roomid,
                    roomPassword: "123456",
                })
                .expect("Content-type", /json/)
                .expect(400, {
                    message: "Incorrect room password",
                });
        });
        it("returns 400 when non-existing room id is given", async () => {
            await agent
                .post(endpoint)
                .send({
                    roomid: "638ecfbafde1463c28023650",
                    roomPassword: "123",
                })
                .expect(400, {
                    message: "Room is not active anymore",
                });
        });
        it.skip("joins room with valid data (passed)", async () => {
            const response = await agent
                .post(endpoint)
                .send({
                    roomid,
                    roomPassword: "123123123123",
                })
                .expect(200);

            expect(response.body).toEqual({
                data: {
                    admin: expect.any(String),
                    _id: expect.any(String),
                    name: expect.any(String),
                    bannedUsers: expect.any(Array),
                },
            });
        });
    });

    // TODO: Add tests for:
    //    - kicking room users
    //    - banning room users
    //    - Giving room admin role to another room user
    //    - Deleting messages
});
