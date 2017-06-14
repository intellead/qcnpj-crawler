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
                let atividade_principal = $("li:contains('Atividade Principal')").children().text();
                let atividade_principal_code = atividade_principal.substr(0, atividade_principal.indexOf(' - '));
                let atividade_principal_text = atividade_principal.substr((atividade_principal.indexOf(' - ') + 3), atividade_principal.length);
                let situacao = $("li:contains('Situação')").children().text();
                let capital_social = $("li:contains('Capital Social')").children().text();
                let telefone = $("li:contains('Telefone')").children().text();
                var empresa = new Empresa(nome, cnpj, atividade_principal_text, atividade_principal_code, situacao, capital_social, telefone);
                return callback(empresa);
            }
        });
    }
}

module.exports = Qcnpj;