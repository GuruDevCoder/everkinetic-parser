const fs = require('fs');
import {Fetcher} from './Fetcher';

import {PageNumberExtractor} from './extractors/PageNumberExtractor';
import {PageExtractor} from './extractors/PageExtractor';
import {ExerciseExtractor} from './extractors/ExerciseExtractor';
import {PhotosExtractor} from './extractors/PhotosExtractor';

import {PhotosDownloader} from './PhotosDownloader';

import {HomeDocumentFactory} from './factories/HomeDocumentFactory';
import {PageDocumentFactory} from './factories/PageDocumentFactory';
import {ExerciseDocumentFactory} from './factories/ExerciseDocumentFactory';

export class EverkineticParser {

    constructor() {
        this.fetcher = new Fetcher();
        this.homeDocumentFactory = new HomeDocumentFactory();
        this.pageDocumentFactory = new PageDocumentFactory();
        this.exerciseDocumentFactory = new ExerciseDocumentFactory();
    }

    crawl() {
        return this.getTotalPages()
            .then(totalPages => this.getPages(totalPages))
            .then(exerciseUrls => this.getExercises(exerciseUrls))
            .then(exercises => this.writeOutputToJSON(exercises))
            .then(exercises => this.parsePhotos(exercises))
            .then(exercises => this.downloadPhotos(exercises))

    }

    getTotalPages() {
        const pageNumberExtractor = new PageNumberExtractor(this.fetcher, this.homeDocumentFactory);
        return pageNumberExtractor.extract();
    }

    getPages(totalPages) {
        const pageExtractor = new PageExtractor(totalPages, this.fetcher, this.pageDocumentFactory);
        return pageExtractor.extract();
    }

    getExercises(exerciseUrls) {
        const exerciseExtractor = new ExerciseExtractor(exerciseUrls, this.fetcher, this.exerciseDocumentFactory);
        return exerciseExtractor.extract();
    }

    parsePhotos(photos) {
        return new PhotosExtractor(photos).extract();
    }

    downloadPhotos(photos) {
        return new PhotosDownloader(photos).download();
    }

    writeOutputToJSON(output) {
        const outputFilename = 'exercises-output.json';
        fs.writeFile(outputFilename, JSON.stringify(output, null, 4), err => {
            if (err) {
                console.log(err);
            } else {
                console.log(`JSON saved to ${outputFilename}`);
            }
        });

        return output;
    }
}
