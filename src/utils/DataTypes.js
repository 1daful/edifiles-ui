import { Action } from "./types";
export class ListStyle {
    constructor(listStyle) {
        Object.defineProperty(this, "bordered", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "dense", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "dark", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "padding", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.assign(this, listStyle);
    }
}
export class Menu {
    constructor() {
        Object.defineProperty(this, "header", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                reveal: true,
                bordered: false,
                elevated: true,
                class: "fixed-nav"
            }
        });
        Object.defineProperty(this, "toolBar", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                class: "justify-end"
            }
        });
        Object.defineProperty(this, "brand", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                class: ""
            }
        });
        Object.defineProperty(this, "hero", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                backgroundColor: ""
            }
        });
        Object.defineProperty(this, "listStyle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "closeBtn", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Action({
                name: "closeMenuBtn",
                icon: 'close',
                event: (drawerOpen) => { drawerOpen = !drawerOpen; },
                onResult: [],
                onError: [],
                style: {
                    size: "20px",
                    color: "red",
                    type: "flat",
                    shape: "round",
                    dense: true,
                },
                class: "lt-md"
            })
        });
        Object.defineProperty(this, "openBtn", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Action({
                name: "menuBtn",
                icon: 'menu',
                event: (drawerOpen) => { drawerOpen = !drawerOpen; },
                onResult: [],
                onError: [],
                style: {
                    size: "20px",
                    color: "primary",
                    type: "flat",
                    shape: "round",
                    dense: true,
                },
                class: "lt-md"
            })
        });
    }
}
