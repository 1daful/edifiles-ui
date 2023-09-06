import { SectionView } from "./types";
import { useWidgets } from "./useWidgets";
function getWidget(id, widgets) {
    let widget = widgets.find(widget => widget.id === id);
    if (widget) {
        return widget;
    }
    else {
        widget = new SectionView({
            id: JSON.stringify(id),
            layout: 'Grid',
            size: 12,
            navType: id,
            sections: []
        });
        widgets.push(widget);
        return widget;
    }
}
export function getWidgetInstance(id, widgets) {
    if (widgets) {
        return getWidget(id, widgets);
    }
    else {
        let widgets;
        let widget = new SectionView({
            id: JSON.stringify(id),
            layout: 'Grid',
            size: 12,
            navType: id,
            sections: []
        });
        if (id === 'bottom' || id === 'center' || id === 'left' || id === 'right' || id === 'top') {
            widgets.splice(navType[id], 1, widget);
            return widgets;
        }
        else {
            useWidgets().get(id);
        }
    }
}
