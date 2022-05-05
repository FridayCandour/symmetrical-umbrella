import _ from "../../cradova/index.js";
import standings from "../../assets/images/Standings.png";
import explore from "../../assets/images/Explore.png";
import support from "../../assets/images/support.svg";
const div = _("div.tab", { stateID: "downTab" });
const p = _("p");
const a = _("a");
const icon = _("img", {
  style: {
    width: "24px",
    height: "24px",
  },
  alt: "tab nav",
});

export default function TabBar() {
  const tabcolor = window.location.pathname === "/" ? "green" : "#23bbff";
  return div(
    a(
      {
        href: "/",
        stateID: "tab1",
      },
      icon({ src: standings }),
      p({ text: "statistics" })
    ),
    a(
      {
        href: "/workspace",
        stateID: "tab2",
      },
      icon({ src: explore }),
      p({ text: "workspace" })
    ),
    a(
      {
        href: "/Profile",
        stateID: "tab3",
      },
      icon({ src: support }),
      p({ text: "Profile" })
    )
  );
}

_.css(".tab", {
  // border: "2px"#23bbff"solid",
  display: "flex",
  width: "100%",
  "max-height": "54px",
  "align-items": "center",
  "justify-content": "space-evenly",
  position: "fixed",
  bottom: "0px",
  "background-color": "#a0a3bd",
  padding: "0px",
  "border-top-left-radius": "20px",
  "border-top-right-radius": "20px",
});
_.css(".tab a", {
  display: "flex",
  width: "25%",
  height: "100%",
  margin: "4px auto",
  color: "white",
  "flex-direction": "column",
  "align-items": "center",
  "justify-content": "center",
  color: "#a0a3bd",
  "padding-top": "20px 0px !important",
});

_.css(".tab a p", {
  "font-size": "13px",
  "font-weight": "600",
});

_.media(
  "min-width: 790px",
  [
    ".tab",
    {
      "flex-direction": "column",
      width: "52px",
      height: "100vh",
      "max-height": "100%",
      top: "0px",
      "border-top-left-radius": "0px",
      "border-top-right-radius": "20px",
      "border-bottom-right-radius": "20px",
    },
  ],
  [
    ".tab a",
    {
      width: "52px",
      height: "100vh",
      "max-height": "100%",
    },
  ],
  [
    ".tab a p",
    {
      display: "none !important",
    },
  ]
);
