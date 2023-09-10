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
    return (section as DataType).items !== undefined;
}

// Define a type guard function for QuestionType
export function isQuestionType(section: ViewSection): section is QuestionType {
    return (section as QuestionType).content !== undefined;
}

// Define a type guard function for QuestionType
export function isNavList(section: ViewSection): section is NavList {
    return (section as NavList).content !== undefined;
}

// Define a type guard function for VComponent
export function isVComponent(section: ViewSection): section is VComponent {
    return (section as VComponent).content !== undefined;
    //return 'content' in section;
}

// Define a type guard function for VComponent
export function isComponent(section: ViewSection): section is Component {
    return (section as Component) !== undefined;
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

export function isActionString(value: any): value is ActionString {
    return value === 'submit' || value === 'filter'
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
    page?: ViewSection,
    class?: string
}

export class NavList {
    constructor(navList: NavList) {
        Object.assign(this, navList)
    }

    id!: string
    content!: NavLink[]
    navType!: TabType
    style?: {
        bordered?: boolean,
        dense?: boolean,
        dark?: boolean
    }
    class?: string
}

export type LayoutType = 'Grid' | 'Relative' | 'Vertical' | 'Horizontal'

export type DataContent = {
    icon?: string;
    img?: string;
    label: string;
    action?: Action
    horizontal?: boolean
    class?: string
}

export type DataItem = {
    content: DataContent[]
}

export type CardStyle = {
    bordered: boolean
    flat?: boolean
    squared?: boolean
    dark?: boolean
    actionsAlign: 'left' | 'right' | 'center' | 'between' | 'around' | 'evenly' | 'stretch'
}

export class DataType {
    constructor(data: DataType) {}
    id?: any;
    overlay?: string;
    items!: DataItem[]
    setHeader?: boolean;
    cardStyle?: CardStyle
    class?: string
    actions?: Action[]
    noCard?: boolean = false
}

export type ActionStyle = {
    type?: 'flat' | 'glossy' | 'push' | 'outline' | 'unelevated'
    shape?: 'round' | 'rounded' | 'square'
    dense?: boolean
    ripple?: boolean
    fab?: 'fab' | 'fab-mini'
    stack?: boolean
    stretch?: boolean
    align?: 'center' | 'right' | 'left' | 'around' | 'between' | 'evenly'
    noWrap?: boolean
    noCaps?: boolean
}

export type ActionState = {
    loading: boolean
    percentage: number
    darkPercentage?: boolean
    diasble?: boolean
}

export type ActionString = 'Submit' | 'Filter' | 'Route' | 'Modal'

export class Action {
    constructor(action: Action) {
        Object.assign(this, action)
    }
    name?: string
    type?: string
    label!: string
    icon?: string
    iconRight?: string
    args?: any
    event!: Function | string
    onResult!: Function[]
    onError!: Function[]
    style?: ActionStyle
    state?: ActionState
    class?: string
}

export class ActionGroup {
    constructor(actions: ActionGroup) {
        Object.assign(this, actions)
    }
    name?: string
    actions!: Action[]
    style?: ActionStyle
    state?: ActionState
    class?: string
}
    
export class Video {
    constructor(video: Video) {
        Object.assign(this, video)
    }
    private title!: string;
    private duration!: number;
    private url!: string;
    private isPlaying!: boolean;
    private publishedDate!: Date;
    private description!: string;
    private thumbnailUrl!: string;

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

export class Notification {}

export class Blog {}

export class Music {}

export class Product {}

export class Book {}

export class Picture {}

export class Comment {}

export class Text {}

export class Calendar {}

export class Table {}

export class Form {}

export class QuestionType {
    constructor(data: {
        title: string,
        index: number,
        content?: {
            question: string,
            inputType?: 'number' | 'search' | 'textarea' | 'time' | 'text' | 'password' | 'email' | 'tel' | 'file' | 'url' | 'date',
            component?: Component,
            answer: string,
            options?: any[],
            action?: Action,
            name: string,
            image?: string,
            icon?: string
        }[],
        icon?: string,
        description?: string,
        actions: Record<string, Action>
        meta?: any
    }) {
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
            })}
        }
        else {
            this.actions = data.actions
        }
        this.meta = data.meta;
    }
    title: string;
    index: number;
    content?: {
        question: string;
        inputType?: 'number' | 'search' | 'textarea' | 'time' | 'text' | 'password' | 'email' | 'tel' | 'file' | 'url' | 'date';
        component?: Component;
        answer: string;
        options?: any[];
        action?: Action;
        name: string;
        image?: string;
        icon?: string
    }[];
    icon?: string;
    description?: string;
    actions: Record<string, Action>
    meta?: any
}

export class FormType {
    constructor(name: string, submit: Action | ActionString, content: QuestionType[]) {
        this.name = name
        this.content = content
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
            }
        }
        else {
            this.actions = {submit}
        }
    }
    name: string
    actions: Record<string, Action>
    content: QuestionType[]
}

export type VComponent = {
    content: Component
    props?: any
}

export interface IView {
    heading?: string
    id: string
    layout: LayoutType
    sections: ViewSection[]
    icon?: string
    postion?: {y: number, x: number}
    size?: string
    viewport?: string
    children? : ViewSection[]
    class?: string
}

export type ViewSection = View | DataType |QuestionType | VComponent | Component | NavList

function insert(view: IView, ...content: ViewSection[]) {
    view.sections?.push(...content)
}

/*function get(view: IView, id: string) {
    let item = view.sections.find(item => { if(isType(item, View) || isType(item, PageView)) item.id === 2})
}*/

//Abstract class View
export class View implements IView {
    /*constructor() {
        if (this.constructor === View) {
            throw new Error("Can't instantiate abstract class!");
        }
    }*/
    constructor(view: View) {
        Object.assign(this, view);
    }
    heading?: string;
    sections: ViewSection[] = []
    icon?: string | undefined;
    postion?: { y: number; x: number; } | undefined;
    viewport?: string | undefined;
    id!: string
    layout!: LayoutType
    size!: string
    navType!: SecTionType | TabType

    insert? = (...content: ViewSection[]) => {
        insert(this, ...content)
    }
}

export class TabView extends View {
    constructor(view: View) {
        super(view)
    }

    sections: ViewSection[] = []
}

export class SectionView extends View {
    constructor(view: View) {
        super(view)
    }
    sections: ViewSection[] = []
}

export class PageView implements IView {
    constructor(view: IView) {
        Object.assign(this, view);
    }
    id!: string;
    layout!: LayoutType;
    sections: ViewSection[] = [];
    children: PageView[] = []
    /*insert(...content: ViewSection[]){
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
    }*/
    insert? = (...content: ViewSection[]) => {
        insert(this, ...content)
    }
}

export type SecTionType = 'top' | 'bottom' | 'left' | 'right' | 'center'

export type TabType ='top' | 'bottom' | 'left' | 'right'

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
}