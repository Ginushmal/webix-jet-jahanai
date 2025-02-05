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
          view: "text",
          name: "first_name",
          label: "First name",
          labelPosition: "top",
          placeholder: "First name",
          invalidMessage: "A name is required",
          tooltip: "Client's name is " + "#value#",
        },
        {
          view: "text",
          name: "last_name",
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

    const more_info = {
      margin: 10,
      rows: [
        {
          view: "text",
          name: "address",
          label: "Address",
          labelPosition: "top",
          placeholder: "Address",
          tooltip: (obj) => {
            return obj.value
              ? "The address of the client's office"
              : "<span class='notselected'>" + "Not specified" + "</span>";
          },
        },
        {
          view: "datepicker",
          name: "birthday",
          label: "Birthday",
          labelPosition: "top",
          placeholder: "Click to select",
          format: dateFormat,
          tooltip: (obj) => {
            let result = "Client is ";
            if (obj.value) {
              result +=
                Math.floor(
                  (new Date() - obj.value) / (1000 * 60 * 60 * 24 * 365)
                ) + " years old";
              let nearestBDay = new Date();
              nearestBDay.setMonth(obj.value.getMonth());
              nearestBDay.setDate(obj.value.getDate());
              if (nearestBDay < new Date()) {
                webix.Date.add(nearestBDay, 1, "year");
              }
              result +=
                "<br>" + "Next birthday is on " + dateFormat(nearestBDay);
            }
            return result;
          },
        },

        {
          view: "text",
          name: "phone",
          label: "Phone",
          labelPosition: "top",
          placeholder: "Phone",
        },
      ],
    };

    const upper_section = {
      margin: 48,
      cols: [main_info, more_info],
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
            console.log("Form values:", this.$$("form").getValues());
            if (this.$$("form").validate()) {
              // Get the form values
              const formData = this.$$("form").getValues();
              console.log("Form data:", formData);

              // Format the birthday field to 'YYYY-MM-DD' if it exists
              if (formData.birthday) {
                formData.birthday = webix.Date.dateToStr("%Y-%m-%d")(
                  formData.birthday
                );
              }

              // Update account settings with the formatted form data
              preferencesModel
                .updateAccountSettings(formData)
                .then((response) => {
                  // On success, show a success message
                  webix.message("Saved", "success");
                })
                .catch((error) => {
                  // On error, show an error message
                  webix.message({
                    type: "error",
                    text: "Failed to save preferences",
                  });
                  console.error("Error updating preferences:", error);
                });
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
    preferencesModel
      .getAccountSettings()
      .then((data) => {
        this.$$("form").setValues({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          city: data.city || "",
          position: data.position || "",
          address: data.address || "",
          birthday: data.birthday ? new Date(data.birthday) : "",
          phone: data.phone || "",
        });
      })
      .catch((error) => {
        console.error("Error loading preferences:", error);
      });
  }
}
