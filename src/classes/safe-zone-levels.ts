export class SafeZoneLevel {
    nextSizePercent: number;
    timeHold: number;
    timeShrinkingToNextLevel: number;

    constructor(nextSizePercent: number, timeHold: number, timeShrinkingToNextLevel: number){
        this.nextSizePercent=nextSizePercent;
        this.timeHold=timeHold;
        this.timeShrinkingToNextLevel=timeShrinkingToNextLevel;
    }
}