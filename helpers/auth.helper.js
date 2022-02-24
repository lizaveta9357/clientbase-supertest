import supertest from "supertest"

class AuthHelper {
  constructor() {
    this.response = null
  }

  async login(email, password) {
    await supertest(process.env.BASE_URL)
      .post("/user/login")
      .send({ email: email, password: password })
      .then((res) => {
        this.response = res
      })
  }
}

export default AuthHelper
