
export const scopes = {
    ALLOW_UNTRUSTED_CONTEXT_CODE_EXECUTION: 0,
    TEST_SCOPE_NO_SIDE_EFFECTS: 1,
};

type modOptions = {
    name: string,
    version: string,
    author: string,
    requires?: RegExp[],
    scopes?: number[],
}

class Mod {
    constructor(modOptions: modOptions) {

    }
    // Init is ran during the gameInit phase
    init() { 

    }
    // Start is ran after the game is initialized and ready to run mods
    start() {

     }
    // Stop is used incase of game crash and to restart all mods (as best as possible)
    stop() { 

    }
}
export let initialize = () => {
    window.RRMod = {
        installMod: function (mod) {
            return {};
        },
        mod: function () {},
    };
    const ExampleMod = new Mod({
        name: "Example Mod",
        version: "0.0.0",
        author: "rapidRogue Contributors",
        requires: [/^@rapidRogue\/\d+\.\d+\.\d+(-\w+)?/gm, /^@sdk\/builtin?/gm], // supports any version of rapidRogue | @ is a reserved mod start
        scopes: [scopes.ALLOW_UNTRUSTED_CONTEXT_CODE_EXECUTION],
    });
    console.log("\nModding SDK is now available!\nAccess through window.RRMod");
};
