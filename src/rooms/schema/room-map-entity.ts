import { Schema, MapSchema } from "@colyseus/schema";
import { type } from "../../helpers/type-scheme";
import { NetworkTransform } from "./player-transform";

export class MapEntity extends Schema {
    @type(NetworkTransform) transform: NetworkTransform = new NetworkTransform()
}