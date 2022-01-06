const webSocketsServerPort = 5000;
const webSocketsServer = require("websocket").server;
const http = require("http");

const server = http.createServer();
server.listen(webSocketsServerPort);
console.log("listening on port 5000");

const wsServer = new webSocketsServer({
  httpServer: server,
});

wsServer.on("request", function (request) {
  const connection = request.accept(null, request.origin);

  connection.on();
});
