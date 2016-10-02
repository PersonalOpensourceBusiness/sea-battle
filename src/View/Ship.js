export class Ship {
    constructor(ship) {
        this.ship = ship;
    }

    static move(x, y, board, ship, hor) {
        let row = board.querySelectorAll('.row');
        let i = Math.floor(ship.size/2);
        let matrix = [];

        if(hor) {
            if(ship.size > 2 && (x < i || x >= row.length - 1 || x%2 !== 0 && (x + i >= row.length)) || ship.size === 2 && x < (x < ship.size || x >= row.length - 1)) return;
            for(let j = x - i; j < (x - i) + ship.size; j++) {
                matrix.push([j, y]);
                if(row[y]) row[y].querySelectorAll('.cell')[j].classList.add('hover');
            }
            return matrix;
        } else {
            if(ship.size > 2 && (y < i || y >= row.length - 1 || y%2 !== 0 && (y + i >= row.length)) || ship.size === 2 && y < (y < ship.size || y >= row.length - 1)) return;
            for(let j = y - i; j < (y - i) + ship.size; j++) {
                matrix.push([x, j]);
                if(row[j]) row[j].querySelectorAll('.cell')[x].classList.add('hover');
            }
            return matrix;
        }

    }

    static remove(x, y, board, ship, hor) {
        let row = board.querySelectorAll('.row');
        let i = Math.floor(ship.size/2);
        let matrix = [];

        if(hor) {
            if(ship.size > 2 && (x < i || x >= row.length - 1 || x%2 !== 0 && (x + i >= row.length)) || ship.size === 2 && x < (x < ship.size || x >= row.length - 1)) return;
            for(let j = x - i; j < (x - i) + ship.size; j++) {
                matrix.push([j, y]);
                if(row[y]) row[y].querySelectorAll('.cell')[j].classList.remove('hover');
            }
            return matrix;
        } else {
            if(ship.size > 2 && (y < i || y >= row.length - 1 || y%2 !== 0 && (y + i >= row.length)) || ship.size === 2 && y < (y < ship.size || y >= row.length - 1)) return;
            for(let j = y - i; j < (y - i) + ship.size; j++) {
                matrix.push([x, j]);
                if(row[j]) row[j].querySelectorAll('.cell')[x].classList.remove('hover');
            }
            return matrix;
        }

    }

    static create(x, y, board, ship, hor) {
        let row = board.querySelectorAll('.row');
        if(!ship) return;
        let i = Math.floor(ship.size/2);
        let matrix = [];
        if(hor) {
            if(ship.size > 2 && (x < i || x >= row.length - 1 || x%2 !== 0 && (x + i >= row.length)) || ship.size === 2 && x < (x < ship.size || x >= row.length - 1)) return;
            for(let j = x - i; j < (x - i) + ship.size; j++) {
                matrix.push([j, y]);
                if(row[y]) row[y].querySelectorAll('.cell')[j].classList.add('ship');
            }
        } else {
            if(ship.size > 2 && (y < i || y >= row.length - 1 || y%2 !== 0 && (y + i >= row.length)) || ship.size === 2 && y < (y < ship.size || y >= row.length - 1)) return;
            for(let j = y - i; j < (y - i) + ship.size; j++) {
                matrix.push([x, j]);
                if(row[j]) row[j].querySelectorAll('.cell')[x].classList.add('ship');
            }
        }

        return matrix;
    }
}