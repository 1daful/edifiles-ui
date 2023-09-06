export function isType(obj, classType) {
    return obj instanceof classType;
}
export function isView(section) {
    return section.insert !== undefined;
}
export function isDataType(section) {
    return section.items !== undefined;
}
export function isQuestionType(section) {
    return section.content !== undefined;
}
export function isNavList(section) {
    return section.content !== undefined;
}
export function isVComponent(section) {
    return section.content !== undefined;
}
export function isComponent(section) {
    return section !== undefined;
}
export function isIView(section) {
    return section.sections !== undefined;
}
function isSectionType(value) {
    return value === 'x-section' || value === 'y-section';
}
export function isTabType(value) {
    return value === 'x-tab' || value === 'y-tab';
}
export function isActionString(value) {
    return value === 'submit' || value === 'filter';
}
export class NavList {
    constructor(navList) {
        Object.assign(this, navList);
    }
    id;
    content;
    navType;
    style;
    class;
}
export class DataType {
    constructor(data) { }
    id;
    overlay;
    items;
    setHeader;
    cardStyle;
    class;
    actions;
    noCard = false;
}
export class Action {
    constructor(action) {
        Object.assign(this, action);
    }
    name;
    type;
    label;
    icon;
    iconRight;
    args;
    event;
    onResult;
    onError;
    style;
    state;
    class;
}
export class ActionGroup {
    constructor(actions) {
        Object.assign(this, actions);
    }
    name;
    actions;
    style;
    state;
    class;
}
export class Video {
    constructor(video) {
        Object.assign(this, video);
    }
    title;
    duration;
    url;
    isPlaying;
    publishedDate;
    description;
    thumbnailUrl;
    play() {
        if (!this.isPlaying) {
            console.log(`Playing ${this.title}`);
            this.isPlaying = true;
        }
    }
    pause() {
        if (this.isPlaying) {
            console.log(`Pausing ${this.title}`);
            this.isPlaying = false;
        }
    }
    stop() {
        if (this.isPlaying) {
            console.log(`Stopping ${this.title}`);
            this.isPlaying = false;
        }
    }
    getInfo() {
        return {
            title: this.title,
            duration: this.duration,
            url: this.url,
            publishedDate: this.publishedDate,
            description: this.description,
            thumbnailUrl: this.thumbnailUrl
        };
    }
}
export class Notification {
}
export class Blog {
}
export class Music {
}
export class Product {
}
export class Book {
}
export class Picture {
}
export class Comment {
}
export class Text {
}
export class Calendar {
}
export class Table {
}
export class Form {
}
export class QuestionType {
    constructor(data) {
        this.title = data.title;
        this.index = data.index;
        this.content = data.content;
        this.icon = data.icon;
        this.description = data.description;
        if (isActionString(data.actions)) {
            this.actions = {
                submit: new Action({
                    label: data.actions,
                    event: data.actions,
                    onResult: [],
                    onError: [],
                    args: [this.content],
                    icon: data.actions
                })
            };
        }
        else {
            this.actions = data.actions;
        }
        this.meta = data.meta;
    }
    title;
    index;
    content;
    icon;
    description;
    actions;
    meta;
}
export class FormType {
    constructor(name, submit, content) {
        this.name = name;
        this.content = content;
        if (isActionString(submit)) {
            this.actions = {
                submit: new Action({
                    label: submit,
                    event: submit,
                    args: [this.content],
                    icon: submit,
                    onResult: [],
                    onError: []
                })
            };
        }
        else {
            this.actions = { submit };
        }
    }
    name;
    actions;
    content;
}
function insert(view, ...content) {
    view.sections?.push(...content);
}
export class View {
    constructor(view) {
        Object.assign(this, view);
    }
    heading;
    sections = [];
    icon;
    postion;
    viewport;
    id;
    layout;
    size;
    navType;
    insert = (...content) => {
        insert(this, ...content);
    };
}
export class TabView extends View {
    constructor(view) {
        super(view);
    }
    sections = [];
}
export class SectionView extends View {
    constructor(view) {
        super(view);
    }
    sections = [];
}
export class PageView {
    constructor(view) {
        Object.assign(this, view);
    }
    id;
    layout;
    sections = [];
    children = [];
    insert = (...content) => {
        insert(this, ...content);
    };
}
export const Layout = {
    top: new View({
        id: 'top',
        layout: 'Grid',
        navType: 'top',
        sections: [],
        size: 'col-12'
    }),
    bottom: new View({
        id: 'bottom',
        layout: 'Grid',
        navType: 'bottom',
        sections: [],
        size: 'col-12'
    }),
    left: new View({
        id: 'left',
        layout: 'Grid',
        navType: 'left',
        sections: [],
        size: 'col-4'
    }),
    right: new View({
        id: 'right',
        layout: 'Grid',
        navType: 'right',
        sections: [],
        size: 'col-4'
    }),
    center: new View({
        id: 'center',
        layout: 'Grid',
        navType: 'center',
        sections: [],
        size: 'col-8'
    })
};
