// ROOT HOOKS
// LIKE AUTH to save token to env AND data WIPE OUT
import AuthHelper from "../helpers/auth.helper.js"
import "dotenv/config"

before(async function () {
  const authHelper = new AuthHelper()
  await authHelper.login(process.env.EMAIL, process.env.PASSWORD)
  process.env["TOKEN"] = authHelper.response.body.payload.token
})
