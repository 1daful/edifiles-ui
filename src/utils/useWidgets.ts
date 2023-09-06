import { View, ViewSection, IView, WidgetName } from './types';
import { defineStore } from 'pinia';

export class Widget extends View {
    constructor(name: WidgetName, view: View) {
        super(view)
        this.name = name
    }
    name: WidgetName
    //content: DataType[] | Component[] | View[],
    //data?: DataType[],
    //components?: Component[],
    //views?: View[]
}

export const useWidgets = defineStore({
    id: 'refState',
    state: () => ({
        refs: [] as any[],
        widgets: [
            new Widget(
                'Header',
            //content: [],
            {
                id: 'Header',
                navType: 'top',
                layout: 'Grid',
                size: 12,
                sections: []
            }
        ),
        new Widget(
            'Footer',
        {
            id: 'Footer',
            navType: 'bottom',
            layout: 'Grid',
            size: 12,
            sections: []
            //content: [],
        }),
        new Widget(
            'SidebarLeft',
        {
            id: 'SidebarLeft',
            navType: 'left',
            layout: 'Grid',
            size: 1,
            sections: []
            //content: [],
            //views: [],
        }),
        new Widget(
            'SidebarRight',
        {
            id: 'SidebarRight',
            navType: 'right',
            layout: 'Grid',
            size: 1,
            sections: []
            //content: [],
            //views: [],
        }),
        new Widget('Main', {
            id: 'Main',
            navType: 'center',
            layout: 'Grid',
            size: 12,
            sections: []
        })
] as Widget[]
    }),
    actions: {
        addRef(ref: any) {
            this.refs.push(ref)
        },
        get(name: WidgetName) {
            for (const widget of this.widgets) {
                if (widget.name === name) {
                    return widget;
                }
            }
            
        },
        insert(name: WidgetName, ...content: ViewSection[]) {
            this.widgets.forEach(widget => {
                if (widget.name === name) {
                    widget.sections.push(...content);
                    console.log('DONE', ...content);
                    console.log('WIDGET', widget);
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
