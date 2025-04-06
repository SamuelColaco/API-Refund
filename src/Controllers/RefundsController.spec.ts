
import request from "supertest"
import { app } from "../app"

describe("RefundsController", () => {
    
    it("List all refunds", async () => {

        const authenticated = await request(app).post("/session").send({
            email: "colacoeeae.@gamil",
            password: "1234567"
        })

        const token = authenticated.body.token

        const response = await request(app).get("/refund?name=Samuel&page=1&perPage=10").set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(500)
    })

    it("Create a refund", async () => {

        const authenticated = await request(app).post("/session").send({
            email: "colacoeeae@gamil.com",
            password: "1234567"
        })

        const token = authenticated.body.token

        const response = await request(app).post("/refund").set("Authorization", `Bearer ${token}`).send({
            name: "compra cancelada",
            amount: 130,
            category: "others",
            filename: "$#*#&#&*%$337484-foto.jpeg"
        })

        expect(response.status).toBe(201)

    })

})