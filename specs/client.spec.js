import ClientHelper from "../helpers/client.helper"
import { expect } from "chai"

describe("C L I E N T S", function () {
  let clientHelper = new ClientHelper()
  let clientId

  before(async function () {
    await clientHelper.create("Roman", "222-222-2222", "romanroy@waystar.com")
    clientId = clientHelper.response.body.payload
  })

  describe("Client creation", function () {
    it("response status code is 200", function () {
      expect(clientHelper.response.statusCode).to.eq(200)
    })
    it("response body contains message Client created", function () {
      expect(clientHelper.response.body.message).to.eq("Client created")
    })
    it("response body contains clientId", function () {
      expect(clientHelper.response.body.payload).not.to.be.undefined
    })
  })

  describe("get client by ID", function () {
    before(async function () {
      await clientHelper.getById(clientId)
    })
    it("response status code is 200", function () {
      expect(clientHelper.response.statusCode).to.eq(200)
    })
    it("response body contains message Get Client by id ok", function () {
      expect(clientHelper.response.body.message).to.eq("Get Client by id ok")
    })
  })

  describe("Edit client by ID", function () {
    before(async function () {
      await clientHelper.editById(clientId)
    })
    it("response status code is 200", function () {
      expect(clientHelper.response.statusCode).to.eq(200)
    })
    it("response body contains message Client updated", function () {
      expect(clientHelper.response.body.message).to.eq("Client updated")
    })
  })

  describe("Client deletion", function () {
    before(async function () {
      await clientHelper.delete(clientId)
    })
    it("response status code is 200", function () {
      expect(clientHelper.response.statusCode).to.eq(200)
    })
    it("response body contains message Client deleted", function () {
      expect(clientHelper.response.body.message).to.eq("Client deleted")
    })
  })
})
