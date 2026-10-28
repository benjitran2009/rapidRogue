import { inUpgradeScreen } from './modules/upgrades';
// Source - https://stackoverflow.com/a/71100012
// Posted by mohammad mohammadi nodhe, modified by community. See post 'Timeline' for change history
// Retrieved 2026-10-27, License - CC BY-SA 4.0

declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";

// we become one with the typing scripting

type Sprite = {
    addAnimation: (name:string,animation:string) => void,
    setAnimation: (name:string) => void,
    scale: number,
    visible: boolean,
    x: number,
    y: number,
    depth: number,
    alpha: number,
    rotation: number,
    velocityX: number,
    velocityY: number,
    HP: number,
    maxHP: number,
    canBeHit: boolean,
    outofbounds: boolean,
    pointTo: (x: number, y: number) => void,
    collide: (spr: Sprite|Group) => boolean,
    displace: (spr: Sprite|Group) => boolean,
    tint: string,
    rotationSpeed: number,
    destroy: () => void,
    cleanUp: () => void,

}

type World = {
    mouseX: number,
    mouseY: number,
    frameRate: number,
}

type Group = Sprite[] & {
    add: (spr: Sprite) => Group,
    remove: (spr: Sprite) => {},
};

declare global {
    interface Window {
        camera: {
            on: () => void,
            off: () => void,
            x: number,
            y: number,
        },
        createSprite: (x?: number, y?: number, width?: number, height?: number) => Sprite, 
        textAlign: (str: string) => void,
        textSize: (size:number) => void,
        fill: (color: string|object) => void,
        text: (text:string, x:number, y:number) => void,
        textFont: (font: string) => void,
        CENTER: "CENTER",
        strokeWeight: (weight: number) => void,
        stroke: (color: string|object) => void,
        World: World,
        rgb: (r: number, g: number, b: number, a?: number) => {}, // TODO: implement rgb type
        rect: (x: number, y: number, width: number, height: number) => void,
        mouseWentDown: (button: string) => boolean,
        LEFT: "LEFT",
        RIGHT: "RIGHT",
        noStroke: () => void,
        inUpgradeScreen : boolean,
        getUserId: () => string,
        createGroup: () => Group,
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
export const inUpgradeScreen = inUpgradeScreen;
export const getUserId = window.getUserId;
export const createGroup = window.createGroup;

export {}