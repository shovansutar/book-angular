export class Request {
    constructor(
        public bookName            : String,
        public bookId              : String,
        public ownerId             : String,
        public requesterId         : String,
        public created             : Date,
        public approved            : Date,
        public delivered           : Date,
        public status              : String, 
        public ownerContact        : String,
        public requesterContact    : String,
        public message             : String
    ){}
}