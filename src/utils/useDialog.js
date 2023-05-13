import { defineStore } from 'pinia';
export const useDialog = defineStore({
    id: 'refState',
    state: () => ({
        refs: [],
        views: []
    }),
    actions: {
        insert(id, view) {
            view.name = id;
            this.views.push(view);
        }
    }
});
