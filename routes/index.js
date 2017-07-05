var express = require('express');
var router = express.Router();
var url = require('url');
var Qcnpj = require('../src/Qcnpj');
var Google = require('../src/Google');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('here');
    var params = url.parse(req.url, true).query;
    var nomeDaEmpresa = params.nomeDaEmpresa;
    console.log(nomeDaEmpresa);
    if (nomeDaEmpresa == '' || nomeDaEmpresa == undefined) {
        return res.render('index', { title: 'qcnpj-crawler' });
    }
    var google = new Google(nomeDaEmpresa);
    console.log('here2');
    google.searchQcnpjLink(function(linkQcnpjDaEmpresa) {
        console.log('here3');
        var qcnpj = new Qcnpj(linkQcnpjDaEmpresa);
        console.log('here4');
        qcnpj.informacoesDaEmpresa(function(dadosDaEmpresa) {
            console.log(dadosDaEmpresa);
            res.status(200).send(dadosDaEmpresa);
        });
    });

});

module.exports = router;