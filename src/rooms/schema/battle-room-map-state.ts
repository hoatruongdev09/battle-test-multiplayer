import { Schema, ArraySchema } from "@colyseus/schema";
import { type } from "../../helpers/type-scheme";
import { MapEntity } from './room-map-entity'

export class MapRoomState extends Schema {
    @type("number") sizeX: number
    @type("number") sizeY: number

    @type([MapEntity]) mapEntities = new ArraySchema<MapEntity>()

    constructor(sizeX: number, sizeY: number) {
        super()
        this.sizeX = sizeX
        this.sizeY = sizeY
    }
}