import { Schema } from "@colyseus/schema";
import { type } from "../../helpers/type-scheme";
import { NetworkTransform } from "./player-transform";

export class NetworkCharacterState extends Schema {
    @type("string") ownerID: string = "id"
    @type("string") name: string = ""
    @type("boolean") isDead: boolean = false
    @type("number") characterRadius: number = 1.2

    @type("number") currentHP: number = 100
    @type("number") currentAttackDamage: number = 10
    @type("number") attackRange: number = 15
    @type("number") attackWide: number = 30

    @type("boolean") isAttacking: boolean = false
    @type(NetworkTransform) transform: NetworkTransform = new NetworkTransform()

    constructor(ownerID: string, startPosX: number, startPosY: number, startPosZ: number) {
        super()
        this.ownerID = ownerID

        this.isDead = false

        this.transform = new NetworkTransform()
        this.transform.setPosition(startPosX, startPosY, startPosZ)
        this.transform.setRotation(0, 0, 0, 0)

        this.characterRadius = 1.2
    }
}