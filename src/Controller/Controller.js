export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.players = {};
        this.player;
    }

    init() {
        this.renderInterface();
    }
    eventHandlers() {
        Object.keys(this.players).map(item=>{
            let board = this.players[item].board.board;
            board.addEventListener('mouseover', e=>{
                if(!e.target.classList.contains('cell')) return;
                let x = Array.prototype.indexOf.call(e.target.parentNode.querySelectorAll('.cell'), e.target);
                let y = Array.prototype.indexOf.call(board.querySelectorAll('.row'), e.target.parentNode);
                
                this.players[item].board.move(x, y, board);
            });
            board.addEventListener('mouseout', e=>{
                if(!e.target.classList.contains('cell')) return;

                let x = Array.prototype.indexOf.call(e.target.parentNode.querySelectorAll('.cell'), e.target);
                let y = Array.prototype.indexOf.call(board.querySelectorAll('.row'), e.target.parentNode);

                this.players[item].board.remove(x, y, board);
            });
            board.addEventListener('click', e=>{
                if(!e.target.classList.contains('cell')) return;
                let x = Array.prototype.indexOf.call(e.target.parentNode.querySelectorAll('.cell'), e.target);
                let y = Array.prototype.indexOf.call(board.querySelectorAll('.row'), e.target.parentNode);
                if(item === this.player) {
                    this.players[item].board.create(x, y, board);
                } else {
                    this.players[item].board.shoot(x, y);
                }
            });
        });
    }

    startNewGame(players) {
        let interField = document.querySelector('.interface');
        interField.parentNode.removeChild(interField);
        this.player = 'Player0';
        players.map(item => {
            this.players[item] = {
                board: item !== this.player ? this.view.createBoard('enemy') : this.view.createBoard('your'),
                ships: 'ships'
            }
        });

        this.eventHandlers();
    }

    renderInterface() {
        this.view.createInterface();

        document.querySelector('#create').addEventListener('click', () => {
            this.view.renderChoice();

            document.querySelector('#init').addEventListener('click',() => {
                this.view.renderWait(document.querySelector('#players').value);

                document.querySelector('#start').addEventListener('click', ()=> {
                    let arr = [];
                    for(let i = 0; i < document.querySelectorAll('.playersBlock').length; i++) {
                        arr[i] = 'Player' + i;
                    }
                    this.startNewGame(arr);
                })
            });
        });
        

    }
}