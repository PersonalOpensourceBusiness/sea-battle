import {Board} from './Board';
import {Interface} from './Interface';
import {Ship} from './Ship';

export class View {
    constructor(model) {
        this.app = document.querySelector('#app');
        this.model = model;
        this.interface = new Interface(this.app);

    }

    createBoard(className, id) {
        return new Board(this.app, this.model.createBoard().matrix, className, id);
    }

    createInterface() {
        this.interface.render(this.interface.main());
    }

    renderChoice() {
        this.interface.render(this.interface.choice());
        document.querySelector('#players').addEventListener('keyup', e => {
            if(e.target.value > 20) {
                e.target.value = 20
            } else if (e.target.value < 2) {
                e.target.value = 2;
            }
        });
    }

    renderWait(players) {
        this.interface.render(this.interface.wait(players));
    }

    renderGameList(rooms) {
        this.interface.render(this.interface.join(rooms));
    }

    moveShip(x, y, board, ship, hor) {
        return Ship.move(x, y, board, ship, hor);
    }

    removeShip(x, y, board, ship, hor) {
        return Ship.remove(x, y, board, ship, hor);
    }

    createShip(x, y, board, ship, hor) {
        let newShip = Ship.create(x, y, board, ship, hor);
        if(newShip) {
            this.model.addShip(newShip, ship.size);
            this.model.removeShip(ship.size);
        }
        return newShip;
    }
}