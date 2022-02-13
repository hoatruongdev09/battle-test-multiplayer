"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleRoom = void 0;
const colyseus_1 = require("colyseus");
const logger_1 = require("../helpers/logger");
const battle_room_state_1 = require("./schema/battle-room-state");
const player_state_1 = require("./schema/player-state");
const player_character_1 = require("./schema/player-character");
const Vector_1 = require("../classes/Vector");
class BattleRoom extends colyseus_1.Room {
    onCreate(options) {
        this.setState(new battle_room_state_1.BattleRoomState());
        logger_1.logger.info("Room is created");
        // this.setSimulationInterval((delta) => this.onUpdate(delta))
        this.onMessage("onPlayGame", (client, data) => this.onPlayerStartGame(client, client.id, data));
        this.onMessage("triggerAttackBegin", (client, data) => this.onPlayerAttackBegin(client.id, data));
        this.onMessage("triggerAttackHit", (client, data) => this.onPlayerAttackHit(client.id, data));
        this.onMessage("triggerAttackEnd", (client, data) => this.onPlayerAttackEnd(client.id, data));
        this.onMessage("playerTransformUpdate", (client, updateArray) => this.playerTransformUpdate(client.id, updateArray));
    }
    onPlayerAttackEnd(id, data) {
        if (this.state.players.has(`${data[0]}`) === false || this.state.characters.has(`${data[0]}`) === false) {
            return;
        }
        let player = this.state.players.get(data[0]);
        if (!player.isJoined) {
            return;
        }
        logger_1.logger.info("character attack end");
        let character = this.state.characters.get(data[0]);
        character.isAttacking = false;
    }
    onPlayerAttackHit(id, data) {
        if (this.state.players.has(`${data[0]}`) === false || this.state.characters.has(`${data[0]}`) === false) {
            return;
        }
        let player = this.state.players.get(data[0]);
        if (!player.isJoined) {
            return;
        }
        let character = this.state.characters.get(data[0]);
        let characterPosition = character.transform.getPosition();
        let characterDirection = character.transform.getDirection();
        let hitEntities = this.hitCharacterInRange(characterPosition, characterDirection, character.attackRange, character.characterRadius, character.attackWide, [id]);
        if (hitEntities == null) {
            return;
        }
        let deadIDs = new Array();
        hitEntities.forEach(entity => {
            entity.currentHP -= character.currentAttackDamage;
            if (entity.currentHP <= 0) {
                entity.isDead = true;
                this.state.players.get(entity.ownerID).isJoined = false;
                deadIDs.push(entity.ownerID);
            }
        });
        if (deadIDs.length != 0) {
            this.broadcast("onPlayerDie", deadIDs);
        }
        logger_1.logger.info(`character attack hit: ${hitEntities.length}`);
    }
    hitCharacterInRange(position, faceDirect, attackRange, minRange, angle, except) {
        let list = new Array();
        this.state.characters.forEach((value, key) => {
            if (!value.isDead && except.indexOf(key) == -1) {
                let direct = value.transform.getPosition().sub(position);
                logger_1.logger.info(`direct: `, direct);
                let sqrDistance = direct.sqrMagnitude();
                if (this.checkIfInAttackRange(attackRange, sqrDistance, minRange)
                    && this.checkIfInAttackAngle(angle, Vector_1.Vector3.angle(direct, faceDirect))) {
                    list.push(value);
                }
            }
        });
        return list;
    }
    checkIfInAttackAngle(acceptAngle, abAngle) {
        logger_1.logger.info(`angle: ${acceptAngle} ${abAngle}`);
        return Math.abs(abAngle) <= Math.abs(acceptAngle);
    }
    checkIfInAttackRange(acceptRange, abDistance, radiusB) {
        if (abDistance < Math.pow(acceptRange + radiusB, 2)) {
            return true;
        }
        return false;
    }
    onPlayerAttackBegin(id, data) {
        if (this.state.players.has(`${data[0]}`) === false || this.state.characters.has(`${data[0]}`) === false) {
            return;
        }
        let player = this.state.players.get(data[0]);
        if (!player.isJoined) {
            return;
        }
        logger_1.logger.info("character attack begin");
        let character = this.state.characters.get(data[0]);
        character.isAttacking = false;
        this.broadcast("triggerAttackBegin", { id: id, data: data });
    }
    onPlayerStartGame(client, id, data) {
        if (this.state.players.has(`${data[0]}`) === false) {
            return;
        }
        let playerState = this.state.players.get(data[0]);
        if (playerState.isJoined) {
            return;
        }
        playerState.isJoined = true;
        let randomPosX = this.getRandom(-this.state.mapState.sizeX / 2, this.state.mapState.sizeX / 2);
        let randomPosZ = this.getRandom(-this.state.mapState.sizeY / 2, this.state.mapState.sizeY / 2);
        if (!this.state.characters.has(id)) {
            let character = new player_character_1.NetworkCharacterState(id, 0, 0.5, 0);
            character.name = data[1];
            this.state.characters.set(id, character);
            client.send("playerJoinedGame", id);
        }
        else {
            let character = this.state.characters.get(id);
            character.currentHP = 100;
            character.isDead = false;
            this.broadcast("revivePlayer", id);
        }
    }
    playerTransformUpdate(clientID, data) {
        // Assumes that index 0 is going to be the sessionId of the user
        if (this.state.players.has(`${data[0]}`) === false || this.state.characters.has(`${data[0]}`) === false) {
            return;
        }
        let player = this.state.players.get(data[0]);
        if (!player.isJoined) {
            return;
        }
        let transform = this.state.characters.get(data[0]).transform;
        let startIndex = 1;
        for (let i = startIndex; i < data.length; i += 2) {
            const property = data[i];
            let updateValue = data[i + 1];
            if (property === "inc") {
                updateValue = data[i + 2];
            }
            transform[property] = updateValue;
        }
        this.state.players.get(data[0]).timestamp = parseFloat(this.state.serverTime.toString());
    }
    onJoin(client, options) {
        console.log(client.id, "joined!");
        let player = new player_state_1.PlayerState().assign({
            id: client.id,
            timestamp: this.state.serverTime
        });
        this.state.players.set(client.id, player);
    }
    onLeave(client, consented) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(client.id, "left!");
            try {
                if (consented) {
                    throw new Error("consented leave!");
                }
                logger_1.logger.info("let's wait for reconnection for client: " + client.id);
                const newClient = yield this.allowReconnection(client, 3);
                logger_1.logger.info("reconnected! client: " + newClient.id);
            }
            catch (e) {
                logger_1.logger.info("disconnected! client: " + client.id);
                logger_1.logger.silly(`*** Removing Networked User and Entity ${client.id} ***`);
                //remove user
                let playerLeft = this.state.players.get(client.id);
                if (playerLeft) {
                    this.state.players.delete(client.id);
                }
                let characterLeft = this.state.characters.get(client.id);
                if (characterLeft) {
                    this.state.characters.delete(client.id);
                }
            }
        });
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
}
exports.BattleRoom = BattleRoom;
