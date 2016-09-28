export class Interface {
    constructor(app) {
        this.app = app;
    }

    render(part) {
        this.app.innerHTML = part;
    }

    main() {
        return [
            '<div class="interface">',
            '<h1>Sea battle</h1>',
            '<hr>',
            '<div>',
                '<button id="create">Create game</button>',
            '</div>',
            '</div>'
        ].join('');
    }

    choice() {
        return [
            '<div class="interface">',
            '<h1>Sea battle</h1>',
            '<hr>',
            '<div>',
                'Сколько игроков?',
                '<input type="number" max="20" min="2" id="players">',
                '<button id="init">Init game</button>',
            '</div>',
            '</div>'
        ].join('');
    }

    wait(players) {
        let playersBlock = () => {
            let result = [];
            for(var i = 0; i<players;i++) {
                result.push('<div class="playersBlock">+</div>')
            }
            return result.join('');
        };
        return [
            '<div class="interface">',
            '<h1>Sea battle</h1>',
            '<hr>',
            '<div>',
                'Подождите, пока все займут свои места',
                '<div class="playersBlock__container">',
                    playersBlock(),
                '</div>',
                '<button id="start">Start game</button>',
            '</div>',
            '</div>'
        ].join('');
    }
    
    finish() {

    }
} 