const { resolve } = require("path");
const { config } = require("@swc/core/spack");

module.exports = config({
  entry: resolve(__dirname, "src/index.ts"),
  output: { path: resolve(__dirname, "lib") },
  mode: "production",
  target: "browser",
  externalModules: ["react"],
});
