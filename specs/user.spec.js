import { expect, use } from "chai"
import UserHelper from "../helpers/user.helper.js"
import faker from "faker"
import { shiftToNext } from "../helpers/common.helper.js"
let userHelper = new UserHelper()

describe("U S E R", function () {
  let email = faker.internet.email()
  let password = faker.internet.password()
  let userId
  let confirmationLink

  describe("Successful registration", function () {
    before(async function () {
      await userHelper.register(faker.name.firstName(), faker.name.lastName(), email, password)
    })
    it("response status code is 201", function () {
      expect(userHelper.response.statusCode).to.eq(201)
    })
    it("response message is User created successfully", function () {
      expect(userHelper.response.body.message).to.eq("User created successfully. Please check your email and verify it")
    })
    it("freshly registered user is assigned role New", async function () {
      await userHelper.login(email, password)
      userId = userHelper.response.body.payload.userId
      await userHelper.getById(userId)
      expect(userHelper.response.body.payload.roles).to.include("new")
    })
  })

  describe("Verify email", function () {
    before(async function () {
      await userHelper.login(email, password)
      userId = userHelper.response.body.payload.userId
      confirmationLink = userHelper.response.body.payload.confirmEmailLink.replace("undefined", "") + shiftToNext(userId, 1)
      await userHelper.verifyEmail(confirmationLink)
      await userHelper.getById(userId)
    })
    it("user is assigned role Verified after confirming email", function () {
      expect(userHelper.response.body.payload.roles).to.include("verified")
    })
  })

  describe("Successful login", function () {
    before(async function () {
      await userHelper.login(process.env.EMAIL, process.env.PASSWORD)
    })
    it("response status code is 200", () => {
      expect(userHelper.response.statusCode).to.eq(200)
    })
    it("response body contains authorization token", function () {
      expect(userHelper.response.body.payload.token).not.to.be.undefined
    })
  })

  describe("Login with invalid credentials", function () {
    before(async function () {
      await userHelper.login("invalid", "invalid")
    })
    it("response code is 400", () => {
      expect(userHelper.response.statusCode).to.eq(400)
    })
    it("response body contains error message", () => {
      expect(userHelper.response.body.message).to.be.eq("Auth failed")
    })
  })
})
