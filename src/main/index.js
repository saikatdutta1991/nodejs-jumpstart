const http = require("http");
const app = require("./app");
const io = require("./app/commons/socket-io");

const port = process.env.PORT;

/** Create HTTP server */
const server = http.createServer(app);
io.attach(server);
server.listen(port);
