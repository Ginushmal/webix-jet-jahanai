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
    return webix
      .ajax()
      .headers({
        "X-CSRFToken": this.getCSRFToken(), // Get CSRF token dynamically
        "Content-Type": "application/json",
      })
      .withCredentials(true) // Ensures cookies (sessionid) are sent
      .post(this.apiServer + "/api/status/")
      .then((res) => res.json());
  },
  getCSRFToken() {
    const match = document.cookie.match(/csrftoken=([^;]+)/);
    return match ? match[1] : "";
  },
  getUser() {
    return webix.storage.local.get("user");
  },
};
