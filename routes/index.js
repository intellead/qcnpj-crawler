var express = require('express');
var router = express.Router();
var url = require('url');
var Qcnpj = require('../src/Qcnpj');
var Google = require('../src/Google');

router.get('/', function(req, res, next) {
    var params = url.parse(req.url, true).query;
    var companyName = params.companyName;
    console.log("Company: " + companyName);
    if (companyName == undefined || companyName == '') {
        res.sendStatus(422);
        return res.render('index', { title: 'qcnpj-crawler' });
    }
    var google = new Google(companyName);
    google.searchQcnpjLink(function(statusCode, linkQcnpjDaEmpresa) {
        if (statusCode == 200) {
            var qcnpj = new Qcnpj(linkQcnpjDaEmpresa);
            qcnpj.companyInformation(function(statusCode, dadosDaEmpresa) {
                return res.status(statusCode).send(dadosDaEmpresa);
            });
        } else {
            return res.sendStatus(statusCode);
        }
    });

});

module.exports = router;