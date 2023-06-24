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
    type: 'Horizontal',
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
                type: 'Grid',
                size: 1,
            }
        ),
        new Widget(
            'Footer',
        {
            type: 'Grid',
            size: 1,
            //content: [],
        }),
        new Widget(
            'SidebarLeft',
        {
            type: 'List',
            size: 1,
            //content: [],
            //views: [],
        }),
        new Widget(
            'SidebarRight',
        {
            type: 'Grid',
            size: 1,
            //content: [],
            //views: [],
        }),
        new Widget('Main', {
            type: 'Grid',
            size: 12
        })
] as Widget[]
    }),
    actions: {
        get(name: WidgetName){
            let widget = new View ({
                type: 'Horizontal',
                size: 0
            })
            this.widgets.forEach(widget => {
                if(widget.name === name) {
                    return widget
                }
            })
            return widget
        },
        insert(name: WidgetName, component?: VComponent, data?: DataType, view?: View) {
            this.widgets.forEach(widget => {
                if(widget.name === name) {
                    if(component) widget.components?.push(component)
                    else if(data) widget.data?.push(data)
                    else if(view) widget.views?.push(view)
                }
            });
        },
        alter(name: WidgetName, props: []) {
            this.widgets.forEach(widget => {
                if(widget.name === name) {

                }
            })
        },
        triggerEvent() {
            // ... event trigger logic ...
            this.$onAction('myEvent', payload => {
              // Handle the event
              console.log('Event triggered:', payload);
            });
          },
    }
})