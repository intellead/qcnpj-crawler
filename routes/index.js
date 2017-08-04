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
        res.sendStatus(422);
        return res.render('index', { title: 'qcnpj-crawler' });
    }
    var google = new Google(companyName);
    google.searchQcnpjLink(function(statusCode, linkQcnpjDaEmpresa) {
        if (statusCode == 200) {
            var qcnpj = new Qcnpj(linkQcnpjDaEmpresa);
            qcnpj.companyInformation(function(statusCode, dadosDaEmpresa) {
                res.status(statusCode).send(dadosDaEmpresa);
            });
        }
    });

});

module.exports = router;