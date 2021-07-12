export class Book {
    constructor(
        public id              : String,
        public title           : String,
        public author          : String,
        public category        : String,
        public purpose         : String,
        public description     : String,
        public contactName     : String,
        public phone           : String,
        public city            : String,
        public created         : Date,
        public status          : String,
        public image1          : String,
        public ownerId         : String
    ){}
}