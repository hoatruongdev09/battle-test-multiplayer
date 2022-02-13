"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector3 = exports.Vector2 = void 0;
const logger_1 = require("../helpers/logger");
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    sqrMagnitude() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    }
    magnitude() {
        return Math.sqrt(this.sqrMagnitude());
    }
    add(vector) {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }
    sub(vector) {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }
    static angle(v1, v2) {
        let cosAngle = v1.dot(v2) / (v1.magnitude() * v2.magnitude());
        return Math.acos(cosAngle);
    }
}
exports.Vector2 = Vector2;
class Vector3 extends Vector2 {
    constructor(x, y, z) {
        super(x, y);
        this.z = z;
    }
    sqrMagnitude() {
        return super.sqrMagnitude() + Math.pow(this.z, 2);
    }
    dot(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }
    add(vector) {
        return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }
    sub(vector) {
        return new Vector3(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }
    static angle(v1, v2) {
        let v1Dotv2 = v1.dot(v2);
        let v1Length = v1.magnitude();
        let v2Length = v2.magnitude();
        let cosAngle = v1.dot(v2) / (v1.magnitude() * v2.magnitude());
        logger_1.logger.info(` ${v1Dotv2}  ${v1Length}  ${v2Length}`);
        return Math.acos(cosAngle) * 180 / Math.PI;
    }
}
exports.Vector3 = Vector3;
