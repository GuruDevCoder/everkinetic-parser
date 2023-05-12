export class PageNumberExtractor {
    constructor(fetcher, HomeDocumentFactory) {
        this.fetcher = fetcher;
        this.homeDocumentFactory = HomeDocumentFactory;
    }

    extract() {
        return new Promise((resolve, reject) => {
            this.fetcher.fetch('http://db.everkinetic.com')
                .then(($) => {
                    const homeDocument = this.homeDocumentFactory.get($);
                    const totalPages = homeDocument.extract();
                    resolve(totalPages);
                })
                .catch((err) => { reject(err.statusCode); })
        });
    }
}