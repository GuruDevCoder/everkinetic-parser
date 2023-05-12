export class ExerciseDocument {

    constructor($) {
        this.$ = $;
    }

    extract() {

        const exerciseObject = {};

        exerciseObject.title = this.getExerciseTitle();
        exerciseObject.slug = this.slugify(exerciseObject.title);
        exerciseObject.description = this.getExerciseDescription();
        exerciseObject.taxonomies = this.getExerciseTaxonomies();
        exerciseObject.steps = this.getExerciseSteps();
        exerciseObject.images = this.getExerciseImages(exerciseObject);

        return exerciseObject;
    }

    getExerciseTitle() {
        return this.$('.entry-title').find('a').text();
    }

    getExerciseDescription() {
        return this.$('.exercise-entry-content').children().first().text();
    }

    getExerciseTaxonomies() {
        const taxonomies = {};

        this.$('.exercise-taxonomies').find('a').each((index, element) => {
            const splitFields = this.$(element).attr('href').replace(`${this.url}/`, '').split('/');

            if (splitFields[0] === 'equipment') {
                if (Array.isArray(taxonomies[splitFields[0]])) {
                    taxonomies[splitFields[0]].push(splitFields[1]);
                } else {
                    taxonomies[splitFields[0]] = [splitFields[1]];
                }

            } else {
                taxonomies[splitFields[0]] = splitFields[1];
            }

        });

        return taxonomies;
    }

    getExerciseSteps() {

        let steps = [];

        this.$('.exercise-entry-content').find('ol').children().each((index, element) => {
            steps.push(this.$(element).text())
        });

        return steps;
    }

    getExerciseImages(exerciseObject) {

        const smallFormat = 0, mediumFormat = 1, largeFormat= 2; //some large images are not available while medium are

        let imageUrls = [];

        this.$('.download-exercise-images').children().eq(mediumFormat).find('a').each((index, element) => {

            imageUrls.push({
                url: this.$(element).attr('href'),
                filename: `${exerciseObject.slug}-${index}.png`
            });

        });

        return imageUrls;
    }

    slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }

}

export class ExerciseDocumentFactory {
    get($) {
        return new ExerciseDocument($);
    }
}