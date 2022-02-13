import { type as ttype, Context, DefinitionType } from "@colyseus/schema";

function createContext() {
    const context = new Context();
    let t: any = (definition: DefinitionType) => {
        return ttype(definition, context);
    }
    return t
}

export const type = createContext();
