const expect = require('chai').expect;
const mockery = require('mockery');

import {Fetcher} from '../../../../src/EverkineticParser/Fetcher';
import {HomeDocumentFactory} from '../../../../src/EverkineticParser/factories/HomeDocumentFactory';
import {PageNumberExtractor} from '../../../../src/EverkineticParser/extractors/PageNumberExtractor';

const setUpResolve = function (done) {

    mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true
    });

    mockery.registerMock('request-promise', function () {
        return Promise.resolve(`
            <span class="page-numbers current">1</span>
            <span class="page-numbers dots">…</span>
            <a class="page-numbers" href="http://db.everkinetic.com/page/25/">25</a>
            <a class="next page-numbers" href="http://db.everkinetic.com/page/2/">Next »</a>
        `);
    });

    done();
};

const setUpReject = function (done) {

    mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true
    });

    mockery.registerMock('request-promise', function () {
        return Promise.reject({
            statusCode: 'xxx'
        });
    });

    done();
};

const tearDown = function (done) {
    mockery.disable();
    mockery.deregisterAll();
    done();
};

describe('PageNumberExtractor', function(){


    describe('Resolve', function () {

        before(setUpResolve);

        after(tearDown);

        it('should return the correct number of pages', function (done) {

            const rp = require('request-promise');
            const fetcher = new Fetcher(rp);

            const homeDocumentFactory = new HomeDocumentFactory();

            const pageNumberExtractor = new PageNumberExtractor(fetcher, homeDocumentFactory);

            pageNumberExtractor.extract()
                .then(output => {
                    expect(output).to.be.equal(25);
                    done();
                });

        });

    });


    describe('Reject', function () {

        before(setUpReject);

        after(tearDown);

        it('should return an error', function (done) {

            const rp = require('request-promise');
            const fetcher = new Fetcher(rp);

            const homeDocumentFactory = new HomeDocumentFactory();

            const pageNumberExtractor = new PageNumberExtractor(fetcher, homeDocumentFactory);

            pageNumberExtractor.extract()
                .catch(err => {
                    expect(err).to.be.equal('xxx');
                    done();
                });

        });

    });

});