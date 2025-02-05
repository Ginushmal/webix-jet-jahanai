// preferencesModel.js
export const preferencesModel = {
  // Function to get preferences
  getPreferences: function (apiServer) {
    return webix
      .ajax()
      .get(apiServer + "/api/preferences/")
      .then((response) => response.json())
      .catch((error) => {
        webix.message({ type: "error", text: "Failed to load preferences" });
        throw error;
      });
  },

  // Function to update preferences
  updatePreferences: function (apiServer, data) {
    return webix
      .ajax()
      .put(apiServer + "/api/preferences/", data)
      .then((response) => response.json())
      .catch((error) => {
        webix.message({ type: "error", text: "Failed to update preferences" });
        throw error;
      });
  },
};
