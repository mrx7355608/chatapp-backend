import "dotenv/config";
import app from "../src/app";
import supertest from "supertest";
import mongoose from "mongoose";

describe("Testing auth routes", () => {
    beforeAll(async () => {
        mongoose.connect(process.env.DATABASE_URL as string);
    });
    afterAll(() => {
        mongoose.disconnect();
    });

    describe("Login", () => {
        it("logs in successfully with valid data", async () => {
            const response = await supertest(app)
                .post("/auth/login")
                .send({
                    username: "mastermind123",
                    password: "jadugarbhai123",
                })
                .expect("Content-type", /json/)
                .expect(200);

            expect(response.body).toStrictEqual({
                success: true,
                accessToken: expect.any(String),
            });
        });
        it("returns 400 when a null value is given", async () => {
            await supertest(app)
                .post("/auth/login")
                .send({
                    username: "mastermind123",
                    password: null,
                })
                .expect("Content-type", /json/)
                .expect(400, {
                    message: "Password should be a text value",
                });
        });
        it("returns 400 when a mongodb operator is passed in data", async () => {
            await supertest(app)
                .post("/auth/login")
                .send({
                    username: "mastermind123",
                    password: { $gte: "" },
                })
                .expect(400);
        });
    });
});
