import {
    EventEmitter
} from "../Util.js";
import {
    sum
} from "../Maths.js"

export default class LoadManager {
    constructor(loaders) {
        this.loaders = loaders;

        this.loaded = 0;
        this.events = new EventEmitter();

        this.totalSize = LoadManager.calcTotalSize(loaders)

        LoadManager.assignProgressEvent(loaders, () => this.updateState())

    }

    static assignProgressEvent(loaders, event) {
        loaders.forEach(loader => {
            loader.events.on("progress", event);
        })
    }

    static calcTotalSize(loaders) {
        let total = 0;
        loaders.forEach(loader => total += loader.totalSize);
        return total;
    }

    updateState() {
        this.loaded = sum(this.loaders, "loaded")
        this.events.emit("progress", this.loaded, this.totalSize)
    }

    async load() {
        for (let loader of this.loaders) {
            await loader.load();
        }

        for (let loader of this.loaders) {
            await loader.decode();
        }
    }

}