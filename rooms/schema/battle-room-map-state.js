"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapRoomState = void 0;
const schema_1 = require("@colyseus/schema");
const type_scheme_1 = require("../../helpers/type-scheme");
const room_map_entity_1 = require("./room-map-entity");
class MapRoomState extends schema_1.Schema {
    constructor(sizeX, sizeY) {
        super();
        this.mapEntities = new schema_1.ArraySchema();
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }
}
__decorate([
    type_scheme_1.type("number")
], MapRoomState.prototype, "sizeX", void 0);
__decorate([
    type_scheme_1.type("number")
], MapRoomState.prototype, "sizeY", void 0);
__decorate([
    type_scheme_1.type([room_map_entity_1.MapEntity])
], MapRoomState.prototype, "mapEntities", void 0);
exports.MapRoomState = MapRoomState;
