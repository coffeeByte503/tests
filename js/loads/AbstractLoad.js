import {
    getArrayBuffer
} from "./loadData.js";
import {
    EventEmitter
} from "../Util.js";
import {
    sum
} from "../Maths.js";

export default class AbstractLoad /*abstract*/ {
    constructor(src, ctx) {
        this.ctx = ctx;
        this.src = src;

        this.buffer = {};
        this.totalSize = 0;
        this.loaded = 0;
        this.events = new EventEmitter();

        for (let [key, value] of Object.entries(src)) {
            this.totalSize += value.size;
            value.loaded = 0;
        }

        this.events.on("progress", (src, loaded) => {
            src.loaded = loaded;
            this.updateState();
        })
    }

    async load() {
        const loads = [];
        const keys = [];
        let arrayBuffers = null;

        for (let [key, value] of Object.entries(this.src)) {
            loads.push(getArrayBuffer(value, this.events))
            keys.push(key);
        }
        arrayBuffers = await Promise.all(loads);

        //save
        arrayBuffers.forEach((buffer, i) => {
            this.buffer[keys[i]] = buffer;
        });
    }

    updateState() {
        this.loaded = sum(this.src, "loaded");
        this.events.emit("updateProgress", this.loaded, this.totalSize)
    }

    get(name) {
        return this.buffer[name];
    }

    decode() /*virtual*/ {}
}