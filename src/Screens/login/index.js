import _ from "../../../cradova/index.js";
import { Loader } from "../../Components/workspaceComps.js";
import { Input } from "../../Components/index.js";
import xp from "../../../assets/images/xp-level.svg";

const join = (credentials, err) => {
  if (!err) {
    err = "";
  }
  return _(
    "div.login",
    {
      stateID: "login",
      style: {
        padding: "4%",
        width: "100%",
        height: "100%",
        backgroundColor: "#efeeea",
        flexDirection: "column",
        display: "flex",
      },
    },
    _("img", {
      src: xp,
      style: {
        maxHeight: "200px",
      },
    }),
    _("h3|  The Journey to Greatness Starts here"),
    _("h5|  " + err),
    Input({
      placeholder: "your name",
      field: "name",
      credentials,
    }),
    Input({
      placeholder: "your email",
      field: "email",
      credentials,
    }),
    Input({
      placeholder: "your password",
      field: "password",
      credentials,
    }),
    Input({
      field: "file",
      credentials,
      type: "file",
    }),
    _("button.btn", {
      text: "Access Server",
      onclick: async () => {
        _.dispatch("login", { tree: Loader() });
        await _.littleAxios(
          "http://localhost:3001/admin/register",
          credentials.get(),
          (res) => {
            let Course = res.response;
            if (Course.includes(":")) {
              Course = JSON.parse(Course);
            }
            if (Course.message !== "ok") {
              _.dispatch("login", {
                tree: join(
                  credentials,
                  Course.message ? Course.message : Course
                ),
              });
            } else {
              _.LS.store("x-000-ttf-kktw-iii-cude", Course.data);
              _.Router.navigate("/");
            }
          }
        );
      },
    })
  );
};
function Login() {
  const check = _.LS.retrieve("x-000-ttf-kktw-iii-cude");
  if (check) {
    _.Router.navigate("/");
    return "";
  }
  // FIXME: here i will get admin credentials and pass it downwards
  const credentials = _.Store({
    name: "",
    email: "",
    file: "",
    password: "",
  });

  return _(
    "div",
    {
      style: {
        paddingTop: 15,
        width: "100%",
        backgroundColor: "#A0A3BD",
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    _("h3| Unihub Administrators", {
      style: {
        color: "whitesmoke",
        fontWeight: "700",
        fontSize: "24px",
        margin: "4px auto",
        backgroundColor: "#A0A3BD",
      },
    }),
    _(
      "div.login",
      {
        stateID: "login",
        style: {
          paddingTop: "4%",
          width: "100%",
          height: "100%",
          backgroundColor: "#efeeea",
          flexDirection: "column",
          display: "flex",
        },
      },
      join(credentials)
    )
  );
}

const Access = new _.Screen("access unihub", Login);

export default Access;
