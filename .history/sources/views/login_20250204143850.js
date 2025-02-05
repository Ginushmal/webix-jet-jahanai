// import { JetView } from "webix-jet";

// export default class LoginView extends JetView {
//   config() {
//     return {
//       view: "form",
//       id: "loginForm",
//       width: 300,
//       elements: [
//         { view: "text", label: "Username", name: "username", required: true },
//         {
//           view: "text",
//           label: "Password",
//           type: "password",
//           name: "password",
//           required: true,
//         },
//         { view: "button", value: "Login", click: () => this.doLogin() },
//       ],
//     };
//   }

//   async doLogin() {
//     const formValues = this.$$("loginForm").getValues();
//     const auth = this.app.getService("auth");
//     const data = await auth.loginUser(formValues);

//     if (data && data.message) {
//       webix.message("Login successful");
//       this.app.show("/top/person");
//     } else {
//       webix.message({ type: "error", text: "Login failed" });
//     }
//   }
// }

import { JetView } from "webix-jet";

export default class LoginView extends JetView {
  config() {
    var loginForm = {
      view: "form",
      //   height: 300,
      //   width: 500,
      margin: 20,
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
    return {
      responsive: "hide",
      cols: [
        { width: window.innerWidth * 0.2 },

        { rows: [{}, loginForm, {}] },

        { width: window.innerWidth * 0.2 },
      ],
    };
  }

  doLogin() {
    const form = this.getRoot();
    const user = this.app.getService("user");

    if (form.validate()) {
      const data = form.getValues();
      user.login(data.login, data.pass);
      // .then(() => this.app.show("/top/person"))
      // .catch(() => webix.message({ type: "error", text: "Login failed" }));
    }
  }
}
