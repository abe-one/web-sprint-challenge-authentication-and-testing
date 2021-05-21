const server = require("./api/server.js");
const { PORT } = require("./env-variables");

server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
