var express = require('express');
var router = express.Router();
var url = require('url');
var Qcnpj = require('../src/Qcnpj');
var Google = require('../src/Google');

/* GET home page. */
router.get('/', function(req, res, next) {
    var params = url.parse(req.url, true).query;
    var companyName = params.companyName;
    if (companyName == '' || companyName == undefined) {
        return res.render('index', { title: 'qcnpj-crawler' });
    }
    var google = new Google(companyName);
    google.searchQcnpjLink(function(linkQcnpjDaEmpresa) {
        var qcnpj = new Qcnpj(linkQcnpjDaEmpresa);
        qcnpj.companyInformation(function(dadosDaEmpresa) {
            res.status(200).send(dadosDaEmpresa);
        });
    });

});

module.exports = router;