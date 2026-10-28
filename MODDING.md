# rapidRogue Modding Documentation (planned)

!!! All of this is planned may not be implemented as said

```js
// If you are in a environment that compiles to code.org, import the helper types and modules to make it easier
import { createMod, scopes, loadMod } from "@rapidRogue/modding";

// createMod(modConfig: {
//   name: string,
//   author: string,
//   version: string,
//   scopes?: scopes[], // Default scopes is [ALLOW_UNTRUSTED_CONTEXT_CODE_EXECUTION] as it has the most compatability but some users may not like that permission.

// })
let myEpicMod = createMod({
    name: "My epic mod!",
    author: "Foobar Incorporated",
    version: "1.0.0d",
});

loadMod(createMod); // The mod is added to a modloader queue that is again ran after gameload

myEpicMod.runInUntrustedContext("console.log('Hello, rapidRogue!');"); // This code is added to a queue that runs after gameload.
myEpicMod.requestScope(scopes.ALLOW_INSECURE_ASSET_DATA); // Same for this


// If you are coding is pure code.org script then:
// Import the modding sdk: (library-id)
window.rapidRogueModdingCbs = window.rapidRogueModdingCbs || [];
window.rapidRogueModdingCbs.push(function () {
    var myEpicMod = createMod({
        name: "My epic mod!",
        author: "Foobar Incorporated",
        version: "1.0.0d",
    });

    loadMod(createMod); // The mod is added to a modloader queue that is again ran after gameload

    myEpicMod.runInUntrustedContext("console.log('Hello, rapidRogue!');"); // This code is added to a queue that runs after gameload.
    myEpicMod.requestScope(scopes.ALLOW_INSECURE_ASSET_DATA); // Same for this
}); // This is ran after the sdk is fully loaded and ready! (different from gameload)


```
