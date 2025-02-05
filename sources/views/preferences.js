import { JetView } from "webix-jet";

export default class PreferencesView extends JetView {
  config() {
    return {
      rows: [
        { template: "User Preferences", type: "header" },
        {
          cols: [
            {
              view: "list",
              id: "preferenceCategories",
              width: 200,
              select: true,
              data: [
                { id: "account", value: "Account Settings" },
                { id: "notifications", value: "Notification Settings" },
                { id: "theme", value: "Theme Settings" },
                { id: "privacy", value: "Privacy Settings" },
              ],
              on: {
                onAfterSelect: (id) => this.loadPreferences(id),
              },
            },
            { view: "form", id: "preferencesForm", elements: [] },
          ],
        },
      ],
    };
  }

  loadPreferences(category) {
    fetch(`http://127.0.0.1:8000/api/preferences/${category}/`, {
      credentials: "include", // Enables session authentication
    })
      .then((response) => response.json())
      .then((data) => {
        const form = this.$$("preferencesForm");
        form.clear();
        form.define("elements", this.createFormElements(data));
        form.refresh();
      });
  }

  createFormElements(data) {
    let elements = [];
    for (const key in data) {
      elements.push({ view: "text", label: key, name: key, value: data[key] });
    }
    elements.push({
      view: "button",
      value: "Save",
      click: () => this.savePreferences(),
    });
    return elements;
  }

  savePreferences() {
    const formValues = this.$$("preferencesForm").getValues();
    fetch("http://127.0.0.1:8000/api/preferences/update/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json())
      .then((data) => webix.message("Preferences updated successfully"))
      .catch((err) =>
        webix.message({ type: "error", text: "Failed to update preferences" })
      );
  }
}
