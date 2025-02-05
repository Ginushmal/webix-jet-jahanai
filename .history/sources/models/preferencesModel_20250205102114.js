// preferencesModel.js
export const preferencesModel = {
  apiServer: import.meta.env.VITE_API_SERVER, // to store the backend URL

  // Function to get account settings
  getAccountSettings: function () {
    return webix
      .ajax()
      .get(this.apiServer + "/api/account/")
      .then((response) => response.json())
      .catch((error) => {
        webix.message({
          type: "error",
          text: "Failed to load account settings",
        });
        throw error;
      });
  },

  // Function to update account settings
  updateAccountSettings: function (data) {
    return webix
      .ajax()
      .put(this.apiServer + "/api/account/", data)
      .then((response) => response.json())
      .catch((error) => {
        webix.message({
          type: "error",
          text: "Failed to update account settings",
        });
        throw error;
      });
  },

  // Function to get notification settings
  getNotificationSettings: function () {
    return webix
      .ajax()
      .get(this.apiServer + "/api/notifications/")
      .then((response) => response.json())
      .catch((error) => {
        webix.message({
          type: "error",
          text: "Failed to load notification settings",
        });
        throw error;
      });
  },

  // Function to update notification settings
  updateNotificationSettings: function (data) {
    return webix
      .ajax()
      .put(this.apiServer + "/api/notifications/", data)
      .then((response) => response.json())
      .catch((error) => {
        webix.message({
          type: "error",
          text: "Failed to update notification settings",
        });
        throw error;
      });
  },

  // Function to get theme settings
  getThemeSettings: function () {
    return webix
      .ajax()
      .get(this.apiServer + "/api/theme/")
      .then((response) => response.json())
      .catch((error) => {
        webix.message({ type: "error", text: "Failed to load theme settings" });
        throw error;
      });
  },

  // Function to update theme settings
  updateThemeSettings: function (data) {
    return webix
      .ajax()
      .put(this.apiServer + "/api/theme/", data)
      .then((response) => response.json())
      .catch((error) => {
        webix.message({
          type: "error",
          text: "Failed to update theme settings",
        });
        throw error;
      });
  },

  // Function to get privacy settings
  getPrivacySettings: function () {
    return webix
      .ajax()
      .get(this.apiServer + "/api/privacy/")
      .then((response) => response.json())
      .catch((error) => {
        webix.message({
          type: "error",
          text: "Failed to load privacy settings",
        });
        throw error;
      });
  },

  // Function to update privacy settings
  updatePrivacySettings: function (data) {
    return webix
      .ajax()
      .put(this.apiServer + "/api/privacy/", data)
      .then((response) => response.json())
      .catch((error) => {
        webix.message({
          type: "error",
          text: "Failed to update privacy settings",
        });
        throw error;
      });
  },
};
