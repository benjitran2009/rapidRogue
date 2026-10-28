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
}

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
        fill: (color: string|number) => void,
        text: (text:string, x:number, y:number) => void,
        textFont: (font: string) => void,
        CENTER: "CENTER",
    }
}

export const camera = window.camera;
export const createSprite = window.createSprite;
export const textAlign = window.textAlign;
export const CENTER = window.CENTER; 
export const textFont = window.textFont;
export const text = window.text;
export const fill = window.fill;

export {}