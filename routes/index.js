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
        return res.sendStatus(422);
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
