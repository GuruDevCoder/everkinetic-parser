
const request = require('request');
const fs = require('fs');


export class PhotosDownloader {

    constructor(photos) {
        this.photos = photos;
        this.imagePath = './assets/exercises/images/';
        this.mkdirSyncRecursive(this.imagePath);
    }

    download() {

        const readFile = callback => {
            if (this.photos.length > 0) {
                let file = this.photos.shift(),
                    uri = file.url,
                    filename = this.imagePath+file.filename;
                console.log('Downloading exercise image ' + filename);

                request.head(uri, function (err, res, body) {

                    if (err || !res) {
                        console.log('no res', err);
                        return;
                    }

                    if (res.headers['content-length'] === 0 || res.headers['content-type'] !== 'image/png') {
                        console.log('no data for image', filename);
                        return;
                    }

                    request(uri).pipe(fs.createWriteStream(filename)).on('close', () => {

                        readFile(callback);
                    });

                });

            } else {
                callback();
            }
        };

        readFile(function () {
            console.log('There are no more exercise images to download');
        });
    }

    mkdirSyncRecursive(directory) {
        let path = directory.replace(/\/$/, '').split('/');

        for (let i = 1; i <= path.length; i++) {
            let segment = path.slice(0, i).join('/');
            !fs.existsSync(segment) ? fs.mkdirSync(segment) : null;
        }
    }
}