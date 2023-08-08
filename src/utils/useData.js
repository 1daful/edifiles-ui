import { Recommender } from "@edifiles/services";
import { config } from "../../edifiles.config";
import mitt from "mitt";
import { defineStore } from "pinia";
import { useWidgets } from "./useWidgets";
const emitter = mitt();
const Main = useWidgets().get('Main');
export const useService = defineStore({
    id: "useData",
    state: () => ({
        services: config.template.services,
    }),
    actions: {
        async exec(name, action, ...args) {
            const service = this.services[name];
            if (service[name] instanceof Function) {
                service[action](args);
            }
            else if (service[name] instanceof Promise) {
                await service[action](args);
            }
            else {
                throw new Error('Invalid function');
            }
            emitter.emit(action, args);
        },
        getService(name) {
            return this.services[name];
        },
        register(viewId, ...actions) {
        }
    }
});
const recomm = new Recommender();
