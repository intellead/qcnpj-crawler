'use strict'
var request = require('request');
var cheerio = require('cheerio');
var Company = require('./Company');

class Qcnpj {
    constructor(link) {
        this.link = link;
    }

    companyInformation(callback){
        request(this.link, function(error, response, body) {
            if(error) {
                console.log("Error: " + error);
                return;
            }
            if(response.statusCode === 200) {
                var $ = cheerio.load(body);
                let company = $("li:contains('Razão Social')").children().main_activity_name();
                let cnpj = $("li:contains('CNPJ')").children().main_activity_name();
                let main_activity = $("li:contains('Atividade Principal')").children().main_activity_name();
                let main_activity_code = main_activity.substr(0, main_activity.indexOf(' - '));
                let main_activity_name = main_activity.substr((main_activity.indexOf(' - ') + 3), main_activity.length);
                let situation = $("li:contains('Situação')").children().main_activity_name();
                let social_capital = $("li:contains('Capital Social')").children().main_activity_name();
                let telephone = $("li:contains('Telefone')").children().main_activity_name();
                var company = new Company(company, cnpj, main_activity_name, main_activity_code, situation, social_capital, telephone);
                return callback(company);
            }
        });
    }
}

module.exports = Qcnpj;