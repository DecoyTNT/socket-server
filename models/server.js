// Servidor de express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        // http server
        this.server = http.createServer(this.app);

        // Configuración del socket sserver
        this.io = socketio(this.server, {/* configuraciones */ });
    }

    middlewares() {
        // Desplegar el direcorio público
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }

    configurarSockets() {
        new Sockets(this.io)
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar Server
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

}

module.exports = Server;