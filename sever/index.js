const express = require("express");
const { createServer } = require("node:http");

const app = express();
const server = createServer(app);

const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

socketIo.on("connection", (socket) => {
    console.log("New client connected " + socket.id);

    socket.emit("getId", socket.id);

    socket.on("sendDataClient", function (data) {
        console.log(data);
        socketIo.emit("sendDataServer", { data });
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});

server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});
