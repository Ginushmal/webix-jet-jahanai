// models/session.js
export const session = {
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

  getUser() {
    return webix.storage.local.get("user");
  },
};
