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
      .post(
        this.apiServer + "/api/login/",
        { username: user, password: pass },
        { withCredentials: true } // Ensure cookies are sent
      )
      .then((res) => {
        const csrfToken = res.headers["X-CSRFToken"]; // Get CSRF token from response header
        console.log("CSRF Token: ", csrfToken); // Log the token to verify it's working
        if (csrfToken) {
          localStorage.setItem("csrftoken", csrfToken); // Store CSRF token in localStorage
        }
        return res.json();
      })
      .then((data) => {
        if (data.message) {
          webix.storage.local.put("user", data.user); // Store user info if login is successful
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
        "X-CSRFToken": this.getCSRFToken(), // Ensure CSRF token is sent
        "Content-Type": "application/json",
      })
      .post(this.apiServer + "/api/status/", null, {})
      .then((res) => res.json());
  },

  getCSRFToken() {
    console.log("Cookiess :", document.cookie);
    const match = document.cookie.match(/csrftoken=([^;]+)/);
    return match ? match[1] : "";
  },
  getUser() {
    return webix.storage.local.get("user");
  },
};
