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
    return {
      view: "layout", // Use layout as the container
      type: "space", // Use space to fill the remaining area
      width: 300, // Set width to make the box small
      rows: [
        {
          view: "form",
          width: 300, // Set width to make the box small
          height: 200, // Set height to make the box small
          borderless: true,
          align: "center", // Center the form horizontally
          margin: 30, // Add margin to create space around the form
          elements: [
            {
              view: "text",
              name: "login",
              label: "User Name",
              labelWidth: 100,
            },
            {
              view: "text",
              type: "password",
              name: "pass",
              label: "Password",
              labelWidth: 100,
            },
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
        },
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
