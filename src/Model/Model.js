import {Board} from './Board';
import {Ship} from './Ship';
import {Socket} from './Socket';

export class Model {
    constructor() {
        this.ships = {};
    }

    init() {
        this.field = this.createBoard()
        this.socket = new Socket();
        this.socket.init();

        // Создаем пулл кораблей. Размеры кораблей должны идти последовательно
        this.ships = {
            4: [this.createShip(4)],
            3: [this.createShip(3), this.createShip(3)],
            2: [this.createShip(2), this.createShip(2), this.createShip(2)],
            1: [this.createShip(1), this.createShip(1), this.createShip(1), this.createShip(1)],
        }
    }

    createShip(n) {
        return new Ship(n);
    }
    removeShip(ship) {
        this.ships[ship] = this.ships[ship].slice(1);
    }
    createBoard() {
        return new Board();
    }
    attack(board, y, x) {
        this.socket.attack(board, y, x);
    }
    addShip(matrix, ship) {
        for(let a = 0; a < matrix.length; a++) {
            this.field.matrix[matrix[a][1]][matrix[a][0]] = ship;
        }
        this.socket.pushMatrix(this.field);
    }

    checkMatrix(y, x) {
        return this.field.matrix[y][x] === 0;
    }

    createGame(players) {
        this.socket.create(players);
    }

    getReady(player) {
        this.socket.ready(player);
    }

    join() {
        this.socket.join();
    }

    connect(room) {
        this.socket.connect(room);
    }
}