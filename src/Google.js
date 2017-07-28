'use strict'
var request = require('request');
var cheerio = require('cheerio');
var Company = require('./Company');


class Google {

    constructor(companyName) {
        this._companyName = companyName;
    }

    searchQcnpjLink(callback){
        var query = 'qcnpj ' + this._companyName;
        var pageToVisit = "https://www.google.com/search?gws_rd=ssl&site=&source=hp&q="+query+"&oq="+query;
        console.log("pageToVisit: "+pageToVisit);
        request(pageToVisit, function(error, response, body) {
            if(error) {
                console.log("Error: " + error);
                return callback(response.statusCode);
            }
            if(response.statusCode === 200) {
                var $ = cheerio.load(body);
                $("h3").find("a").attr("href");
                var googleHref = '';
                var achou = false;
                //return the first link result of google search to the company name in qcnpj
                $( "h3" ).each(function( index ) {
                    let linkItem = $(this).find("a").attr("href");
                    if (!achou & linkItem.includes('qcnpj.com.br')) {
                        googleHref = linkItem;
                        console.log("googleHref: "+googleHref);
                        achou = true;
                    }
                });
                if (googleHref != '' && googleHref != undefined) {
                    var link1 = googleHref.substr(googleHref.indexOf("http"), googleHref.length);
                    console.log("link1: "+link1);
                    var link = link1.substr(0, link1.indexOf("&sa="));
                    console.log("link: "+link);
                    if (link.includes('qcnpj')) {
                        return callback(200, link);
                    }
                } else {
                    return callback(204);
                }
            }
        });
    }
}

module.exports = Google;