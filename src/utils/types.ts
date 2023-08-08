import { Component } from "vue"

export function isType<T>(obj: any, classType: new (...args: any[]) => T): obj is T {
    return obj instanceof classType;
}

// Define a type guard function for View
export function isView(section: ViewSection): section is View {
    return (section as View).insert !== undefined;
}

// Define a type guard function for DataType
export function isDataType(section: ViewSection): section is DataType {
    return (section as DataType).meta !== undefined;
}

// Define a type guard function for QuestionType
export function isQuestionType(section: ViewSection): section is QuestionType {
    return (section as QuestionType).content !== undefined;
}

// Define a type guard function for VComponent
export function isVComponent(section: ViewSection): section is VComponent {
    return (section as VComponent).content !== undefined;
}

// Define a type guard function for IView
export function isIView(section: any): section is IView {
    return (section as IView).sections !== undefined;
}

// Function to check if a value is a valid SecTionType
function isSectionType(value: string): value is SecTionType {
    return value === 'x-section' || value === 'y-section';
}

// Function to check if a value is a valid TabType
export function isTabType(value: string): value is TabType {
    return value === 'x-tab' || value === 'y-tab';
}

export type Filters = {
    index: string,
    options?: [],
    rangeList: {
        title: string
    }[],
    checks: {
        attribute: string,
        values: {
            label: string,
            iChecked?: string,
            iUndetermined?: string,
            iUnchecked?: string,
        }[]
    }[]
}


export type WidgetName = 'Header' | 'SidebarLeft' | 'SidebarRight' | 'Footer' | 'Main'

export type NavLink = {
    icon?: string,
    path: string,
    name: string,
    params?: any,
    query?: any,
    children?: NavLink[],
    page?: ViewSection
}

export type LayoutType = 'Grid' | 'Relative'

export type ScrollType = 'Vertical' | 'Horizontal'

export class DataType {
    constructor(data: {
        id?: any,
        img?: string,
        icon?: string,
        overlay?: string,
        meta: {
            title: string,
            description?: string,
            created: string,
            author: string,
        },
        actions: Action[],
        header?: {
            icon?: string,
            img?: string,
            label: string
        }[],
        setHeader: boolean
    }) {
        this.id = data.id;
        this.img = data.img;
        this.icon = data.icon;
        this.overlay = data.overlay;
        this.meta = data.meta;
        this.actions = data.actions;
        this.header = data.header;
        this.setHeader = data.setHeader;
    }
    id?: any;
    img?: string;
    icon?: string;
    overlay?: string;
    meta: {
        title: string;
        description?: string;
        created: string;
        author: string;
    };
    actions: Action[];
    header?: {
        icon?: string;
        img?: string;
        label: string;
    }[];
    setHeader: boolean;

}


export class Action {
    constructor(action: {label: string, event: string,} ) {
        this.label = action.label
        this.event = action.event
    }

    name?: string
    type?: string
    label: string
    icon?: string
    event: string
}

export class QuestionType {
    constructor(data: {
        title?: string,
        number?: number,
        content?: {
            question: string,
            inputType?: 'number' | 'search' | 'textarea' | 'time' | 'text' | 'password' | 'email' | 'tel' | 'file' | 'url' | 'date',
            component?: Component,
            answer: string,
            options?: any[],
            action?: Function,
            name: string
        }[],
        icon?: string,
        description?: string
    }) {
        this.title = data.title;
        this.number = data.number;
        this.content = data.content;
        this.icon = data.icon;
        this.description = data.description;
    }
    title?: string;
    number?: number;
    content?: {
        question: string;
        inputType?: 'number' | 'search' | 'textarea' | 'time' | 'text' | 'password' | 'email' | 'tel' | 'file' | 'url' | 'date';
        component?: Component;
        answer: string;
        options?: any[];
        action?: Function;
        name: string;
    }[];
    icon?: string;
    description?: string;
}

export class QuestionForm {
    constructor(name: string, content: QuestionType[]) {
        this.name = name,
        this.content = content
    }
    name: string
    content: QuestionType[]
}

export class VComponent {
    content: Component;
    props?: any;

    constructor(data: {
        content: Component,
        props?: any
    }) {
        this.content = data.content;
        this.props = data.props;
    }
}


export interface IView {
    heading?: string
    id: string
    layout: LayoutType
    sections: ViewSection[]
    navType: TabType | SecTionType
    icon?: string
    size: number
    postion?: {y: number, x: number}
    viewport?: string
    singleView?: Function
    getState?: () => {}
    prep?: Function
}

export type ViewSection = View | DataType |QuestionType | VComponent

export class View implements IView {
    constructor(view: IView) {
        Object.assign(this, view);
    }
    insert(...content: ViewSection[]){
        this.sections?.push(...content)
    }
    id!: string
    layout!: LayoutType
    sections!: ViewSection[]
    navType!: TabType | SecTionType
    size!: number
}

export class PageView implements IView {
    constructor(view: IView) {
        Object.assign(this, view);
    }
    insert(...content: ViewSection[]){
        content.forEach(element => {
            if(element instanceof View) {
                if(isSectionType(element.navType)) {
                    this.sections?.push(element)
                }
                if(isTabType(element.navType)) {
                    this.navMenus?.push(element)
                }
            }
        });
    }
    id!: string;
    layout!: LayoutType;
    sections!: ViewSection[];
    navMenus?: ViewSection[]
    navType!: TabType | SecTionType;
    icon?: string;
    size!: number;
}
export type SecTionType = 'x-section' | 'y-section'

export type TabType = 'x-tab' | 'y-tab'

export type DataSection = {
navType: string;
    name: string,
    content: DataType[] | DataSection[],
}

export type Recommendation = 'popular' | 'latest' | 'recommended' | 'related'

export interface Post {
    id: string;
    title: string;
    content: string;
    author: User;
    createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  posts: Post[];
}