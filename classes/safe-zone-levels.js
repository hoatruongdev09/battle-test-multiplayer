"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeZoneLevel = void 0;
class SafeZoneLevel {
    constructor(nextSizePercent, timeHold, timeShrinkingToNextLevel) {
        this.nextSizePercent = nextSizePercent;
        this.timeHold = timeHold;
        this.timeShrinkingToNextLevel = timeShrinkingToNextLevel;
    }
}
exports.SafeZoneLevel = SafeZoneLevel;
