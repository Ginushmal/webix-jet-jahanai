// models/session.js
export const session = {
  apiServer: "", // Placeholder for apiServer URL

  // Initialize session with apiServer
  init(apiServer) {
    this.apiServer = apiServer;
  },
  login(user, pass) {
    return webix
      .ajax()
      .post("http://127.0.0.1:8000/api/login/", { user, pass })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          webix.storage.local.put("user", data.user);
        }
        return data;
      });
  },

  logout() {
    return webix
      .ajax()
      .post(this.apiServer + "/api/logout/")
      .then((res) => res.json())
      .then(() => {
        webix.storage.local.remove("user");
      });
  },

  status() {
    return webix
      .ajax()
      .post(this.apiServer + "/api/status/")
      .then((res) => res.json());
  },

  getUser() {
    return webix.storage.local.get("user");
  },
};
