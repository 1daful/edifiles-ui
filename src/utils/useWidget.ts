import { Layout, SecTionType, SectionView, View } from "./types";
import { useWidgets } from "./useWidgets";

function getWidget (id: SecTionType, widgets: View[]) {
    let widget =  widgets.find(widget => widget.id === id);
    if (widget) {
        return widget
    }

    else {
        widget = new SectionView({
            id: JSON.stringify(id),
            layout: 'Grid',
            size: 12,
            navType: id,
            sections: []
        })
        widgets.push(widget)
        return widget
    }
}

export function getWidgetInstance(id: SecTionType, widgets?: View[]) {

    if (widgets) {
        return getWidget(id, widgets)
    }
    else {
        let widgets: Layout

        let widget = new SectionView({
            id: JSON.stringify(id),
            layout: 'Grid',
            size: 12,
            navType: id,
            sections: []
        })
        if(id === 'bottom' || id === 'center' || id === 'left' || id === 'right' || id === 'top') {
            widgets.splice(navType[id], 1, widget);
            return widgets
        }
        else {
            useWidgets().get(id)
        }
    }
}