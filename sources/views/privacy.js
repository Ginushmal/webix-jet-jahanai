import { JetView } from "webix-jet";
import { preferencesModel } from "../models/preferencesModel";

export default class PrivacyView extends JetView {
  config() {
    const privacy_settings = {
      margin: 10,
      rows: [
        {
          view: "radio",
          name: "profile_visibility",
          label: "Profile Visibility",
          labelPosition: "top",
          value: "true",
          tooltip: "Control who can see your profile",
          options: [
            { id: "true", value: "Visible" },
            { id: "false", value: "Hidden" },
          ],
        },
        {
          view: "richselect",
          name: "data_sharing",
          localId: "data_sharing:combo",
          label: "Data Sharing",
          labelPosition: "top",
          placeholder: "Click to select",
          options: [
            { id: "all", value: "Share with everyone" },
            { id: "friends", value: "Share with friends" },
            { id: "private", value: "Don't share" },
          ],
          tooltip: (obj) => {
            return obj.value
              ? "Choose how your data is shared"
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
          tooltip: "Reset privacy settings",
        },
        {
          view: "button",
          value: "Save",
          type: "form",
          autowidth: true,
          tooltip: "Save privacy preferences",
          click: () => {
            if (this.$$("form").validate()) {
              webix.message("Privacy settings saved!", "success");
            }
          },
        },
      ],
    };

    return {
      rows: [
        { template: "Privacy Settings", type: "header" },
        {
          view: "form",
          localId: "form",
          padding: 24,
          rows: [privacy_settings, {}, buttons],
        },
      ],
    };
  }
}
