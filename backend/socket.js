// socket.js
const { Server } = require('socket.io');

let io;

const initializeSocket = (server, allowedOrigins) => {
    io = new Server(server, {
        cors: {
            origin: allowedOrigins,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log(`Seorang pengguna terhubung: ${socket.id}`);

        socket.on('sendMessage', (message) => {
            console.log(`Pesan dari ${socket.id}: ${message}`);
            io.emit('receiveMessage', { sender: socket.id, message });
        });

        socket.on('disconnect', () => {
            console.log(`Pengguna terputus: ${socket.id}`);
        });
    });

    return io;
};

module.exports = { initializeSocket, io: () => io };
