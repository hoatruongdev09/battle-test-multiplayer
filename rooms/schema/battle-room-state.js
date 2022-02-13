"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleRoomState = void 0;
const schema_1 = require("@colyseus/schema");
const type_scheme_1 = require("../../helpers/type-scheme");
const player_state_1 = require("./player-state");
const battle_room_map_state_1 = require("./battle-room-map-state");
const player_character_1 = require("./player-character");
class BattleRoomState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.players = new schema_1.MapSchema();
        this.characters = new schema_1.MapSchema();
        this.mapState = new battle_room_map_state_1.MapRoomState(400, 400);
        this.serverTime = 0.0;
    }
}
__decorate([
    type_scheme_1.type({ map: player_state_1.PlayerState })
], BattleRoomState.prototype, "players", void 0);
__decorate([
    type_scheme_1.type({ map: player_character_1.NetworkCharacterState })
], BattleRoomState.prototype, "characters", void 0);
__decorate([
    type_scheme_1.type(battle_room_map_state_1.MapRoomState)
], BattleRoomState.prototype, "mapState", void 0);
__decorate([
    type_scheme_1.type("number")
], BattleRoomState.prototype, "serverTime", void 0);
exports.BattleRoomState = BattleRoomState;
