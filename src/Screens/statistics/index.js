import _ from "../../../cradova/index.js";
import { header } from "../../Components/index.js";
import des from "../../../assets/images/des.svg";
const stats = {
  allUsers: "1000000000000000000",
  // allUsers: undefined,
  allAdvertisers: "1000000000000000000",
  // allAdvertisers: undefined,
  paidUsers: "1000000000000000000",
  // paidUsers: undefined,
  unPaidUsers: "1000000000000000000",
  // unPaidUsers: undefined,
  allDomain: "1000000000000000000",
  // allDomain: undefined,
  allCourses: "1000000000000000000",
  // allCourses: undefined,
  allResources: "1000000000000000000",
  // allResources: undefined,
  allAdverts: "1000000000000000000",
  // allAdverts: undefined,
  paidAdvert: "1000000000000000000",
  lastToken: "1000000000000000000",
  isTokenActive: true,
  // isTokenActive: undefined,
  allDiscovery: "1000000000000000000",
  // lastToken: undefined,
  inActiveAdverts: "1000000000000000000",
  // inActiveAdverts: undefined,
  liveClass: "1000000000000000000",
  // liveClass: undefined,
  allPost: "1000000000000000000",
  // allPost: undefined,
  notification: "1000000000000000000",
  // notification: undefined,
  activeDiscovery: "1000000000000000000",
  // activeAdverts: undefined,
  allVideoStream: "10000000000000000000",
  // allVideoStream: undefined,
  allGroups: "10000000000000000000",
  // allGroups: undefined,
};
function make(stats) {
  let useful = [],
    val;
  for (const [k, v] of Object.entries(stats)) {
    stats[k] = k.toLowerCase();
    val = v;
    if (v === true) {
      val = "yeah!";
    } else if (v === false) {
      val = "nop!";
    }
    useful.push({ name: stats[k], value: val });
  }
  return useful;
}

let useful;

const statsWidget = _("div.statistics-wrapper", { stateID: "widget" });

const homeStatis = function (statisticsData) {
  useful = make(statisticsData);
  return _(
    "div",
    {
      stateID: "home-statistics-components",
      style: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    _(
      "div.upper",
      _("h3| Dash Board"),
      _("img", { src: des, alt: "world cup" })
    ),
    statsWidget(
      useful.map((data) =>
        _(
          "div.data",
          {
            style: {
              display: "flex",
              marginBottom: 10,
              margin: "auto",
              width: "90%",
              padding: "4px",
              borderRadius: "10px",
              backgroundColor: "whitesmoke",
              alignItems: !Array.isArray(data.value)
                ? "space-between"
                : "flex-start",
              justifyContent: !Array.isArray(data.value)
                ? "space-between"
                : "flex-start",
              borderRadius: "8px",
              flexDirection: !Array.isArray(data.value) ? "row" : "column",
              color: "#111110",
              // border: "2px red solid",
            },
          },
          _("h3", {
            text: data.name.includes("_")
              ? data.name.split("_").join("  ")
              : data.name,
            style: {
              borderBottom: "2px #4dccc6 solid",
              margin: !Array.isArray(data.value) ? "5px" : "auto",
              color: "#06222d",
              fontWeight: "200",
            },
          }),
          !Array.isArray(data.value)
            ? _("span", { text: data.value })
            : data.value.map((v) => {
                return _(
                  "h3",
                  {
                    text: v.title ? v.title : v.resourceTitle,
                    onclick: () => {
                      const link = v.link ? v.link : v.image;
                      if (link) {
                        window.open(link);
                      }
                    },
                    style: {
                      fontWeight: "100",
                      fontSize: "14px",
                    },
                  },
                  v.Course
                    ? _("span", {
                        text: "   ________  " + v.Course.length + "   courses",
                      })
                    : ""
                );
              })
        )
      ),

      _("button.btn| Refresh Statistics", {
        onclick: async () => {
          window.location.reload();
        },
      })
    )
  );
};

const Home = async () => {
  const check = _.LS.retrieve("x-000-ttf-kktw-iii-cude");
  if (!check) {
    _.Router.navigate("/access");
    return "";
  }

  const statisticsData = _.Store({
    name: "friday",
    email: "fridaymichaels662@gmail.com",
    password: "uiedbooker662",
    yeah_that_freaking_thing: true,
  });

  const domain = await _.fetcher(
    "http://localhost:3001/admin/stat",
    "POST",
    {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    statisticsData.get()
  );

  if (!domain || !domain.ok) {
    statisticsData.set(stats);
  } else {
    const res = JSON.parse(await domain.text());
    statisticsData.set(res.data);
  }

  return _(
    "div",
    {
      style: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
      },
    },
    header({ Text: "unihub admin" }),
    homeStatis(statisticsData.get())
  );
};

const home = new _.Screen("Unihub Amin", Home);

_.css(".upper", {
  display: "flex",
  color: "#a0a3bd",
  "align-items": "center",
  padding: "15px",
  "background-color": "#efeeea",
});

_.css(".upper img", {
  width: "34px",
  height: "34px",
  "margin-left": "20px",
});
_.css(".statistics-wrapper", {
  display: "flex",
  "flex-direction": "column",
  "align-items": "center",
  "background-color": "#4dcbc5",
  "background-color": "#4dccc6",
  "margin-top": 12 + "px",
  "border-radius": 20 + "px",
  "margin-bottom": 20 + "px",
  padding: "30px 15px 60px 15px",
  margin: "auto",
  width: "97.8%",
  //border: "4px red solid",
});
_.css(".statistics-wrapper .data", {
  display: "flex",
  color: "#a0a3bd",
  "align-items": "center",
  padding: "8px !important",
  "margin-bottom": "10px !important",
  "background-color": "#fff",
});
export default home;
