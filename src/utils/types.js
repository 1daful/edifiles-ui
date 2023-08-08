export function isType(obj, classType) {
    return obj instanceof classType;
}
export function isView(section) {
    return section.insert !== undefined;
}
export function isDataType(section) {
    return section.meta !== undefined;
}
export function isQuestionType(section) {
    return section.content !== undefined;
}
export function isVComponent(section) {
    return section.content !== undefined;
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
export class DataType {
    constructor(data) {
        this.id = data.id;
        this.img = data.img;
        this.icon = data.icon;
        this.overlay = data.overlay;
        this.meta = data.meta;
        this.actions = data.actions;
        this.header = data.header;
        this.setHeader = data.setHeader;
    }
    id;
    img;
    icon;
    overlay;
    meta;
    actions;
    header;
    setHeader;
}
export class Action {
    constructor(action) {
        this.label = action.label;
        this.event = action.event;
    }
    name;
    type;
    label;
    icon;
    event;
}
export class QuestionType {
    constructor(data) {
        this.title = data.title;
        this.number = data.number;
        this.content = data.content;
        this.icon = data.icon;
        this.description = data.description;
    }
    title;
    number;
    content;
    icon;
    description;
}
export class QuestionForm {
    constructor(name, content) {
        this.name = name,
            this.content = content;
    }
    name;
    content;
}
export class VComponent {
    content;
    props;
    constructor(data) {
        this.content = data.content;
        this.props = data.props;
    }
}
export class View {
    constructor(view) {
        Object.assign(this, view);
    }
    insert(...content) {
        this.sections?.push(...content);
    }
    id;
    layout;
    sections;
    navType;
    size;
}
export class PageView {
    constructor(view) {
        Object.assign(this, view);
    }
    insert(...content) {
        content.forEach(element => {
            if (element instanceof View) {
                if (isSectionType(element.navType)) {
                    this.sections?.push(element);
                }
                if (isTabType(element.navType)) {
                    this.navMenus?.push(element);
                }
            }
        });
    }
    id;
    layout;
    sections;
    navMenus;
    navType;
    icon;
    size;
}
