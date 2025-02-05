// preferencesModel.js
export const preferencesModel = {
  apiServer: import.meta.env.VITE_API_SERVER, // to store the backend URL

  // Method to set the API server URL dynamically
  setApiServer(url) {
    this.apiServer = url;
  },
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
