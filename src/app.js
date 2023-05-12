import {EverkineticParser} from './EverkineticParser';

const everkineticParser = new EverkineticParser();

everkineticParser.crawl()
    .then(() => {
        console.log('terminated with success');
    })
    .catch(() => {
        console.log('terminated with errors');
    });
