// preferencesModel.js
export const preferencesModel = {
  apiServer: this.config.apiServer,
  // Function to get preferences
  getPreferences: function () {
    return webix
      .ajax()
      .get(this.apiServer + "/api/preferences/")
      .then((response) => response.json())
      .catch((error) => {
        webix.message({ type: "error", text: "Failed to load preferences" });
        throw error;
      });
  },

  // Function to update preferences
  updatePreferences: function (data) {
    return webix
      .ajax()
      .put(this.apiServer + "/api/preferences/", data)
      .then((response) => response.json())
      .catch((error) => {
        webix.message({ type: "error", text: "Failed to update preferences" });
        throw error;
      });
  },
};
