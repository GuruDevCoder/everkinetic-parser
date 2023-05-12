const expect = require('chai').expect;
const mockery = require('mockery');
const fs = require('fs');

import {Fetcher} from '../../../../src/EverkineticParser/Fetcher';
import {ExerciseDocumentFactory} from '../../../../src/EverkineticParser/factories/ExerciseDocumentFactory';
import {ExerciseExtractor} from '../../../../src/EverkineticParser/extractors/ExerciseExtractor';

const setUpResolve = function (done) {

    mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true
    });

    mockery.registerMock('request-promise', function () {
        // return Promise.resolve(`
        //     <article><h3><a href="fake-url-1" /></h3></article>
        //     <article><h3><a href="fake-url-2" /></h3></article>
        //     <article><h3><a href="fake-url-3" /></h3></article>
        // `);

        const response = fs.readFileSync(__dirname + '/data/ExercisePage.html', 'utf8');
        return Promise.resolve(response.trim());
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

describe('ExerciseExtractor', function () {

    describe('Resolve', function () {

        before(setUpResolve);

        after(tearDown);

        it('should return the correct links', function (done) {

            const rp = require('request-promise');
            const fetcher = new Fetcher(rp);
            const exerciseDocumentFactory = new ExerciseDocumentFactory();
            const exerciseUrls = ['fake-url-1', 'fake-url-2'];

            const exerciseExtractor = new ExerciseExtractor(exerciseUrls, fetcher, exerciseDocumentFactory);

            exerciseExtractor.extract()
                .then(output => {
                    console.log(output[0]);
                    expect(output).to.deep.equal(
                        [{
                            title: 'Exercise Title',
                            slug: 'exercise-title',
                            description: 'Exercise description',
                            taxonomies: {'': undefined, 'http:': ''},
                            steps: ['Step 1', 'Step 2'],
                            images: [ { url: 'medium-file-link-1', filename: 'exercise-title-0.png' },
                                { url: 'medium-file-link-1', filename: 'exercise-title-1.png' } ]
                        },
                            {
                                title: 'Exercise Title',
                                slug: 'exercise-title',
                                description: 'Exercise description',
                                taxonomies: {'': undefined, 'http:': ''},
                                steps: ['Step 1', 'Step 2'],
                                images: [ { url: 'medium-file-link-1', filename: 'exercise-title-0.png' },
                                    { url: 'medium-file-link-1', filename: 'exercise-title-1.png' } ]
                            }]
                    );
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
            const exerciseDocumentFactory = new ExerciseDocumentFactory();
            const exerciseUrls = ['fake-url-1', 'fake-url-2'];

            const exerciseExtractor = new ExerciseExtractor(exerciseUrls, fetcher, exerciseDocumentFactory);

            exerciseExtractor.extract()
                .catch(err => {
                    expect(err.statusCode).to.be.equal('xxx');
                    done();
                });

        });

    });

});