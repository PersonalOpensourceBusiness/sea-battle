export class Ship {
    constructor(size) {
        this.size = size;
        this.body = [];
    }
    
    shot() {

    }

    destroy() {

    }

    create() {
        for(let i = 0; i < this.size; i++) {
            this.body.push(this.size);
        }
        return this.body;
    }
}