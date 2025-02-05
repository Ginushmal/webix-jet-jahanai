// models/session.js
export const session = {
  apiServer: "", // to store the backend URL

  // Method to set the API server URL dynamically
  setApiServer(url) {
    this.apiServer = url;
  },
  login(user, pass) {
    return webix
      .ajax()
      .post("/api/login/", { user, pass })
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
      .post("/api/logout/")
      .then((res) => res.json())
      .then(() => {
        webix.storage.local.remove("user");
      });
  },

  status() {
    return webix
      .ajax()
      .post("/api/status/")
      .then((res) => res.json());
  },

  getUser() {
    return webix.storage.local.get("user");
  },
};
