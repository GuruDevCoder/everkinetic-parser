const rp = require('request-promise');
const cheerio = require('cheerio');

export class Fetcher {

    constructor(requestpromise = rp) {
        this.request = requestpromise;
    }

    fetch(url) {
        return this.request({
            uri: url,
            simple: true
        })
            .then(body => {
                return cheerio.load(body);
            });
    }
}