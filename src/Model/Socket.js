import io from 'socket.io-client';

export class Socket {
    constructor() {
        this.socket = io('http://localhost:5000');
        this.rooms;
        this.id = generateId();
        this.data;
    }

    init() {
        this.socket.on('step2', (data) => {
            this.rooms = data;
        });
        this.socket.on('pushMatrix', (data) => {
            console.log(data);
            this.data = data;
        });

    }
    getId() {
        return this.socket.id;
    }
    attack(board, y, x) {
        this.socket.emit('game:attack', {
            board: board.dataset.key,
            y: y,
            x: x
        });
        return this.data[board.dataset.key][y][x];
    };
    getRooms() {
        return this.rooms;
    }

    create(players) {
        this.socket.emit('game:create', {
            id: this.id,
            players: players
        });
    }

    join() {
        this.socket.emit('game:join');
    }
    ready(player) {
        this.socket.emit('game:ready', player);
    }
    pushMatrix(matrix) {
        this.socket.emit('game:pushMatrix', {
            matrix: matrix,
            id: this.socket.id
        });
    }
    pushBotMatrix() {
        this.socket.emit('game:pushBotMatrix', {
            matrix: Math.floor(Math.random() * 2),
            id: 'bot'
        });
    }
    connect(room) {
        this.socket.emit('game:connect', room);
    }
}

const generateId = () => {
    return Math.floor(Math.random() * 10000000);
};