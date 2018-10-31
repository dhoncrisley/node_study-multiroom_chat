// importa os frameworks necessários
var express = require('express')
var validator = require('express-validator')
var consign = require('consign')
var bodyParser = require('body-parser')
var ejs = require('ejs');
var app = express();

//seta a engine de views
app.set('view engine', 'ejs');
//seta o caminho das views
app.set('views', './app/views');

//seta a pasta pública do projeto para não precisar dar ../../
// em assets e outros 
app.use(express.static('./app/public'));

//faz o parse do body encondado na url de request
app.use(bodyParser.urlencoded({
    extended: true
}));

//ativa o validator em requisições(req) para todo o projeto, ex: "req.assert('apelido', 'O campo apelido não pode ser vazio').notEmpty();""
app.use(validator());

//importa todas as classes de controllers, models e rotas para o APP
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

module.exports = app;