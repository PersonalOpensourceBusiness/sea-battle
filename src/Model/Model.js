import {Board} from './Board';
import {Ship} from './Ship';

export class Model {
    constructor() {
        
    }

    init() {
        this.field = this.createBoard()
    }

    createShip(n) {
        return new Ship(n);
    }

    createBoard() {
        return new Board();
    }
}