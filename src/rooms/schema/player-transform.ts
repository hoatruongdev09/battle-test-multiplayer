import { Schema } from "@colyseus/schema";
import { type } from "../../helpers/type-scheme";
import { Vector3 } from '../../classes/Vector'
export class NetworkTransform extends Schema {
  @type("number") pos_x: number = 0.0
  @type("number") pos_y: number = 0.0;
  @type("number") pos_z: number = 0.0;

  @type("number") rot_x: number = 0.0;
  @type("number") rot_y: number = 0.0;
  @type("number") rot_z: number = 0.0;
  @type("number") rot_w: number = 0.0;

  @type("number") direct_x: number = 0.0;
  @type("number") direct_y: number = 0.0;
  @type("number") direct_z: number = 0.0;

  setPosition(posX: number, posY: number, posZ: number) {
    this.pos_x = posX
    this.pos_y = posY
    this.pos_z = posZ
  }
  setRotation(rotX: number, rotY: number, rotZ: number, rotW: number) {
    this.rot_x = rotX
    this.rot_y = rotY
    this.rot_z = rotZ
    this.rot_w = rotW
  }

  setDirection(directX: number, directY: number, directZ: number) {
    this.direct_x = directX
    this.direct_y = directY
    this.direct_z = directZ
  }

  getPosition(): Vector3 {
    return new Vector3(this.pos_x, this.pos_y, this.pos_z)
  }
  getDirection(): Vector3 {
    return new Vector3(this.direct_x, this.direct_y, this.direct_z)
  }
}