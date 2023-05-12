export class PageDocument {

    constructor($) {
        this.$ = $;
    }

    extract() {

        let pageExercisesUrls = [];

        this.$('article').each((i, el) => {
            pageExercisesUrls[i] = this.$(el).find('h3').find('a').attr('href');
        });

        return pageExercisesUrls;
    }

}

export class PageDocumentFactory {
    get($) {
        return new PageDocument($);
    }
}