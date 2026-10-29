//import { inUpgradeScreen } from "./modules/upgrades";

// we become one with the typing scripting

type Sprite = {
    addAnimation: (name: string, animation: string) => void;
    setAnimation: (name: string) => void;
    scale: number;
    visible: boolean;
    x: number;
    y: number;
    depth: number;
    alpha: number;
    rotation: number;
    velocityX: number;
    velocityY: number;
    HP: number;
    maxHP: number;
    canBeHit: boolean;
    outofbounds: boolean;
    pointTo: (x: number, y: number) => void;
    collide: (spr: Sprite | Group) => boolean;
    displace: (spr: Sprite | Group) => boolean;
    isTouching: (spr: Sprite | Group) => boolean;
    tint: string;
    rotationSpeed: number;
    destroy: () => void;
    cleanUp: () => void;
    centered?: boolean;
    destructionImminent?: boolean,
    _checkTimeout?: any,
};

type World = {
    mouseX: number;
    mouseY: number;
    frameRate: number;
    frameCount: number;
};

type Group = Sprite[] & {
    add: (spr: Sprite) => Group;
    remove: (spr: Sprite) => {};
};

type RRBaseMod = {};

type RRMod = {
    installMod: (modName: string) => RRBaseMod;
    mod: RRBaseMod;
};

type Camera = {
    on: () => void;
    off: () => void;
    x: number;
    y: number;
    mouseX: number,
    mouseY: number,
};

declare global {
    interface Window {
        camera: Camera;
        createSprite: (
            x?: number,
            y?: number,
            width?: number,
            height?: number,
        ) => Sprite;
        textAlign: (str: string) => void;
        textSize: (size: number) => void;
        fill: (color: string | object) => void;
        text: (text: string, x: number, y: number) => void;
        textFont: (font: string) => void;
        CENTER: "CENTER";
        strokeWeight: (weight: number) => void;
        stroke: (color: string | object) => void;
        World: World;
        rgb: (r: number, g: number, b: number, a?: number) => {}; // TODO: implement rgb type
        rect: (x: number, y: number, width: number, height: number) => void;
        mouseWentDown: (button: string) => boolean;
        LEFT: "LEFT";
        RIGHT: "RIGHT";
        noStroke: () => void;
        inUpgradeScreen: boolean;
        getUserId: () => string;
        createGroup: () => Group;
        RRMod: RRMod;
        rapidRogueDraw: any,
        keyCode: number,
        won: boolean,
        pause: boolean,
        loadImage: (image: string) => string,
        keyDown: (key: string) => boolean,
        mouseDown: (btn: string) => boolean,
        line: (startX: number, startY: number, endX: number, endY: number) => void,
        background: (color: string) => void,
        drawSprites: () => void,
        keyWentDown: (key: string) => boolean,
        setWon: (value: boolean) => void
        setPause: (value: boolean) => void,
    }
}

export type { Sprite };
export const camera = window.camera;
export const createSprite = window.createSprite;
export const textAlign = window.textAlign;
export const CENTER = window.CENTER;
export const textFont = window.textFont;
export const text = window.text;
export const fill = window.fill;
export const textSize = window.textSize;
export const strokeWeight = window.strokeWeight;
export const stroke = window.stroke;
export const World = window.World;
export const rgb = window.rgb;
export const rect = window.rect;
export const mouseWentDown = window.mouseWentDown;
export const noStroke = window.noStroke;
export const LEFT = window.LEFT;
export const RIGHT = window.RIGHT;
//export const inUpgradeScreen = window.inUpgradeScreen;
export const getUserId = window.getUserId;
export const createGroup = window.createGroup;

// TODO: use this new system below
// export const inUpgradeScreen: boolean = window.inUpgradeScreen;
export const loadImage: (image: string) => string = window.loadImage;
export const keyDown: (key: string) => boolean = window.keyDown;
export const mouseDown: (btn: string) => boolean = window.mouseDown;
export const line: (startX: number, startY: number, endX: number, endY: number) => void = window.line;
export const background: (color: string) => void = window.background;
export const drawSprites: () => void = window.drawSprites;
export const keyCode: number = window.keyCode;
export const keyWentDown: (key: string) => boolean = window.keyWentDown;
export const won: boolean = window.won;
export const setWon: (value: boolean) => void = (value:boolean) => {
    window.won = value
};
export const pause: boolean = window.pause;
export const setPause: (value: boolean) => void = (value:boolean) => {
    window.pause = value
};
//export const 

export {};
