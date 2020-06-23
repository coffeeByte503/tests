import {
    createScreen,
    appendScreens
} from "./Screen.js";

import {
    Percentage
} from "./Maths.js";
import Engine from "./engine/Engine.js";
import LoadManager from "./loads/LoadManager.js";
import {
    launchFullScreen
} from "./Util.js"



async function main() {
    //launchFullScreen();
    window.removeEventListener("click", userInteraction);
    const audioCtx = new AudioContext();

    const graphics = new Engine.Graphics({
        bg: {
            url: "graphics/1.png",
            size: 145192
        }
    });

    const audio = new Engine.AudioControler({
        bg: {
            url: "audio/bg.mp3",
            size: 2452027
        }
    }, audioCtx);

    const loader = new LoadManager([audio, graphics]);
    loader.events.on("progress", (loaded, total) => {
        const progress = new Percentage(total).getPercent(loaded);
        window.progress.value = progress;
        window.percent.innerHTML = progress + "%";
    });

    await loader.load();

    document.body.appendChild(graphics.buffer["bg"]);

    audio.play("bg", true);


}
window.addEventListener("click", userInteraction);

function userInteraction() {
    main();
}