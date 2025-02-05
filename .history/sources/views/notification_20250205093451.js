import { JetView } from "webix-jet";
import { getCities } from "../models/cities";
import { getTags } from "../models/tags";
import { getPositions } from "../models/positions";
import "../webix/photo";
import { preferencesModel } from "../models/preferencesModel";

export default class PersonView extends JetView {
  config() {
    const dateFormat = webix.Date.dateToStr("%d %M %Y");

    const main_info = {
      margin: 10,
      rows: [
        {
          view: "radio",
          name: "notifications",
          label: "Notifications",
          labelPosition: "top",
          value: 1,
          tooltip: (obj) => {
            return obj.id % 2
              ? "You will receive email notifications about actions performed by this client."
              : "You will receive no email notifications.";
          },
          options: [
            { id: 1, value: "On" },
            { id: 2, value: "Off" },
          ],
        },
        {
          view: "radio",
          name: "nottype",
          label: "Notification Type",
          labelPosition: "top",
          value: 2,
          tooltip: (obj) => {
            return obj.id % 2
              ? "Get Email notifications"
              : "Get Push notifications";
          },
          options: [
            { id: 1, value: "Email" },
            { id: 2, value: "Push Notifications" },
          ],
        },
      ],
    };

    const upper_section = {
      margin: 48,
      cols: [main_info],
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
          tooltip: "Click to clean the form",
        },
        {
          view: "button",
          value: "Save",
          type: "form",
          autowidth: true,
          tooltip: "Save changes",
          click: () => {
            if (this.$$("form").validate()) {
              webix.message("Saved (not really)!", "success");
            }
          },
        },
      ],
    };

    return {
      rows: [
        { template: "Profile information", type: "header" },
        {
          view: "form",
          localId: "form",
          padding: 24,
          rows: [upper_section, {}, buttons],
          rules: {
            fname: webix.rules.isNotEmpty,
          },
        },
      ],
    };
  }
  init() {
    prefData = preferencesModel.getPreferences();
    console.log(prefData);
    this.$$("form").setValues({
      fname: "Morgan",
      lname: "Yu",
      birthday: "2005-05-05",
      photo: "morgan_yu",
      notifications: 1,
      request: "2017-01-13",
      tags: "6,3,5",
    });
  }
}
