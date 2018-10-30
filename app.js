// importa as configurações do servidor
var app = require('./config/server')
//parametriza a porta de escuta
var server = app.listen(80, function () {
    console.log('|Servidor Online|')
})

var io = require('socket.io').listen(server);

//app.set('nomeDaVar') seta variáveis globais que podem ser recuperadas com o método .get('nomeDaVar')
app.set('io', io);
io.on('connection', function (socket) {
    console.log('Usuário conectou');


    //monitora quando o usuário se desconecta do websocket
    //neste caso a página chat.ejs tem no final da página um script "var socket = io('http://localhost');"
    //que monitora as ações do usuário
    socket.on('disconnect', function () {
        console.log('Usuário desconectou');
    });
    socket.on('msgParaServidor', function (data) {

        // Dialogo
        socket.emit('msgParaCliente', {
            apelido: data.apelido,
            mensagem: data.mensagem
        });
        socket.broadcast.emit('msgParaCliente', {
            apelido: data.apelido,
            mensagem: data.mensagem
        });
        // Participantes
        if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {

            socket.emit('participantesParaCliente', {
                apelido: data.apelido
            });
            socket.broadcast.emit('participantesParaCliente', {
                apelido: data.apelido
            });
        }
    });
})