// models/session.js
export const session = {
  login(user, pass) {
    const apiServer = webix.$$(this.app).config.apiServer; // Accessing the apiServer from config
    console.log(apiServer);
    return webix
      .ajax()
      .post(apiServer + "/api/login/", { user, pass }) // Use the full API URL
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          webix.storage.local.put("user", data.user);
        }
        return data;
      });
  },

  logout() {
    const apiServer = webix.$$(this.app).config.apiServer; // Accessing the apiServer from config
    return webix
      .ajax()
      .post(apiServer + "/api/logout/") // Use the full API URL
      .then((res) => res.json())
      .then(() => {
        webix.storage.local.remove("user");
      });
  },

  status() {
    const apiServer = webix.$$(this.app).config.apiServer; // Accessing the apiServer from config
    return webix
      .ajax()
      .post(apiServer + "/api/status/") // Use the full API URL
      .then((res) => res.json());
  },

  getUser() {
    return webix.storage.local.get("user");
  },
};
