
import { LocalStorage } from "quasar";
import { EAuth } from "@edifiles/services";
export const authGuard = async (to: any, from: any, next: any) => {
    //const auth = new Auth();
    //const auth = new SupabaseAuth()
    const auth =new EAuth()
      if (await auth.getUser()) {
        next();
      }
      else {
        LocalStorage.set("url", to.path)
        next({
          name: "SignIn",
          path: "signin",
        })
      }
  }

  export const navGuard = async (t: any, from: any, next: any) => {
    
  }