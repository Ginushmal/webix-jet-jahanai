import { JetView } from "webix-jet";
import { preferencesModel } from "../models/preferencesModel";

export default class ThemeView extends JetView {
  config() {
    const theme_settings = {
      margin: 10,
      rows: [
        {
          view: "radio",
          name: "theme",
          label: "Theme",
          labelPosition: "top",
          //   value: "light",
          tooltip: "Select application theme",
          options: [
            { id: "light", value: "Light" },
            { id: "dark", value: "Dark" },
          ],
        },
        {
          view: "richselect",
          name: "font",
          localId: "font:combo",
          label: "Font Style",
          labelPosition: "top",
          placeholder: "Click to select",
          options: [
            { id: "default", value: "Default" },
            { id: "serif", value: "Serif" },
            { id: "sans-serif", value: "Sans-serif" },
          ],
          tooltip: (obj) => {
            return obj.value
              ? "Choose the font style for the application"
              : "<span class='notselected'>Not selected</span>";
          },
        },
        {
          view: "richselect",
          name: "layout",
          localId: "layout:combo",
          label: "Layout",
          labelPosition: "top",
          placeholder: "Click to select",
          options: [
            { id: "standard", value: "Standard" },
            { id: "compact", value: "Compact" },
            { id: "spacious", value: "Spacious" },
          ],
          tooltip: (obj) => {
            return obj.value
              ? "Select the application layout"
              : "<span class='notselected'>Not selected</span>";
          },
        },
      ],
    };

    const buttons = {
      margin: 10,
      cols: [
        {},
        {
          view: "button",
          value: "Reset",
          autowidth: true,
          click: () => {
            this.$$("form").clear();
          },
          tooltip: "Reset theme settings",
        },
        {
          view: "button",
          value: "Save",
          type: "form",
          autowidth: true,
          tooltip: "Save theme preferences",
          click: () => {
            if (this.$$("form").validate()) {
              webix.message("Theme settings saved!", "success");
            }
          },
        },
      ],
    };

    return {
      rows: [
        { template: "Theme Settings", type: "header" },
        {
          view: "form",
          localId: "form",
          padding: 24,
          rows: [theme_settings, {}, buttons],
        },
      ],
    };
  }

  init() {
    preferencesModel.getPreferences().then((prefData) => {
      this.$$("form").setValues({
        theme: prefData.theme || "dark",
        font: prefData.font || "default",
        layout: prefData.layout || "standard",
      });
    });
  }
}
