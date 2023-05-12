export class ExerciseExtractor {

    constructor(exerciseUrls, fetcher, ExerciseDocumentFactory) {
        this.exerciseUrls = exerciseUrls;
        this.fetcher = fetcher;
        this.exerciseDocumentFactory = ExerciseDocumentFactory;
    }

    extract() {

        let exercisePromises = [];

        for (let i = 0; i < this.exerciseUrls.length; i++) {
            exercisePromises.push(this.fetcher.fetch(this.exerciseUrls[i])
                .then(output=>{
                    console.log(`fetch exercise ${this.exerciseUrls[i]}`);
                    return output;
                })
            );
        }
        return Promise.all(exercisePromises)
            .then((values) => {
                return values.map($ => this.exerciseDocumentFactory.get($).extract());
            });
    }

}