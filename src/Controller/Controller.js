export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.players = {};
        this.rooms;
        this.playersCount;
        this.ready = false;
        this.i = 0;
        this.horizontal = false;
        this.empty;
        this.botCount;
        this.count = 0;
        this.bot = false;
    }

    init() {
        this.renderInterface();
        this.model.socket.socket.on('attack', data => {
            Array.prototype.forEach.call(document.querySelectorAll('.field'), (item)=> {
                if(item.dataset.key !== data.board) return;
                if(data.hit) {
                    item.querySelectorAll('.row')[data.y].querySelectorAll('.cell')[data.x].classList.add('hit');
                } else {
                    item.querySelectorAll('.row')[data.y].querySelectorAll('.cell')[data.x].classList.add('miss');
                }
            })
        })
    }

    // Обработчики
    eventHandlers() {
        Object.keys(this.players).map(item=>{
            let board = this.players[item].board.board;

            board.addEventListener('mouseover', e => this.onHover(e, this.view.moveShip, board, item));
            board.addEventListener('mouseout', e => this.onHover(e, this.view.removeShip, board));
            board.addEventListener('click', e=> this.onClick(e, board, item));
        });
        this.model.socket.socket.on('ready', () => {
            for(let i = 0; i< this.model.socket.data[this.player].length; i++) {
                for(let j = 0; j < this.model.socket.data[this.player][i].length; j++) {
                    this.count += this.model.socket.data[this.player][i][j];
                }
            }
            this.ready = true;
        });
        this.model.socket.socket.on('move:ready', () => this.ready = true);
        document.querySelector('.horizontal-button').addEventListener('click', () => {
            this.horizontal = !this.horizontal;
            document.querySelector('.horizontal-button').innerText = this.horizontal ? 'Горизонтально' : 'Вертикально';
        });

    }
    clearInterface() {
        let interField = document.querySelector('.interface');
        interField.parentNode.removeChild(interField);
    }
    startNewGame(players) {
        this.player = this.model.socket.getId();

        // Различаем своё поле и поля противника
        players.map(item => {
            this.players[item] = {
                board: item !== this.player ? this.view.createBoard('enemy') : this.view.createBoard('your')
            };
            // Назначаем каждому полю имя сокета
            item === this.player ? this.players[this.player].board.board.dataset.key=this.player : this.players[item].board.board.dataset.key=item;
            item === this.player ? this.players[this.player].board.board.classList.add(this.player) : this.players[item].board.board.classList.add(item);
            this.bot = item==='bot';
        });
        let button = document.createElement('button');
        button.classList.add('horizontal-button');
        button.innerText = 'Горизонтально';

        this.players[this.player].board.board.appendChild(button);

        this.eventHandlers();
    }

    renderInterface() {
        // Создаем стартовый интерфейс
        this.view.createInterface();

        document.querySelector('#create').addEventListener('click', () => {
            // При клике попадаем на интерфейс создания новой игры
            this.view.renderChoice();

            document.querySelector('#init').addEventListener('click',() => {
                // По клику берем данные из инпутов и создаем игру
                this.model.createGame(document.querySelector('#players').value);
                this.view.renderWait(document.querySelector('#players').value);

                // Подсвечиваем иконку с игроком
                this.model.socket.socket.on('create', data => {
                    document.querySelectorAll('.playersBlock')[0].dataset.key = Object.keys(data.rooms[data.roomsID].sockets)[0].substr(2);
                    document.querySelectorAll('.playersBlock')[0].classList.add('man');
                    this.playersCount = data.players;
                });
            });
        });
        document.querySelector('#bot').addEventListener('click', () => {
            // При клике попадаем на интерфейс создания новой игры
            this.view.renderChoice();

            document.querySelector('#init').addEventListener('click', () => {
                this.model.createGame(document.querySelector('#players').value);
                this.view.renderWait(document.querySelector('#players').value);

                this.model.socket.socket.on('create', data => {
                    this.clearInterface();
                    this.startNewGame([this.model.socket.getId(), 'bot']);
                });
            });
        });
        document.querySelector('#join').addEventListener('click', () => {
            this.model.join();

            this.model.socket.socket.on('join', (data) => {
                this.view.renderGameList(data.roomsID);
                Array.prototype.forEach.call(document.querySelectorAll('.interface-js-item'), item => {
                    item.classList.remove('active');

                    // По клику выделяем выбранную игру
                    item.addEventListener('click', () => {
                        item.classList.add('active');

                        // Присоединяемся к комнате с игрой
                        document.querySelector('#join-game').addEventListener('click', () => {
                            this.model.connect(item.dataset.room);
                        });
                    });
                });

            });
        });

        // Когда все юзеры подключились
        this.model.socket.socket.on('connected', data => {
            let i = 0;
            this.view.renderWait(data.playersCount);

            // Выводим зеленые иконки при подключении человека
            for(let key in data.rooms[data.roomsID].sockets) {
                document.querySelectorAll('.playersBlock')[i].dataset.key = key.substr(2);
                document.querySelectorAll('.playersBlock')[i].classList.add('man');
                i++;
            }

            document.querySelector('#start').addEventListener('click', ()=> {
                let arr = [];

                // Выбираем все сокеты и создаем новую игру
                for(let i = 0; i < Object.keys(this.model.socket.rooms.rooms.sockets).length; i++) {
                    arr[i] = Object.keys(this.model.socket.rooms.rooms.sockets)[i].substr(2);
                }
                this.clearInterface();
                this.startNewGame(arr);
            });

        });
    }


    onHover(e, action, board, item) {
        let x = Array.prototype.indexOf.call(e.target.parentNode.querySelectorAll('.cell'), e.target);
        let y = Array.prototype.indexOf.call(board.querySelectorAll('.row'), e.target.parentNode);
        let ship;

        if(board.classList.contains('your')) {
            // Если не осталось кораблей в пулле
            if(!Object.keys(this.model.ships).length) {
                if(this.bot) {
                    if(this.i > 0) {
                        board.removeEventListener('mouseover', this.onHover);
                        return;
                    } else {
                        for(let i = 0; i< this.model.socket.data[this.player].length; i++) {
                            for(let j = 0; j < this.model.socket.data[this.player][i].length; j++) {
                                this.count += this.model.socket.data[this.player][i][j];
                            }
                        }
                        this.botCount = this.count;
                        this.model.socket.pushBotMatrix();
                        this.ready = true;
                        this.i++;
                    }
                } else {
                    if(this.i > 0) {
                        board.removeEventListener('mouseover', this.onHover);
                        return;
                    } else {
                        this.model.getReady(item);
                        this.i++;
                    }
                }

            }

            // Если не осталось кораблей выходим
            if(!Object.keys(this.model.ships).length || !e.target.classList.contains('cell')) return;

            // Если закончились корабли определенного размера - удаляем этот размер
            if(!this.model.ships[Object.keys(this.model.ships).length].length) delete this.model.ships[Object.keys(this.model.ships).length];

            // Если есть корабли - выставляем самый большой
            ship = this.model.ships[Object.keys(this.model.ships).length] ? this.model.ships[Object.keys(this.model.ships).length][0] : '';

            // Проверяем массив ячеек на пустоту
            let matrix = action(x, y, board, ship, this.horizontal);
            if(!matrix) return;
            let line = [];

            for(let i = 0; i <= matrix.length - 1; i++) {
                line.push(this.model.field.matrix[matrix[i][1]][matrix[i][0]]);
            }
            this.empty = line.every(elem => elem === 0);

        } else if(board.classList.contains('enemy')) {
            action(x, y, board, {size: 1});
        }
    }

    onClick(e, board, item) {
        let x = Array.prototype.indexOf.call(e.target.parentNode.querySelectorAll('.cell'), e.target);
        let y = Array.prototype.indexOf.call(board.querySelectorAll('.row'), e.target.parentNode);
        let ship;

        if(board.classList.contains('your')) {
            // Если не осталось кораблей выходим
            if(!Object.keys(this.model.ships).length || !e.target.classList.contains('cell')) return;

            // Если есть корабли - выставляем самый большой
            ship = this.model.ships[Object.keys(this.model.ships).length] ? this.model.ships[Object.keys(this.model.ships).length][0] : '';

            // Если ячейка пуста создаем корабль
            if(this.empty) this.view.createShip(x, y, board, ship, this.horizontal);
            this.empty = false;

        } else if(board.classList.contains('enemy') && this.ready) {
            // Проверяем ячейку на попадания
            if(!e.target.classList.contains('cell') || e.target.classList.contains('miss') || e.target.classList.contains('hit')) return;
            console.log(this.count);
            this.count -= this.model.socket.attack(board, y, x);
            if(this.count === 0) {
                alert('Победа');
                this.renderInterface();
            }
            if(this.bot) {
                this.botCount -= this.model.socket.attack(document.querySelector('.your'), Math.floor(Math.random() * 9), Math.floor(Math.random() * 9));
                if(this.botCount === 0) {
                    alert('Победа');
                    this.renderInterface();
                }
            }
        }
        // После хода сбрасываем готовность
        this.ready = false;

    }
}