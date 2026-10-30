import { confirm } from "../env";
import { contextEval } from "./eval";
//import "core-js/actual/array/";
//import { Array } from "core-js/actual/array/virtual";
export let modList: { [modName: string]: modContext } = {};
// not letting modlist be changable except in this context
export const scopes = {
    NONE: -1337,
    TEST_SCOPE_NO_SIDE_EFFECTS: -1,
    ALLOW_UNTRUSTED_CONTEXT_CODE_EXECUTION: 0,
    ALLOW_RENDER_THREAD: 1,
    ALLOW_PLAYER: 2,
    ALLOW_ENEMY: 3,
    ALLOW_UI_HOOK: 4,
    READ_PLAYER_DATA: 5,
    READ_CLOUD_DATA: 6,
    WRITE_CLOUD_DATA: 7,
    ALLOW_ENV_HOOK: 8,
    ALLOW_ENV_READ: 9,
    WRITE_PLAYER_DATA: 10,
};

let reversedScopes = (() => {
    let obj = scopes as { [scope: string]: number };
    let rev: { [scopeId: number]: string } = {};
    Object.keys(obj).forEach((key: string) => {
        rev[obj[key] as number] = key as string;
    });
    return rev;
})(); // * scopes may become changable later?

type modOptions = {
    name: string;
    version: string;
    author: string;
    requires?: RegExp[];
    scopes?: number[];
    start?: (ctx: modContext) => void;
    stop?: (ctx: modContext) => void;
    init?: (ctx: modContext) => void;
};

type modContext = {
    executeUntrustedContextCode?: (code: string) => void;
    requestScope: (scope: number | number[]) => Promise<boolean>; // ! can use promise or hold thread?
};

type rrMod = {
    createMod: (modOptions: modOptions) => Mod;
    installMod: (mod: Mod) => void;
    _installInternalMod: (mod: Mod) => void;
};

class Mod {
    constructor(modOptions: modOptions) {
        this.configuration = modOptions;
        modOptions.init ? (this.init = modOptions.init) : void 0;
        modOptions.start ? (this.start = modOptions.start) : void 0;
        modOptions.stop ? (this.stop = modOptions.stop) : void 0;
    }
    configuration: modOptions;
    // Init is ran during the gameInit phase
    init: (ctx: modContext) => void = () => {};
    // Start is ran after the game is initialized and ready to run mods
    start: (ctx: modContext) => void = () => {};
    // Stop is used incase of game crash and to restart all mods (as best as possible)
    stop: (ctx: modContext) => void = () => {};
}

const createModContext: (mod: Mod) => modContext = (mod: Mod) => {
    let builtContext: modContext = {
        requestScope: (scope: number | number[]) => {
            // * requestScope -> promise<bool> -> user prompt -> yes = regenerate context & return it in resolve | no = reject promise
            var requestedScope: number[] =
                typeof scope === "number" ? [scope] : scope;
            return new Promise((resolve, reject) => {
                if (
                    confirm(`[rrMod] Mod requesting extra scopes
"${mod.configuration.name}" is attempting to request extra scopes in the environment. Would you like to approve this request?
Note: This mod will get extra control of your game based on its permissions, only accept it if you trust the author(s).

Requested Scopes: ${getScopes(requestedScope)}`)
                ) {
                }
            });
        },
    };

    if (
        (mod.configuration.scopes as number[]).includes(
            scopes.ALLOW_UNTRUSTED_CONTEXT_CODE_EXECUTION as number,
        )
    ) {
        console.log("ALLOW_UNTRUSTED_CONTEXT_CODE_EXECUTION");
        builtContext.executeUntrustedContextCode = (
            code: string,
        ) => {
            switch (typeof code) {
                case "string":
                    return contextEval(code);
                //break;
                default:
                    // throw new ModInitializationError()?
                    break;
            }
        };
    }
    return builtContext;
};

const getScopes: (scope: number[]) => string = (scopeArray: number[]) => {
    //const valuedScopes = Object.values(scopes);

    const mappedScopes = scopeArray.map((x) => reversedScopes[x]) as string[];
    console.log(mappedScopes);
    return "[" + mappedScopes.join(", ") + "]";
    //return "<not implemented>"
};


export type { rrMod };
export let initialize = () => {
    const rrMod = {
        createMod: (modOptions: modOptions) => {
            return new Mod(modOptions);
        },
        installMod: function (mod: Mod) {
            mod.configuration.scopes = mod.configuration.scopes || [
                scopes.NONE,
            ];
            console.log(`[rrMod]: installMod triggered!`);
            if (
                confirm(`[rrMod] Mod Installation Request
"${mod.configuration.name}" is attempting to be installed in your session. Would you like to continue installation of this mod?
Note: This mod may have full control of your game based on its permissions, only install it if you trust the author(s).

Requested Scopes: ${getScopes(mod.configuration.scopes)}`)
            ) {
                console.log(
                    `Attempting to install mod ${mod.configuration.name}`,
                );
                // target: user accepts -> hook into game?
                //if (!mod.configuration.scopes) mod.configuration.scopes = [];
                let context: modContext = createModContext(mod);

                mod.init(context);
                mod.start(context);
            } else {
                console.log(`Mod installation rejected by user.`);
            }
            // TODO: add scopes
            //return {};
        },
        _installInternalMod: (mod: Mod) => {
            console.log(`Installing internal mod "${mod.configuration.name}"...`);
        },
    };
    window.rrMod = rrMod;
    const ExampleMod = rrMod.createMod({
        name: "Example Mod",
        version: "0.0.0",
        author: "rapidRogue Contributors",
        requires: [/^@rapidRogue\/\d+\.\d+\.\d+(-\w+)?/gm, /^@sdk\/builtin?/gm], // supports any version of rapidRogue | @ is a reserved mod start for only rapidRogue cores @sdk / @rapidRogue
        scopes: [scopes.ALLOW_UNTRUSTED_CONTEXT_CODE_EXECUTION],
        init: (c) => {
            // scope should let it be defined
            (c.executeUntrustedContextCode as Function)(
                "console.log('Hello, World!')",
            );
        },
    });
    // the below mods are used only for mod requirements
    const rapidRogueMod = rrMod.createMod({
        name: "@rapidRogue",
        version: "v0.0.0-devel",
        author: "rapidRogue Contributors",
    });
    const rapidSdkMod = rrMod.createMod({
        name: "@sdk",
        version: "v0.0.0-devel",
        author: "rapidRogue Contributors",
    });

    rrMod.installMod(ExampleMod);
    rrMod._installInternalMod(rapidRogueMod);
    rrMod._installInternalMod(rapidSdkMod);

    console.log("\nModding SDK is now available!\nAccess through window.rrMod");
};
