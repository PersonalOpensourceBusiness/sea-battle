export class Board {
    constructor(app, matrix, className) {
        this.app = app;
        this.matrix = matrix;
        this.board = this.init(this.matrix, className);
    }

    init(matrix, className) {
        return render(matrix, this.app, className);
    }
}

const generate = (matrix, className) => {
    let field = document.createElement('div');
    console.log(className);
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