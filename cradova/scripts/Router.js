/**
 * Facilitates navigation within the application and initializes
 * page views based on the matched routes.
 */

const Router = {};

/**
 *
 * @param {object} context Any initial context to be passed to pages.
 */

Router.routes = {};

/**
 * Registers a route.
 *
 * @param {string}   path     Route path.
 * @param {Function} callback Callback method.
 */

Router.route = function (path = "/", controller) {
  const link = document.createElement("a");
  link.href = window.location.href.replace(/#(.*)$/, "") + path.split("/")[1];
  Router.routes[path] = {
    templateId:
      path.split("/")[1] !== "" ? path.split("/")[1] : window.location.hostname,
    controller: controller,
  };
  return link;
};
Router.navigate = async function (href) {
  let route = null,
    link = null;
  if (href.includes(".")) {
    //FIXME: add a try catch here some usage errors poped up
    if (new URL(href).pathname === window.location.pathname) {
      return;
    }
    route = Router.routes[new URL(href).pathname];
    link = new URL(href).pathname;
  } else {
    if (href === window.location.pathname) {
      return;
    }
    route = Router.routes[href];
    link = href;
  }

  if (route) {
    await route.controller();
  } else {
    throw new Error("cradova err route doesn't exist");
  }
  window.history.pushState({}, "", link);
  window.scrollTo(0, 0);
  return;
};

Router.router = function (e) {
  if (e.target.tagName === "INPUT") {
    return;
  }
  //
  let Alink;
  if (e.target.tagName === "A") {
    Alink = e.target;
    if (Alink && Alink.href.includes("#")) {
      return;
    }
  }
  if (e.target.parentElement && e.target.parentElement.tagName === "A") {
    Alink = e.target.parentElement;
    if (Alink && Alink.href.includes("#")) {
      return;
    }
  }

  e.preventDefault();

  if (Alink) {
    if (
      Alink.href === "" ||
      new URL(Alink.href).pathname === window.location.pathname
    ) {
      return;
    }

    const route = Router.routes[new URL(Alink.href).pathname];
    if (route) {
      route.controller(e);
    } else {
      throw new Error("cradova err route doesn't exist  " + Alink.href);
    }
    window.history.pushState({}, "", new URL(Alink.href).pathname);
    window.scrollTo(0, 0);
    return;
  }

  const url = window.location.pathname;
  const route = Router.routes[url];
  if (route) {
    route.controller(e);
  }
  window.scrollTo(0, 0);
};

/**
 * Responds to click events anywhere in the document and when
 * the click happens on a link that is supposed to be handled
 * by the router, loads and displays the target page.
 *
 * @param {Event} e Click event.
 */

document.addEventListener("click", Router.router);
window.addEventListener("load", Router.router);
window.addEventListener("popstate", (e) => {
  e.preventDefault();
  Router.router(e);
});

export default Router;
