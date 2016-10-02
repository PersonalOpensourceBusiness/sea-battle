    export class Ship {
        constructor(size) {
            this.size = size;
        }

        createShip() {
            let result = [];
            for(let i = 0; i < this.size; i++) {
                result.push(this.size);
            }
            return result;
        }
    }