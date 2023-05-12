export class HomeDocument {

    constructor(cheerio) {
        this.$ = cheerio;
    }

    extract() {
        return Number(this.$('.page-numbers').not('.next').last().text());
    }

}

export class HomeDocumentFactory {
    get($) {
        return new HomeDocument($);
    }
}