import { Schema } from "@colyseus/schema";
import { type } from "../../helpers/type-scheme";

export class PlayerState extends Schema {
  @type("string") id: string = "id"
  @type("boolean") isJoined: boolean = false
  @type("number") timestamp: number = 0.0


}
