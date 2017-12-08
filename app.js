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
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var url = require('url');
var Qcnpj = require('./src/Qcnpj');
var Google = require('./src/Google');
var request = require('request');
var securityUrl = process.env.SECURITY_URL || 'http://intellead-security:8080/auth';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
    request({ url: securityUrl + '/' + req.header('token')}, function(error, response, authBody) {
        if (response.statusCode != 200) return res.sendStatus(403);
        var params = url.parse(req.url, true).query;
        var companyName = params.companyName;
        console.log("Company: " + companyName);
        if (companyName == undefined || companyName == '') {
            return res.sendStatus(422);
        }
        var google = new Google(companyName);
        google.searchQcnpjLink(function (statusCode, linkQcnpjDaEmpresa) {
            if (statusCode == 200) {
                var qcnpj = new Qcnpj(linkQcnpjDaEmpresa);
                qcnpj.companyInformation(function (statusCode, dadosDaEmpresa) {
                    return res.status(statusCode).send(dadosDaEmpresa);
                });
            } else {
                return res.sendStatus(statusCode);
            }
        });
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
