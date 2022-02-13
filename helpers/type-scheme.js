"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.type = void 0;
const schema_1 = require("@colyseus/schema");
function createContext() {
    const context = new schema_1.Context();
    let t = (definition) => {
        return schema_1.type(definition, context);
    };
    return t;
}
exports.type = createContext();
