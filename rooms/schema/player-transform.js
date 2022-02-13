"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkTransform = void 0;
const schema_1 = require("@colyseus/schema");
const type_scheme_1 = require("../../helpers/type-scheme");
const Vector_1 = require("../../classes/Vector");
class NetworkTransform extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.pos_x = 0.0;
        this.pos_y = 0.0;
        this.pos_z = 0.0;
        this.rot_x = 0.0;
        this.rot_y = 0.0;
        this.rot_z = 0.0;
        this.rot_w = 0.0;
        this.direct_x = 0.0;
        this.direct_y = 0.0;
        this.direct_z = 0.0;
    }
    setPosition(posX, posY, posZ) {
        this.pos_x = posX;
        this.pos_y = posY;
        this.pos_z = posZ;
    }
    setRotation(rotX, rotY, rotZ, rotW) {
        this.rot_x = rotX;
        this.rot_y = rotY;
        this.rot_z = rotZ;
        this.rot_w = rotW;
    }
    setDirection(directX, directY, directZ) {
        this.direct_x = directX;
        this.direct_y = directY;
        this.direct_z = directZ;
    }
    getPosition() {
        return new Vector_1.Vector3(this.pos_x, this.pos_y, this.pos_z);
    }
    getDirection() {
        return new Vector_1.Vector3(this.direct_x, this.direct_y, this.direct_z);
    }
}
__decorate([
    type_scheme_1.type("number")
], NetworkTransform.prototype, "pos_x", void 0);
__decorate([
    type_scheme_1.type("number")
], NetworkTransform.prototype, "pos_y", void 0);
__decorate([
    type_scheme_1.type("number")
], NetworkTransform.prototype, "pos_z", void 0);
__decorate([
    type_scheme_1.type("number")
], NetworkTransform.prototype, "rot_x", void 0);
__decorate([
    type_scheme_1.type("number")
], NetworkTransform.prototype, "rot_y", void 0);
__decorate([
    type_scheme_1.type("number")
], NetworkTransform.prototype, "rot_z", void 0);
__decorate([
    type_scheme_1.type("number")
], NetworkTransform.prototype, "rot_w", void 0);
__decorate([
    type_scheme_1.type("number")
], NetworkTransform.prototype, "direct_x", void 0);
__decorate([
    type_scheme_1.type("number")
], NetworkTransform.prototype, "direct_y", void 0);
__decorate([
    type_scheme_1.type("number")
], NetworkTransform.prototype, "direct_z", void 0);
exports.NetworkTransform = NetworkTransform;
