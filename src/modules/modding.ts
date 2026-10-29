import { confirm } from "../env";

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
};

type rrMod = {
    createMod: (modOptions: modOptions) => Mod;
    installMod: (mod: Mod) => void;
    _installInternalMod: (mod: Mod) => void;
};

class Mod {
    constructor(modOptions: modOptions) {
        this.configuration = modOptions;
    }
    configuration: modOptions;
    // Init is ran during the gameInit phase
    init() {}
    // Start is ran after the game is initialized and ready to run mods
    start() {}
    // Stop is used incase of game crash and to restart all mods (as best as possible)
    stop() {}
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
                confirm(`[rrMod] Mod Installation
"${mod.configuration.name}" is attempting to be installed in your session. Would you like to continue installation of this mod?
Note: This mod may have full control of your game based on its permissions, only install it if you trust the author(s).`)
            ) {
                console.log(`Attempting to install mod ${mod.configuration.name}`);
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
    rrMod._installInternalMod(ExampleMod);

    console.log("\nModding SDK is now available!\nAccess through window.rrMod");
};
