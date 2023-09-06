import { View } from './types';
import { defineStore } from 'pinia';
export class Widget extends View {
    constructor(name, view) {
        super(view);
        this.name = name;
    }
    name;
}
export const useWidgets = defineStore({
    id: 'refState',
    state: () => ({
        refs: [],
        widgets: [
            new Widget('Header', {
                id: 'Header',
                navType: 'top',
                layout: 'Grid',
                size: 12,
                sections: []
            }),
            new Widget('Footer', {
                id: 'Footer',
                navType: 'bottom',
                layout: 'Grid',
                size: 12,
                sections: []
            }),
            new Widget('SidebarLeft', {
                id: 'SidebarLeft',
                navType: 'left',
                layout: 'Grid',
                size: 1,
                sections: []
            }),
            new Widget('SidebarRight', {
                id: 'SidebarRight',
                navType: 'right',
                layout: 'Grid',
                size: 1,
                sections: []
            }),
            new Widget('Main', {
                id: 'Main',
                navType: 'center',
                layout: 'Grid',
                size: 12,
                sections: []
            })
        ]
    }),
    actions: {
        addRef(ref) {
            this.refs.push(ref);
        },
        get(name) {
            for (const widget of this.widgets) {
                if (widget.name === name) {
                    return widget;
                }
            }
        },
        insert(name, ...content) {
            this.widgets.forEach(widget => {
                if (widget.name === name) {
                    widget.sections.push(...content);
                    console.log('DONE', ...content);
                    console.log('WIDGET', widget);
                }
            });
        },
        alter(name, props) {
            this.widgets.forEach(widget => {
                if (widget.name === name) {
                }
            });
        }
    }
});
