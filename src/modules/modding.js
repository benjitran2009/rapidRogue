

export default () => {
    class Mod {
        constructor(config) {
            
        }
        install() {}
        start() {}
        stop() {}
    }
    class ExampleMod extends Mod {
        
    }
    window.rrmod = {
        installMod: function (mod) {},
        mod: function (name) {}
    };
    console.log("Modding SDK is now available!\nAccess through window.rrmod");
};