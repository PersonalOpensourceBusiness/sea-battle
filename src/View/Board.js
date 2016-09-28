export class Board {
    constructor(app, matrix, className) {
        this.app = app;
        this.matrix = matrix;
        this.board = this.init(this.matrix, className);
    }

    init(matrix, className) {
        return render(matrix, this.app, className);
    }

    miss(x, y) {
        console.log('Miss: ', x, y);
    }

    hit(x, y) {
        console.log('Hit: ', x, y);
    }
    shoot(x, y) {
        console.log('Shoot: ', x, y);
    }
    move(x, y, board) {
        let row = board.querySelectorAll('.row');

        row[y + 1].querySelectorAll('.cell')[x].classList.add('hover');
        row[y].querySelectorAll('.cell')[x].classList.add('hover');
        row[y - 1].querySelectorAll('.cell')[x].classList.add('hover');
    }

    remove(x, y, board) {
        let row = board.querySelectorAll('.row');
        
        row[y + 1].querySelectorAll('.cell')[x].classList.remove('hover');
        row[y].querySelectorAll('.cell')[x].classList.remove('hover');
        row[y - 1].querySelectorAll('.cell')[x].classList.remove('hover');
    }

    create(x, y, board) {
        let row = board.querySelectorAll('.row');

        row[y + 1].querySelectorAll('.cell')[x].classList.add('ship');
        row[y].querySelectorAll('.cell')[x].classList.add('ship');
        row[y - 1].querySelectorAll('.cell')[x].classList.add('ship');
    }
}

const generate = (matrix, className) => {
    let field = document.createElement('div');
    field.classList.add('field', className);

    for(let i = 0; i < matrix.length; i++) {
        let row = document.createElement('div');
        row.classList.add('row');

        for(let j = 0; j < matrix[i].length; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
        
        field.appendChild(row);
    }

    return field;
};

const render = (matrix, board, className) => {
    return board.appendChild(generate(matrix, className));
};