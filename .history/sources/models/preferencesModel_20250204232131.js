// preferencesModel.js
export const preferencesModel = {
  apiServer: "", // to store the backend URL

  // Method to set the API server URL dynamically
  setApiServer(url) {
    this.apiServer = url;
  },
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
