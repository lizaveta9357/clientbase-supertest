// ROOT HOOKS
// LIKE AUTH to save token to env AND data WIPE OUT
import "dotenv/config"
import supertest from "supertest"

before(async function () {
  const request = await supertest(process.env.BASE_URL)
  await request
    .post("/user/login")
    .send({ email: process.env.EMAIL, password: process.env.PASSWORD })
    .then((res) => {
      process.env["TOKEN"] = res.body.token
    })
})
