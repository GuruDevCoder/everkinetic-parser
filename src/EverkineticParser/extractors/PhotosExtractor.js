export class PhotosExtractor{

    constructor(photos){
        this.photos = photos;
    }

    extract(){
        let flatPhotosArray = [];

        for (let i = 0; i < this.photos.length; i++) {
            for (let z = 0; z < this.photos[i].images.length; z++) {
                flatPhotosArray.push(this.photos[i].images[z]);
            }
        }

        return flatPhotosArray;
    }



}