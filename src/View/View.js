import {Board} from './Board';
import {Interface} from './Interface';

export class View {
    constructor(model) {
        this.app = document.querySelector('#app');
        this.model = model;
        this.interface = new Interface(this.app);
    }

    createBoard(className) {
       return new Board(this.app, this.model.createBoard().matrix, className);
    }
    
    createInterface() {
        this.interface.render(this.interface.main());
    }

    renderChoice() {
        this.interface.render(this.interface.choice());
    }

    renderWait(players) {
        this.interface.render(this.interface.wait(players));
    }

    createShips() {

    }
}