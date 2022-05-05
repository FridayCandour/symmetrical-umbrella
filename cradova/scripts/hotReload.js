export default function HotReload() {
  if (!JSON.parse(_.LS.retrieve("screen"))) {
    _.LS.store("screen", { screens: [] });
  } else {
    const saveScreen = JSON.parse(_.LS.retrieve("screen"));
    _.LS.store("screen", {
      screens: saveScreen.screens.slice(0, saveScreen.screens.length - 1),
    });
  }

  window.addEventListener("blur", () => {
    const saveScreen = JSON.parse(_.LS.retrieve("screen"));
    if (saveScreen && Array.isArray(saveScreen.screens)) {
      const arr = saveScreen.screens;
      arr.push(window.location.pathname);
      _.LS.store("screen", { screens: arr });
      window.location.pathname = "/";
    }
  });

  window.addEventListener("beforeunload", () => {
    const saveScreen = JSON.parse(_.LS.retrieve("screen"));
    if (saveScreen && Array.isArray(saveScreen.screens)) {
      const arr = saveScreen.screens;
      arr.push(window.location.pathname);
      _.LS.store("screen", { screens: arr });
    }
    window.location.pathname = "/";
  });

  window.addEventListener("focus", () => {
    const saveScreen = JSON.parse(_.LS.retrieve("screen"));
    _.Router.navigate(saveScreen.screens[saveScreen.screens.length - 1]);
  });
}
