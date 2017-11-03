'use strict'

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


class Google {

    constructor(companyName) {
        this._companyName = companyName;
    }

    searchQcnpjLink(callback){
        var query = 'qcnpj ' + this._companyName;
        var pageToVisit = "https://www.google.com/search?gws_rd=ssl&site=&source=hp&q="+query+"&oq="+query;
        console.log("Page to visit: " + pageToVisit);
        request(pageToVisit, function(error, response, body) {
            if(error) {
                console.log("Error: " + error);
                return callback(response.statusCode);
            }
            if(response.statusCode === 200) {
                var $ = cheerio.load(body);
                $("h3").find("a").attr("href");
                var googleHref = '';
                var found = false;
                $( "h3" ).each(function( index ) {
                    let linkItem = $(this).find("a").attr("href");
                    if (!found & linkItem.includes('qcnpj.com.br')) {
                        googleHref = linkItem;
                        found = true;
                    }
                });
                if (googleHref != '' && googleHref != undefined) {
                    var link1 = googleHref.substr(googleHref.indexOf("http"), googleHref.length);
                    var link = link1.substr(0, link1.indexOf("&sa="));
                    console.log("Link: " + link);
                    if (link.includes('qcnpj')) {
                        return callback(200, link);
                    } else {
                        return callback(204);
                    }
                } else {
                    return callback(204);
                }
            } else {
                return callback(response.statusCode);
            }
        });
    }
}

module.exports = Google;
