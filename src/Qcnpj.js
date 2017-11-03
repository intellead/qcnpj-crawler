'use strict';

/*
 *
 * Copyright 2017 Softplan
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

var request = require('request');
var cheerio = require('cheerio');
var Company = require('./Company');

class Qcnpj {
    constructor(link) {
        this.link = link;
    }

    companyInformation(callback){
        request(this.link, function(error, response, body) {
            if(error || response.statusCode != 200) {
                if (error) {
                    console.log("Error: " + error);
                }
                return callback(response.statusCode);
            }
            if(response.statusCode === 200) {
                var $ = cheerio.load(body);
                let company_name = $("li:contains('Razão Social')").children().text();
                let cnpj = $("li:contains('CNPJ')").children().text();
                let main_activity = $("li:contains('Atividade Principal')").children().text();
                let main_activity_code = main_activity.substr(0, main_activity.indexOf(' - '));
                let main_activity_name = main_activity.substr((main_activity.indexOf(' - ') + 3), main_activity.length);
                let situation = $("li:contains('Situação')").children().text();
                let social_capital = $("li:contains('Capital Social')").children().text();
                let telephone = $("li:contains('Telefone')").children().text();
                var company = new Company(company_name, cnpj, main_activity_name, main_activity_code, situation, social_capital, telephone);
                console.log(company);
                return callback(response.statusCode, company);
            }
        });
    }
}

module.exports = Qcnpj;
