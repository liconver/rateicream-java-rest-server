export class Rating {

    
    score?: number;
    review?: string;
    userId?: number;
    icecreamId?: number;

    constructor(review?: string, score?: number,userId?: number, icecreamId?: number) {
        this.review = review;
        this.score = score;
        this.userId =userId;
        this.icecreamId = icecreamId;
    }
}