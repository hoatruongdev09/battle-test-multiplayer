import { Schema, MapSchema } from "@colyseus/schema";
import { type } from "../../helpers/type-scheme";
import { PlayerState } from "./player-state";
import { MapRoomState } from './battle-room-map-state'

import { NetworkCharacterState } from './player-character'
export class BattleRoomState extends Schema {

  @type({ map: PlayerState }) players = new MapSchema<PlayerState>();
  @type({ map: NetworkCharacterState }) characters = new MapSchema<NetworkCharacterState>();
  @type(MapRoomState) mapState: MapRoomState = new MapRoomState(400, 400)
  @type("number") serverTime: number = 0.0;
}
