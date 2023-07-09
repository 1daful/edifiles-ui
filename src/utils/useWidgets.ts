import { VComponent, View, DataType, IView, WidgetName } from './types';
import { defineStore } from 'pinia';

export class Widget extends View {
    constructor(name: WidgetName, view: IView) {
        super(view)
        this.name = name
    }
    name: WidgetName
    //content: DataType[] | Component[] | View[],
    //data?: DataType[],
    //components?: Component[],
    //views?: View[]
}
let f: IView = {
    id: undefined,
    layout: 'Horizontal',
    navType: 'x-nav',
    size: 12
}
export const useWidgets = defineStore({
    id: 'refState',
    state: () => ({
        refs: [] as String[],
        widgets: [
            new Widget(
                'Header',
            //content: [],
            {
                id: 'Header',
                navType: 'x-nav',
                layout: 'Grid',
                size: 1,
            }
        ),
        new Widget(
            'Footer',
        {
            id: 'Footer',
            navType: 'x-nav',
            layout: 'Grid',
            size: 1,
            //content: [],
        }),
        new Widget(
            'SidebarLeft',
        {
            id: 'SidebarLeft',
            navType: 'y-nav',
            layout: 'List',
            size: 1,
            //content: [],
            //views: [],
        }),
        new Widget(
            'SidebarRight',
        {
            id: 'SidebarRight',
            navType: 'y-nav',
            layout: 'Grid',
            size: 1,
            //content: [],
            //views: [],
        }),
        new Widget('Main', {
            id: 'Main',
            navType: 'x-nav',
            layout: 'Grid',
            size: 12
        })
] as Widget[]
    }),
    actions: {
        get(name: WidgetName){
            let widget = new View ({
                id: '',
                navType: 'x-section',
                layout: 'Horizontal',
                size: 0
            })
            this.widgets.forEach(widget => {
                if(widget.name === name) {
                    return widget
                }
            })
            return widget
        },
        insert(name: WidgetName, content?: DataType[] | View[] | VComponent[]) {
            this.widgets.forEach(widget => {
                if(widget.name === name) {
                    if(content) widget.sections?.push(content)
                }
            });
        },
        alter(name: WidgetName, props: []) {
            this.widgets.forEach(widget => {
                if(widget.name === name) {

                }
            })
        }
    }
})

export { WidgetName };
