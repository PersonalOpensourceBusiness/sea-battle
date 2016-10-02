var express = require('express');
var app = express();
var io = require('socket.io').listen(app.listen(process.env.PORT || 5000));
var ns = {
    fields: {},
    ready: [],
    length: 0,
    botMatrix: [
        [ [ 0, 0, 1, 0, 1, 0, 1, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0, 3, 0, 0 ], [ 0, 4, 0, 0, 3, 0, 0, 3, 0, 0 ], [ 0, 4, 0, 0, 3, 0, 0, 3, 0, 0 ], [ 0, 4, 0, 0, 3, 0, 0, 0, 0, 0 ], [ 0, 4, 0, 0, 0, 0, 0, 2, 0, 0 ], [ 0, 0, 0, 0, 2, 0, 0, 2, 0, 0 ], [ 0, 2, 0, 0, 2, 0, 0, 0, 0, 0 ], [ 0, 2, 0, 1, 0, 0, 0, 0, 0, 0 ] ],
        [ [ 4, 4, 4, 4, 0, 0, 1, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 2, 2, 0, 1, 0, 3, 3, 3 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 2, 2 ], [ 0, 2, 2, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0, 0, 3, 3, 3 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] ]
    ]
};
app.set('view engine', 'html');

app.get('/', function(req, res) {
    res.sendFile(__dirname, '/public');
});
app.use(express.static(__dirname + '/public'));
io.on('connection', function(socket) {
    socket.on('game:create', function(data) {
        ns.ready = [];
        ns.fields = {};
        socket.join('id' + data.id);
        socket.emit('create', {
            roomsID: Array.prototype.filter.call(Object.keys(socket.adapter.rooms), (item) => !item.indexOf('id')),
            rooms: socket.adapter.rooms,
            players: data.players
        });
        ns.playersCount = data.players;
    });
    socket.on('game:join', function() {
        io.emit('join', {
            roomsID: Array.prototype.filter.call(Object.keys(socket.adapter.rooms), (item) => !item.indexOf('id')),
            rooms: socket.adapter.rooms
        });

    });
    socket.on('game:connect', function(data) {
        socket.join(data);
        io.emit('connected', {
            roomsID: Array.prototype.filter.call(Object.keys(socket.adapter.rooms), (item) => !item.indexOf('id')),
            rooms: socket.adapter.rooms,
            playersCount: ns.playersCount
        });
        io.emit('step2', {
            rooms: socket.adapter.rooms[Array.prototype.filter.call(Object.keys(socket.adapter.rooms), (item) => !item.indexOf('id'))]
        });
        ns.length = socket.adapter.rooms[Array.prototype.filter.call(Object.keys(socket.adapter.rooms), (item) => !item.indexOf('id'))].length
    });

    socket.on('game:pushMatrix', function(data) {
        ns.fields[data.id] = data.matrix.matrix;
        console.log(data.id);
        io.emit('pushMatrix', ns.fields);
    });
    socket.on('game:pushBotMatrix', function(data) {
        ns.fields['bot'] = ns.botMatrix[data.matrix];
        console.log(ns.fields['bot']);
        io.emit('pushMatrix', ns.fields);
    });

    socket.on('game:ready', function(data) {
        ns.ready.push(data);
        if(ns.length === ns.ready.length) {
            io.emit('ready', Object.keys(ns.fields));
        }
    });

    socket.on('game:attack', function(data) {
        ns.ready = ns.ready.slice(1);
        io.emit('attack', {
            board: data.board,
            y: data.y,
            x: data.x,
            hit: ns.fields[data.board][data.y][data.x]
        });

        if(!ns.ready.length) {
            ns.ready = Object.keys(ns.fields);
            io.emit('move:ready');
        }
    })

});