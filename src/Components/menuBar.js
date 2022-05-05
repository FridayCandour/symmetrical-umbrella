import _ from "../../cradova/index.js";
import menuurl from "../../assets/images/menu.svg";
const menu = _("img.menu", {
  alt: "menu",
  src: menuurl,
  onclick: () => {
    _.dispatch("drawer", { toggleclass: "show-drawer" });
  },
});

_.css(".menu", {
  width: "24px",
  position: "absolute",
  left: "10px",
  top: "16px",
});

_.media("min-width: 790px", [
  ".menu",
  {
    position: "absolute",
    left: window.innerWidth - 140 + "px",
  },
]);

export default menu;
