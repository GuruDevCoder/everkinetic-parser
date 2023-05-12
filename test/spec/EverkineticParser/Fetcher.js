const expect = require('chai').expect;
const mockery = require('mockery');

import {Fetcher} from '../../../src/EverkineticParser/Fetcher';

const setUp = function(done){

    mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true
    });

    mockery.registerMock('request-promise', function () {
        return Promise.resolve('<div>Hey</div>');
    });

    done();
};

const tearDown = function(done){
    mockery.disable();
    mockery.deregisterAll();
    done();
};


describe('Fetcher', function () {

    beforeEach(setUp);

    afterEach(tearDown);

    it('should fetch a return a cheerio object', function (done) {

        const rp = require('request-promise');
        this.fetcher = new Fetcher(rp);

        this.fetcher.fetch('fake-url').then(function ($) {

            const cheerioObj = $('div');
            expect(cheerioObj.text()).to.be.equal('Hey');

            done();
        });

    })

});