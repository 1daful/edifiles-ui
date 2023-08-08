import { LocalStorage } from "quasar";
import { EAuth } from "@edifiles/services";
export const authGuard = async (to, from, next) => {
    const auth = new EAuth();
    if (await auth.getUser()) {
        next();
    }
    else {
        LocalStorage.set("url", to.path);
        next({
            name: "SignIn",
            path: "signin",
        });
    }
};
export const navGuard = async (t, from, next) => {
};
