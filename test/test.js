var server = require('../bin/www');
var expect = require('chai').expect;
var request = require('supertest');
var anapro_company_data = require('./anapro_company_data.json');

describe('/', function() {

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