import { View, Layout } from './types';
import { defineStore } from 'pinia';

export const useDialog = defineStore({
    id: 'refState',
    state: () => ({
        refs: [] as String[],
        views: [] as View[]
    }),
    actions: {
        insert(id: string, view: View) {
            /*this.view.layouts.forEach(layout2 => {
                if(layout2.id === layout.id) {
                    layout2 = layout
                }
            });*/
            view.name = id
            this.views.push(view)
        }
    }
})