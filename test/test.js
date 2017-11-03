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

var server = require('../bin/www');
var expect = require('chai').expect;
var request = require('supertest');
var anapro_company_data = require('./anapro_company_data.json');

describe('/', function() {

    this.timeout(15000);

    after(function () {
        server.close();
    });

    it('should return status code 422', function(done) {
        request(server)
            .get('/')
            .end(function(err, res) {
                expect(res.statusCode).to.equal(422);
                done();
            });
    });

    it('should return status code 200 with ANAPRO data', function(done) {
        request(server)
            .get('/?companyName=Anapro')
            .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                var actual = JSON.stringify(res.body);
                var expected = JSON.stringify(anapro_company_data);
                expect(actual).to.equal(expected);
                done();
            });
    });

});
