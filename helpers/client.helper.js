import supertest from "supertest"

class ClientHelper {
  constructor() {
    this.response = null
  }

  async create(name, phone, email) {
    await supertest(process.env.BASE_URL)
      .post("/client")
      .set("Authorization", process.env.TOKEN)
      .send({ name: name, phone: phone, email: email })
      .then((res) => {
        this.response = res
      })
  }

  async getById(clientId) {
    await supertest(process.env.BASE_URL)
      .get("/client/" + clientId)
      .set("Authorization", process.env.TOKEN)
      .then((res) => {
        this.response = res
      })
  }

  async editById(clientId) {
    await supertest(process.env.BASE_URL)
      .patch("/client/" + clientId)
      .set("Authorization", process.env.TOKEN)
      .send({ name: "Kendall" })
      .then((res) => {
        this.response = res
      })
  }

  async delete(clientId) {
    await supertest(process.env.BASE_URL)
      .delete("/client/" + clientId)
      .set("Authorization", process.env.TOKEN)
      .then((res) => {
        this.response = res
      })
  }
}

export default ClientHelper
