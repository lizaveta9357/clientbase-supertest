import supertest from "supertest"
import { expect } from "chai"

describe("A U T H O R I Z A T I O N", function () {
  const request = supertest(process.env.BASE_URL)

  describe("Successful login", function () {
    let result

    before(async function () {
      await request
        .post("/user/login")
        .send({ email: process.env.EMAIL, password: process.env.PASSWORD })
        .then((res) => {
          result = res
        })
    })

    it("response status code is 200", function () {
      expect(result.statusCode).to.eq(200)
    })

    it("response body contains authorization token", function () {
      expect(result.body.payload.token).not.to.be.undefined
    })
  })

  describe("Login with invalid credentials", function () {
    let result

    before(async function () {
      await request
        .post("/user/login")
        .send({ email: "ohno", password: process.env.PASSWORD })
        .then((res) => {
          result = res
        })
    })

    it("response code is 400", () => {
      expect(result.statusCode).to.eq(400)
    })

    it("response body contains error message", () => {
      expect(result.body.message).to.be.eq("Auth failed")
    })
  })
})
