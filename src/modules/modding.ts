import { confirm } from "../env";
//import "core-js/actual/array/";
//import { Array } from "core-js/actual/array/virtual";
export const scopes = {
    ALLOW_UNTRUSTED_CONTEXT_CODE_EXECUTION: 0,
    TEST_SCOPE_NO_SIDE_EFFECTS: 1,
};

type modOptions = {
    name: string;
    version: string;
    author: string;
    requires?: RegExp[];
    scopes?: number[];
    start?: (ctx: modContext) => void,
    stop?: (ctx: modContext) => void,
    init?: (ctx: modContext) => void,
};

type modContext = {
    executeUntrustedContextCode?: (code: string | Function) => void,
}

type rrMod = {
    createMod: (modOptions: modOptions) => Mod;
    installMod: (mod: Mod) => void;
    _installInternalMod: (mod: Mod) => void;
};

class Mod {
    constructor(modOptions: modOptions) {
        this.configuration = modOptions;
        modOptions.init ? this.init = modOptions.init : void(0);
        modOptions.start ? this.start = modOptions.start : void(0);
        modOptions.stop ? this.stop = modOptions.stop : void(0);
    }
    configuration: modOptions;
    // Init is ran during the gameInit phase
    init: (ctx: modContext) => void = () => {};
    // Start is ran after the game is initialized and ready to run mods
    start: (ctx: modContext) => void = () => {};
    // Stop is used incase of game crash and to restart all mods (as best as possible)
    stop: (ctx: modContext) => void = () => {};
}

export type { rrMod };
export let initialize = () => {
    const rrMod = {
        createMod: (modOptions: modOptions) => {
            return new Mod(modOptions);
        },
        installMod: function (mod: Mod) {
            console.log(`[rrMod]: installMod triggered!`);
            if (
                confirm(`[rrMod] Mod Installation Request
"${mod.configuration.name}" is attempting to be installed in your session. Would you like to continue installation of this mod?
Note: This mod may have full control of your game based on its permissions, only install it if you trust the author(s).`)
            ) {
                console.log(`Attempting to install mod ${mod.configuration.name}`);
                // target: user accepts -> hook into game?
                if (!mod.configuration.scopes) mod.configuration.scopes = [];
                if (mod.configuration.scopes.includes(scopes.ALLOW_UNTRUSTED_CONTEXT_CODE_EXECUTION)) {
                    console.log("ALLOW_UNTRUSTED_CONTEXT_CODE_EXECUTION");

                }
            } else {
                console.log(`Mod installation rejected by user.`);
            }
            // TODO: add scopes
            //return {};
        },
        _installInternalMod: (mod: Mod) => {},
    };
    window.rrMod = rrMod;
    const ExampleMod = rrMod.createMod({
        name: "Example Mod",
        version: "0.0.0",
        author: "rapidRogue Contributors",
        requires: [/^@rapidRogue\/\d+\.\d+\.\d+(-\w+)?/gm, /^@sdk\/builtin?/gm], // supports any version of rapidRogue | @ is a reserved mod start for only rapidRogue cores @sdk / @rapidRogue
        scopes: [scopes.ALLOW_UNTRUSTED_CONTEXT_CODE_EXECUTION],
    });
    rrMod.installMod(ExampleMod);

    console.log("\nModding SDK is now available!\nAccess through window.rrMod");
};
