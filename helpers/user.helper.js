import supertest from "supertest"
import "dotenv/config"

class UserHelper {
  constructor() {
    this.response = null
  }

  async register(firstName, lastName, email, password) {
    await supertest(process.env.BASE_URL)
      .post("/user")
      .send({ firstName, lastName, email, password, agreement: true })
      .then((res) => {
        this.response = res
      })
  }

  async login(email, password) {
    await supertest(process.env.BASE_URL)
      .post("/user/login")
      .send({ email, password })
      .then((res) => {
        this.response = res
      })
  }

  async getById(userId) {
    await supertest(process.env.BASE_URL)
      .get("/user/" + userId)
      .set("Authorization", process.env.TOKEN)
      .then((res) => {
        this.response = res
      })
  }

  async verifyEmail(confirmationLink) {
    await supertest(process.env.BASE_URL).get(confirmationLink)
  }
}

export default UserHelper
