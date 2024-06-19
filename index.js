const express = require("express")
const cors = require("cors")
const dgram = require("dgram")
const http = require("http")
const socketio = require("socket.io")

//& "C:\Users\alunoetc\nodejs\node.exe"

const PORT = process.env.PORT || 8000

const app = express()
const server = http.createServer(express)
const io = new socketio.Server(server)

var g_socket;
var g_addr = "51.89.78.39"
var g_port = 27015;

app.get("/", (request, response) => {
    const {port, addr} = req.query

    if (!port || !addr){
        return response.status(400).send("Error")
    }

    g_addr = addr
    g_port = port

    return response.status(200).send("Success")
})

const clients = {}

io.on("connection", (socket) => {
    console.log("Client connected", socket.id);
    clients[socket.id] = datagram.createSocket("udp4");
    g_socket = socket;
    socket.on("game_client", (data) => {
        clients[socket.id].send(data, g_port, g_addr, (error, bytes) => {});
    })
    clients[socket.id].on("message", (data, info) => {
        socket.emit("game_server", data);
    });
});


server.listen(PORT, () => {
    console.log("Server listening on PORT: " + PORT)
})