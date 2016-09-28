export class Board {
    constructor() {
        this.matrix = generate();
    }
}

const generate = () => {
    let matrix = [];
    for(let i = 0; i < 10; i++) {
        matrix[i] = [];
        for(let j = 0; j < 10; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
};