'use strict'
var request = require('request');
var cheerio = require('cheerio');
var Empresa = require('../src/Empresa');


class Qcnpj {

    constructor(link) {
        this.link = link;
    }

    informacoesDaEmpresa(callback){
        request(this.link, function(error, response, body) {
            if(error) {
                console.log("Error: " + error);
                return;
            }
            if(response.statusCode === 200) {
                var $ = cheerio.load(body);
                let nome = $("li:contains('Razão Social')").children().text();
                let cnpj = $("li:contains('CNPJ')").children().text();
                let atividadePrincipal = $("li:contains('Atividade Principal')").children().text();
                let situacao = $("li:contains('Situação')").children().text();
                let capitalSocial = $("li:contains('Capital Social')").children().text();
                let telefone = $("li:contains('Telefone')").children().text();
                var empresa = new Empresa(nome, cnpj, atividadePrincipal, situacao, capitalSocial, telefone);
                return callback(empresa);
            }
        });
    }
}

module.exports = Qcnpj;