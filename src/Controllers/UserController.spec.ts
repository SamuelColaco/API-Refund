

import request from "supertest"
import { app } from "../app"

describe("RefundsController", () => {
    
    it("List all users", async () => {

        const authenticated = await request(app).post("/session").send({
            email: "colacoeeae.@gamil",
            password: "1234567"
        })

        const token = authenticated.body.token

        const response = await request(app).get("/users").set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(200)
    })

    it("Create a user", async () => {

        const response = await request(app).post("/refund").send({
            name: "Diego Fernandes",
            email: "diegofernade@gmail.com",
            password: "1234567"
        })

        expect(response.status).toBe(201)

    })

})