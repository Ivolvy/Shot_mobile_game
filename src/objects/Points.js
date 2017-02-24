class Points {

    constructor(game){
        this.totalNumberOfPoints = 0; //Total number of points for the user
        this.basePoints = 100; //BasePoints for each feeded panda
        this.pointMultiplier = 1; //Increase multiplier when we hit next stage with different pandas colors
    }


    static getTotalPoints(){
        return this.totalNumberOfPoints;
    }

    static increaseTotalPoints(){
        //Calculates total of points
        this.totalNumberOfPoints = this.basePoints*this.pointMultiplier;
    }

    static setPointMultiplier(param){
        this.pointMultiplier = param;
    }
}

export default Points;
