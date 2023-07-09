import { Component } from "vue"
import { Utility } from '@edifiles/services';

const util = new Utility()

export type DataType = {
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
}

export type Action = {
    name?: string,
    type?: string,
    label: string,
    icon?: string,
    event: string
}

export type QuestionType = {
    title: string,
    number: number,
    content: {
        question: string,
        inputType?: 'number' | 'search' | 'textarea' | 'time' | 'text' | 'password' | 'email' | 'tel' | 'file' | 'url' | 'date',
        component?: Component,
        answer: string,
        options?: any[],
        action?: Function,
        name: string
    }[],
    icon: string,
    description: string,
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
    params?: any,
    query?: any
}

export type LayoutType = 'Grid' | 'List' | 'Horizontal'

export type VComponent = Component & {
    content: Component,
    props?: any
}
export interface IView {
    heading?: string
    id: any
    layout: LayoutType
    navType: NavType
    sections?: DataType[] | QuestionType[] | View[] | VComponent[]
    size: number
    postion?: {y: number, x: number}
    viewport?: string

}
export class View implements IView {
    constructor(view: IView) {
        Object.assign(this, view);
    }
    insert(...content: DataType[] | QuestionType[] | View[] | VComponent[]){
        this.sections?.push(content)
    }
    heading?: string
    id: any
    layout!: LayoutType
    navType!: NavType
    sections?: DataType[] | QuestionType[] | View[] | VComponent[]
    size!: number
    postion?: {y: number, x: number}
    viewport?: string
}

export type NavType = 'x-nav' | 'x-section' | 'y-nav' | 'y-section'

export type DataSource = {
    name: string,
    content: DataType[] | DataSource[],
    data?: DataType,
    sections?: DataSource[],
    navType: NavType
}

export type Recommendation = 'popular' | 'latest' | 'recommended' | 'related'

export function isType<T>(obj:any): boolean {
    if(util.isType<T>(obj)){
        return true
    }
    return false
  }
  