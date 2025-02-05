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

  doLogin() {
    const formValues = this.$$("loginForm").getValues();
    fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Enables session-based authentication
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data :", data);
        if (data.message) {
          webix.message("Login successful");
          this.app.show("/preferences");
        } else {
          webix.message({ type: "error", text: "Login failed" });
        }
      })
      .catch((err) => webix.message({ type: "error", text: "Server error" }));
  }
}
