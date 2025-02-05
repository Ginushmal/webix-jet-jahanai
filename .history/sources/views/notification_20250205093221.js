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
            { id: 1, value: "Agree" },
            { id: 2, value: "Disagree" },
          ],
        },
        {
          view: "text",
          name: "lname",
          label: "Last name",
          labelPosition: "top",
          placeholder: "Last name",
          tooltip: "Client's last name is " + "#value#",
        },
        {
          view: "richselect",
          name: "position",
          localId: "position:combo",
          label: "Position",
          labelPosition: "top",
          placeholder: "Click to select",
          options: getPositions(),
          tooltip: (obj) => {
            return obj.value
              ? "The position that client occupies within their company"
              : "<span class='notselected'>" + "Not selected" + "</span>";
          },
        },
        {
          view: "text",
          name: "email",
          label: "Email",
          labelPosition: "top",
          placeholder: "Email",
          tooltip: (obj) => {
            return obj.value
              ? "The working email address of the client"
              : "<span class='notselected'>" + "Not specified" + "</span>";
          },
        },
        {
          view: "richselect",
          name: "city",
          localId: "cities:combo",
          label: "City, country",
          labelPosition: "top",
          placeholder: "Click to select",
          options: getCities(),
          tooltip: (obj) => {
            return obj.value
              ? "The city where the client works"
              : "<span class='notselected'>" + "Not selected" + "</span>";
          },
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
