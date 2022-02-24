module.exports = {
  require: "@babel/register",
  spec: "specs/**/*.spec.js",
  ignore: "spec/example.spec.js", // if any file needs to be ignored
  file: "config/setup.js", // code starts to run from that file
  // timeout: 15000        // if timeout is needed
}
