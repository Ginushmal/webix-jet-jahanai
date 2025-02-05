import { JetView } from "webix-jet";

export default class LoginView extends JetView {
  config() {
    return {
      view: "form",
      id: "loginForm",
      width: 300,
      elements: [
        { view: "text", label: "Username", name: "username", required: true },
        {
          view: "text",
          label: "Password",
          type: "password",
          name: "password",
          required: true,
        },
        { view: "button", value: "Login", click: () => this.doLogin() },
      ],
    };
  }

  async doLogin() {
    const formValues = this.$$("loginForm").getValues();
    const auth = this.app.getService("auth");
    const data = await auth.loginUser(formValues);

    if (data && data.message) {
      webix.message("Login successful");
      this.app.show("/preferences");
    } else {
      webix.message({ type: "error", text: "Login failed" });
    }
  }
}
