const expect = require('chai').expect;
const mockery = require('mockery');

import {Fetcher} from '../../../../src/EverkineticParser/Fetcher';
import {PageDocumentFactory} from '../../../../src/EverkineticParser/factories/PageDocumentFactory';
import {PageExtractor} from '../../../../src/EverkineticParser/extractors/PageExtractor';

const setUpResolve = function (done) {

    mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true
    });

    mockery.registerMock('request-promise', function () {
        return Promise.resolve(`
            <article><h3><a href="fake-url-1" /></h3></article>
            <article><h3><a href="fake-url-2" /></h3></article>
            <article><h3><a href="fake-url-3" /></h3></article>
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

describe('PageExtractor', function(){


    describe('Resolve', function () {

        before(setUpResolve);

        after(tearDown);

        it('should return the correct links', function (done) {

            const rp = require('request-promise');
            const fetcher = new Fetcher(rp);
            const pageDocumentFactory = new PageDocumentFactory();
            const totalPages = 1;

            const pageExtractor = new PageExtractor(totalPages, fetcher, pageDocumentFactory);

            pageExtractor.extract()
                .then(output => {
                    expect(output).to.deep.equal([ 'fake-url-1', 'fake-url-2', 'fake-url-3' ]);
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

            const homeDocumentFactory = new PageDocumentFactory();
            const totalPages = 1;

            const pageExtractor = new PageExtractor(totalPages, fetcher, homeDocumentFactory);

            pageExtractor.extract()
                .catch(err => {
                    expect(err.statusCode).to.be.equal('xxx');
                    done();
                });

        });

    });

});