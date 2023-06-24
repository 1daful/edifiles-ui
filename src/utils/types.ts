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
    id?: any
    type: LayoutType
    sections?: DataType[] | View[] | Component[]
    data?: DataType[]
    views?: View[]
    components?: Component[] //View name or object
    size: number
    postion?: {y: number, x: number}
    viewport?: string

}
export class View implements IView {
    constructor(view: IView) {
        Object.assign(this, view);
    }
    push(...content: DataType[] | View[] | VComponent[]){
        if(util.isType<VComponent>(content)) {
            this.components?.push(content)
        }
        else if(util.isType<DataType>(content)) {
            this.data?.push(content)
        }
        if(util.isType<View>(content)) {
            this.views?.push(content)
        }
    }
    heading?: string
    id?: any
    type!: LayoutType
    sections?: DataType[] | View[] | Component[]
    data?: DataType[]
    views?: View[]
    components?: VComponent[] //View name or object
    size!: number
    postion?: {y: number, x: number}
    viewport?: string
}

export type DataSource = {
    name: string,
    content: DataType[] | DataSource[],
    data?: DataType
    sections?: DataSource[],
    navType: 'x-nav' | 'x-section' | 'y-nav' | 'y-section'
}

export function isType<T>(obj:any): boolean {
    if(util.isType<T>(obj)){
        return true
    }
    return false
  }
  