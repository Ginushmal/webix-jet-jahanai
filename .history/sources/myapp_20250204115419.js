import "./styles/app.css";
import { JetApp, EmptyRouter, HashRouter, plugins } from "webix-jet";
import { AuthService } from "./services/auth.js";
import session from "./models/session";

// dynamic import of views
const modules = import.meta.glob("./views/**/*.js");
const views = (name) => modules[`./views/${name}.js`]().then((x) => x.default);

// locales, optional
const locales = import.meta.glob("./locales/*.js");
const words = (name) =>
  locales[`./locales/${name}.js`]().then((x) => x.default);

export default class MyApp extends JetApp {
  constructor(config) {
    const defaults = {
      id: import.meta.env.VITE_APPNAME,
      version: import.meta.env.VITE_VERSION,
      router: import.meta.env.VITE_BUILD_AS_MODULE ? EmptyRouter : HashRouter,
      debug: !import.meta.env.PROD,
      start: "/top/person",
      // set custom view loader, mandatory
      views,
    };

    super({ ...defaults, ...config });

    // locales plugin, optional
    this.use(plugins.Locale, {
      path: words,
      storage: this.webix.storage.session,
    });

    this.use(plugins.User, {
      model: session,
      ping: 30000, // Check the user status every 30 seconds
      afterLogin: "/preferences", // Redirect to preferences after login
      afterLogout: "/login", // Redirect to login after logout
    });

    // this.setService("auth", new AuthService());
  }

  urlChange(view, url) {
    const auth = this.getService("auth");

    if (!auth.isAuthenticated() && url !== "/login") {
      this.show("/login"); // Redirect if not logged in
    }
  }
}

if (!import.meta.env.VITE_BUILD_AS_MODULE) {
  webix.ready(() => new MyApp().render());
}
