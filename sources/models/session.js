// models/session.js
export const session = {
  apiServer: "", // to store the backend URL

  // Method to set the API server URL dynamically
  setApiServer(url) {
    this.apiServer = url;
  },
  login(user, pass) {
    return fetch(this.apiServer + "/api/login/", {
      method: "POST",
      body: JSON.stringify({ username: user, password: pass }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Ensure cookies are sent with the request
    })
      .then((res) => {
        // Log response headers to confirm if CSRF token is available
        console.log("Response Headers:", res.headers);

        // Get CSRF token from response headers
        const csrfToken = res.headers.get("X-CSRFToken");
        console.log("CSRF Token:", csrfToken);

        if (csrfToken) {
          localStorage.setItem("csrftoken", csrfToken); // Store CSRF token in localStorage
        }

        return res.json();
      })
      .then((data) => {
        if (data.message) {
          localStorage.setItem("user", JSON.stringify(data.user)); // Store user info if login is successful
        }
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  logout() {
    return webix
      .ajax()
      .headers({
        "X-CSRFToken": localStorage.getItem("csrftoken"),
        "Content-Type": "application/json",
      })
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
        "X-CSRFToken": localStorage.getItem("csrftoken"),
        "Content-Type": "application/json",
      })
      .post(this.apiServer + "/api/status/", null, {})
      .then((res) => res.json());
  },

  getUser() {
    return webix.storage.local.get("user");
  },
};
