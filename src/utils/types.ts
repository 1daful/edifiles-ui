import { Component } from "vue"
import { RouteLocation } from "vue-router"

export type DataType = {
    id: any,
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

export type NavLink = RouteLocation & {icon?: string}

export type LayoutType = 'Grid' | 'List' | 'Horizontal'

export type View = {
    name?: string,
    layouts: Layout[]
}

export type Layout = {
    heading?: string,
    id?: any,
    type: LayoutType,
    data?: DataType[],
    views?: View[],
    components?: Component[], //View name or object
    size: number,
    postion?: {y: number, x: number}
}