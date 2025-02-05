import { JetView } from "webix-jet";

export default class LoginView extends JetView {
  config() {
    return {
      view: "form",
      width: 300,
      rows: [
        { view: "text", name: "login", label: "User Name" },
        { view: "text", type: "password", name: "pass", label: "Password" },
        {
          view: "button",
          value: "Login",
          click: () => {
            this.doLogin();
          },
          hotkey: "enter",
        },
      ],
      rules: {
        login: webix.rules.isNotEmpty,
        pass: webix.rules.isNotEmpty,
      },
    };
  }

  async doLogin() {
    const formValues = this.$$("loginForm").getValues();
    const auth = this.app.getService("auth");
    const data = await auth.loginUser(formValues);

    if (data && data.message) {
      webix.message("Login successful");
      this.app.show("/top/person");
    } else {
      webix.message({ type: "error", text: "Login failed" });
    }
  }
}
