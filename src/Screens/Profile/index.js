import _ from "../../../cradova/index.js";
import { header, Input } from "../../Components/index.js";

const profile = () => {
  const check = _.LS.retrieve("x-000-ttf-kktw-iii-cude");
  if (!check) {
    _.Router.navigate("/access");
    return "";
  }

  const credentials = _.Store({
    name: "",
    password: "",
    email: "",
    token: "",
    session: "",
    file: "",
  });

  return _(
    "div.container",
    {
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0px",
        flexDirection: "column",
      },
    },
    header({ Text: "Settings screen" }),
    _`br`,
    _(
      "div",
      { style: { padding: "20px" } },
      _("h4.Text| Admin Login Details", {
        style: { fontSize: "28px", fontWeight: "900", marginBottom: "12px" },
      }),
      Input({ placeholder: "name", credentials, field: "name", type: "text" }),
      Input({
        placeholder: "password",
        credentials,
        field: "password",
        type: "password",
      }),
      Input({
        placeholder: "email",
        credentials,
        field: "email",
        type: "email",
      }),
      Input({
        placeholder: "access token",
        credentials,
        field: "token",
        type: "text",
      }),
      Input({
        placeholder: "session token",
        credentials,
        field: "session",
        type: "text",
      }),
      Input({
        field: "file",
        credentials,
        type: "file",
      }),
      _("button.btn| Save Current Logins", {
        onclick: async () => {
          await _.littleAxios(
            "http://localhost:3002/admin/register",
            credentials.get(),
            (res) => {
              const Course = JSON.parse(res.response);
              if (!Course.data || !Course.data.passTime) {
                _.dispatch("proccesed", {
                  text: "update failed please retry!",
                });
              } else {
                _.LS.store("x-000-ttf-kktw-iii-cude", Course.data);
              }
            }
          );
        },
      }),
      _("p| please wait here untill your creditials appears", {
        stateID: "proccesed",
      })
    )
  );
};

_.css(".btn", {
  background: "#c5cae9",
  "font-weight": "600",
  color: "white",
  padding: "6px 12px",
  border: "none",
  "border-radius": "12px",
  "out-line": "hidden",
});

_.css(".container", {
  background: "#efeeea",
  "font-weight": "600",
  color: "white",
  height: "100vh",
  width: "100%",
});

_.css(".Title", {
  "font-weight": "600",
  color: "white",
  "font-size": "24px",
  margin: "10px",
});

_.css(".Text", {
  "font-weight": "600",
  color: "#A0A3BD",
  "font-size": "16px",
  "margin-left": "20px",
});

const Profile = new _.Screen("Profile", profile);

export default Profile;
