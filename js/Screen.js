import {
    CANVAS_WIDTH as CW,
    CANVAS_HEIGHT as CH
} from "./const.js";
import {
    Vector
} from "./Maths.js";



export function createScreen(w = CW, h = CH) {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;

    const context = canvas.getContext("2d");

    return {
        canvas,
        context,
        drawSelf: function (sprite, pos = new Vector, size = new Vector) {
            context.drawImage(sprite, ...pos, ...size)
        }
    };
}

export function appendScreens(screens, target) {
    screens.forEach(screen => {
        target.appendChild(screen.canvas);
    });
}