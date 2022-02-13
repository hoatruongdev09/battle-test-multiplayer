import { Room, Client } from "colyseus";
import { logger } from "../helpers/logger";
import { BattleRoomState } from "./schema/battle-room-state";
import { PlayerState } from "./schema/player-state";
import { NetworkCharacterState } from './schema/player-character'
import { Vector3 } from '../classes/Vector'
export class BattleRoom extends Room<BattleRoomState> {

  onCreate(options: any) {
    this.setState(new BattleRoomState());
    logger.info("Room is created")

    // this.setSimulationInterval((delta) => this.onUpdate(delta))

    this.onMessage("onPlayGame", (client, data) => this.onPlayerStartGame(client, client.id, data))

    this.onMessage("triggerAttackBegin", (client, data) => this.onPlayerAttackBegin(client.id, data))
    this.onMessage("triggerAttackHit", (client, data) => this.onPlayerAttackHit(client.id, data))
    this.onMessage("triggerAttackEnd", (client, data) => this.onPlayerAttackEnd(client.id, data))

    this.onMessage("playerTransformUpdate", (client, updateArray) => this.playerTransformUpdate(client.id, updateArray));

  }
  onPlayerAttackEnd(id: string, data: any): void {
    if (this.state.players.has(`${data[0]}`) === false || this.state.characters.has(`${data[0]}`) === false) {
      return
    }
    let player = this.state.players.get(data[0])
    if (!player.isJoined) { return; }
    logger.info("character attack end")
    let character = this.state.characters.get(data[0])
    character.isAttacking = false
  }
  onPlayerAttackHit(id: string, data: any): void {
    if (this.state.players.has(`${data[0]}`) === false || this.state.characters.has(`${data[0]}`) === false) {
      return
    }
    let player = this.state.players.get(data[0])
    if (!player.isJoined) { return; }
    let character = this.state.characters.get(data[0])
    let characterPosition = character.transform.getPosition()
    let characterDirection = character.transform.getDirection()
    let hitEntities = this.hitCharacterInRange(characterPosition, characterDirection, character.attackRange, character.characterRadius, character.attackWide, [id])
    if (hitEntities == null) { return }
    let deadIDs = new Array<string>()
    hitEntities.forEach(entity => {
      entity.currentHP -= character.currentAttackDamage
      if (entity.currentHP <= 0) {
        entity.isDead = true
        this.state.players.get(entity.ownerID).isJoined = false
        deadIDs.push(entity.ownerID)
      }
    });
    if (deadIDs.length != 0) {
      this.broadcast("onPlayerDie", deadIDs)
    }
    logger.info(`character attack hit: ${hitEntities.length}`)
  }
  private hitCharacterInRange(position: Vector3, faceDirect: Vector3, attackRange: number, minRange: number, angle: number, except: [string]): NetworkCharacterState[] {
    let list: NetworkCharacterState[] = new Array<NetworkCharacterState>()
    this.state.characters.forEach((value, key) => {
      if (!value.isDead && except.indexOf(key) == -1) {
        let direct: Vector3 = value.transform.getPosition().sub(position)
        logger.info(`direct: `, direct)
        let sqrDistance = direct.sqrMagnitude()
        if (this.checkIfInAttackRange(attackRange, sqrDistance, minRange)
          && this.checkIfInAttackAngle(angle, Vector3.angle(direct, faceDirect))) {
          list.push(value)
        }
      }
    })
    return list
  }
  private checkIfInAttackAngle(acceptAngle: number, abAngle: number): boolean {
    logger.info(`angle: ${acceptAngle} ${abAngle}`)
    return Math.abs(abAngle) <= Math.abs(acceptAngle);
  }
  private checkIfInAttackRange(acceptRange: number, abDistance: number, radiusB: number): boolean {

    if (abDistance < Math.pow(acceptRange + radiusB, 2)) { return true }
    return false
  }

  onPlayerAttackBegin(id: string, data: any): void {
    if (this.state.players.has(`${data[0]}`) === false || this.state.characters.has(`${data[0]}`) === false) {
      return
    }
    let player = this.state.players.get(data[0])
    if (!player.isJoined) { return; }
    logger.info("character attack begin")
    let character = this.state.characters.get(data[0])
    character.isAttacking = false
    this.broadcast("triggerAttackBegin", { id: id, data: data })
  }

  onPlayerStartGame(client: Client, id: string, data: any): void {
    if (this.state.players.has(`${data[0]}`) === false) {
      return;
    }
    let playerState = this.state.players.get(data[0])
    if (playerState.isJoined) { return }
    playerState.isJoined = true;
    let randomPosX = this.getRandom(-this.state.mapState.sizeX / 2, this.state.mapState.sizeX / 2)
    let randomPosZ = this.getRandom(-this.state.mapState.sizeY / 2, this.state.mapState.sizeY / 2)
    if (!this.state.characters.has(id)) {
      let character = new NetworkCharacterState(id, 0, 0.5, 0);
      character.name = data[1]
      this.state.characters.set(id, character);
      client.send("playerJoinedGame", id)
    } else {
      let character = this.state.characters.get(id)
      character.currentHP = 100
      character.isDead = false;
      this.broadcast("revivePlayer", id)
    }
  }
  playerTransformUpdate(clientID: string, data: any) {

    // Assumes that index 0 is going to be the sessionId of the user
    if (this.state.players.has(`${data[0]}`) === false || this.state.characters.has(`${data[0]}`) === false) {
      return;
    }
    let player = this.state.players.get(data[0])
    if (!player.isJoined) { return; }
    let transform = this.state.characters.get(data[0]).transform
    let startIndex = 1;

    for (let i = startIndex; i < data.length; i += 2) {
      const property = data[i];
      let updateValue = data[i + 1];
      if (property === "inc") {
        updateValue = data[i + 2]
      }
      (transform as any)[property] = updateValue;
    }

    this.state.players.get(data[0]).timestamp = parseFloat(this.state.serverTime.toString());
  }

  onJoin(client: Client, options: any) {
    console.log(client.id, "joined!");

    let player = new PlayerState().assign({
      id: client.id,
      timestamp: this.state.serverTime
    });

    this.state.players.set(client.id, player);
  }

  async onLeave(client: Client, consented: boolean) {
    console.log(client.id, "left!");
    try {
      if (consented) {
        throw new Error("consented leave!");
      }

      logger.info("let's wait for reconnection for client: " + client.id);
      const newClient = await this.allowReconnection(client, 3);
      logger.info("reconnected! client: " + newClient.id);

    } catch (e) {
      logger.info("disconnected! client: " + client.id);
      logger.silly(`*** Removing Networked User and Entity ${client.id} ***`);

      //remove user
      let playerLeft = this.state.players.get(client.id);
      if (playerLeft) {
        this.state.players.delete(client.id);
      }
      let characterLeft = this.state.characters.get(client.id)
      if (characterLeft) {
        this.state.characters.delete(client.id);
      }
    }
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

  getRandom(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

}
