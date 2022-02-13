"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkCharacterState = void 0;
const schema_1 = require("@colyseus/schema");
const type_scheme_1 = require("../../helpers/type-scheme");
const player_transform_1 = require("./player-transform");
class NetworkCharacterState extends schema_1.Schema {
    constructor(ownerID, startPosX, startPosY, startPosZ) {
        super();
        this.ownerID = "id";
        this.name = "";
        this.isDead = false;
        this.characterRadius = 1.2;
        this.currentHP = 100;
        this.currentAttackDamage = 10;
        this.attackRange = 15;
        this.attackWide = 30;
        this.isAttacking = false;
        this.transform = new player_transform_1.NetworkTransform();
        this.ownerID = ownerID;
        this.isDead = false;
        this.transform = new player_transform_1.NetworkTransform();
        this.transform.setPosition(startPosX, startPosY, startPosZ);
        this.transform.setRotation(0, 0, 0, 0);
        this.characterRadius = 1.2;
    }
}
__decorate([
    type_scheme_1.type("string")
], NetworkCharacterState.prototype, "ownerID", void 0);
__decorate([
    type_scheme_1.type("string")
], NetworkCharacterState.prototype, "name", void 0);
__decorate([
    type_scheme_1.type("boolean")
], NetworkCharacterState.prototype, "isDead", void 0);
__decorate([
    type_scheme_1.type("number")
], NetworkCharacterState.prototype, "characterRadius", void 0);
__decorate([
    type_scheme_1.type("number")
], NetworkCharacterState.prototype, "currentHP", void 0);
__decorate([
    type_scheme_1.type("number")
], NetworkCharacterState.prototype, "currentAttackDamage", void 0);
__decorate([
    type_scheme_1.type("number")
], NetworkCharacterState.prototype, "attackRange", void 0);
__decorate([
    type_scheme_1.type("number")
], NetworkCharacterState.prototype, "attackWide", void 0);
__decorate([
    type_scheme_1.type("boolean")
], NetworkCharacterState.prototype, "isAttacking", void 0);
__decorate([
    type_scheme_1.type(player_transform_1.NetworkTransform)
], NetworkCharacterState.prototype, "transform", void 0);
exports.NetworkCharacterState = NetworkCharacterState;
