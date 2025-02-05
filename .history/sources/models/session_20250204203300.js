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
      .post(this.apiServer + "/api/login/", { username: user, password: pass })
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
    return fetch(this.apiServer + "/api/status/", {
      method: "POST",
      credentials: "include", // Ensure cookies (sessionid, csrftoken) are sent
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": this.getCSRFToken(), // Send CSRF token
      },
    }).then((res) => res.json());
  },

  getCSRFToken() {
    return (
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken="))
        ?.split("=")[1] || ""
    );
  },

  getUser() {
    return webix.storage.local.get("user");
  },
};
