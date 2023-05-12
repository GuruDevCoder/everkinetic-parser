export class PageExtractor {

    constructor(totalPages, fetcher, PageDocumentFactory) {
        this.totalPages = totalPages;
        this.fetcher = fetcher;
        this.pageDocumentFactory = PageDocumentFactory;
        this.url = 'http://db.everkinetic.com';
    }

    extract() {
        console.log('totalPages: ', this.totalPages);
        // this.totalPages = 3; //debug

        let pagePromises = [];
        for (let i = 1; i <= this.totalPages; i++) {
            pagePromises.push(this.fetcher.fetch(`${this.url}/page/${i}`).then(output => {
                console.log(`fetch page ${i}`)
                return output;
            }));
        }

        return Promise.all(pagePromises)
            .then((values) => {
                return values
                    .map($ => this.pageDocumentFactory.get($).extract())
                    .reduce((a, b) => a.concat(b), []);
            })
    }

}