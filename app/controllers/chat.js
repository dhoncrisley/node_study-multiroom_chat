module.exports.iniciaChat = function(application, req, res){
    
    var dadosForm = req.body;
    req.assert('apelido', 'O apelido é obrigatório').notEmpty();
    req.assert('apelido', 'O apelido deve conter entre 3 e 15 caracteres').len(3,15);

    var erros = req.validationErrors();

    if(erros){
        res.render('index', {validacao: erros});
        return;
    }

    //recupera a variável global 'io' e "emit" uma mensagem
    application.get('io').emit('msg', dadosForm)
    console.log(dadosForm);
    res.render('chat');
}