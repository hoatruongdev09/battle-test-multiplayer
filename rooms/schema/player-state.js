"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerState = void 0;
const schema_1 = require("@colyseus/schema");
const type_scheme_1 = require("../../helpers/type-scheme");
class PlayerState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.id = "id";
        this.isJoined = false;
        this.timestamp = 0.0;
    }
}
__decorate([
    type_scheme_1.type("string")
], PlayerState.prototype, "id", void 0);
__decorate([
    type_scheme_1.type("boolean")
], PlayerState.prototype, "isJoined", void 0);
__decorate([
    type_scheme_1.type("number")
], PlayerState.prototype, "timestamp", void 0);
exports.PlayerState = PlayerState;
