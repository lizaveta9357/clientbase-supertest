import { expect } from "chai"
import AuthHelper from "../helpers/auth.helper.js"

describe("A U T H O R I Z A T I O N", function () {
  let authHelper = new AuthHelper()

  describe("Successful login", function () {
    before(async function () {
      await authHelper.login(process.env.EMAIL, process.env.PASSWORD)
    })

    it("response status code is 200", function () {
      expect(authHelper.response.statusCode).to.eq(200)
    })

    it("response body contains authorization token", function () {
      expect(authHelper.response.body.payload.token).not.to.be.undefined
    })
  })

  describe("Login with invalid credentials", function () {
    let result

    before(async function () {
      await authHelper.login("invalid", "invalid")
    })

    it("response code is 400", () => {
      expect(authHelper.response.statusCode).to.eq(400)
    })

    it("response body contains error message", () => {
      expect(authHelper.response.body.message).to.be.eq("Auth failed")
    })
  })
})
