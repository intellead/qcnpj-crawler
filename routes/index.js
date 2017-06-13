var express = require('express');
var router = express.Router();
var url = require('url');
var Qcnpj = require('../src/Qcnpj');
var Google = require('../src/Google');

/* GET home page. */
router.get('/', function(req, res, next) {
    var params = url.parse(req.url, true).query;
    var nomeDaEmpresa = params.nomeDaEmpresa;
    if (nomeDaEmpresa == '' || nomeDaEmpresa == undefined) {
        return res.render('index', { title: 'qcnpj-crawler' });
    }
    var google = new Google(nomeDaEmpresa);
    google.searchQcnpjLink(function(linkQcnpjDaEmpresa) {
        var qcnpj = new Qcnpj(linkQcnpjDaEmpresa);
        qcnpj.informacoesDaEmpresa(function(dadosDaEmpresa) {
            //res.jsonp(dadosDaEmpresa);
            res.status(200).send(dadosDaEmpresa);
        });
    });

});

module.exports = router;