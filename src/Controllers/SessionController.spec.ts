

import request from "supertest"
import { app } from "../app"

describe("SessionController", () => {
    
    it("Create a session", async () => {

        const response = await request(app).post("/session").send({
            email: "colacoeeae@gamil.com",
            password: "1234567"
        })

        expect(response.status).toBe(201)
        expect(response.body).toBe(response.body)
    })
})