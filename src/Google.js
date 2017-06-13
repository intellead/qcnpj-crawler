'use strict'
var request = require('request');
var cheerio = require('cheerio');
var Empresa = require('../src/Empresa');


class Google {

    constructor(nomeDaEmpresa) {
        this._nomeDaEmpresa = nomeDaEmpresa;
    }

    searchQcnpjLink(callback){
        var query = 'qcnpj ' + this._nomeDaEmpresa;
        var pageToVisit = "https://www.google.com/search?gws_rd=ssl&site=&source=hp&q="+query+"&oq="+query;
        request(pageToVisit, function(error, response, body) {
            if(error) {
                console.log("Error: " + error);
            }
            if(response.statusCode === 200) {
                var $ = cheerio.load(body);
                var googleHref = $("h3").find("a").attr("href");
                if (googleHref != undefined) {
                    var link1 = googleHref.substr(googleHref.indexOf("http"), googleHref.length);
                    var link = link1.substr(0, link1.indexOf("&sa="));
                    if (link.includes('qcnpj')) {
                        callback(link);
                    }
                }
            }
        });
    }
}

module.exports = Google;