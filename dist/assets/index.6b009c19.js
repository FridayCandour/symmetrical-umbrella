var $ = (e, t, o) => {
  if (!t.has(e)) throw TypeError("Cannot " + o);
};
var w = (e, t, o) => (
    $(e, t, "read from private field"), o ? o.call(e) : t.get(e)
  ),
  M = (e, t, o) => {
    if (t.has(e))
      throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, o);
  },
  D = (e, t, o, n) => (
    $(e, t, "write to private field"), n ? n.call(e, o) : t.set(e, o), o
  );
const re = function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) n(r);
  new MutationObserver((r) => {
    for (const s of r)
      if (s.type === "childList")
        for (const a of s.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && n(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(r) {
    const s = {};
    return (
      r.integrity && (s.integrity = r.integrity),
      r.referrerpolicy && (s.referrerPolicy = r.referrerpolicy),
      r.crossorigin === "use-credentials"
        ? (s.credentials = "include")
        : r.crossorigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function n(r) {
    if (r.ep) return;
    r.ep = !0;
    const s = o(r);
    fetch(r.href, s);
  }
};
re();
function te(e, t, o) {
  typeof t == "object" && ((o = t), (t = ""));
  const n = "" + e + t + "{",
    r = "}";
  let s = "",
    a = "";
  for (const [u, x] of Object.entries(o)) s += "" + u + ": " + x + ";";
  let c = document.querySelector("style");
  if (c !== null) {
    (a += c.innerHTML), (a += n + s + r), (c.innerHTML = a);
    return;
  }
  (c = document.createElement("style")),
    (a += c.innerHTML),
    (a += n + s + r),
    (c.innerHTML = a),
    document.head.append(c);
}
const se = function (...e) {
    let t;
    typeof e[0] == "object" &&
      !(e[0] instanceof HTMLElement) &&
      ((t = e[0]), (e = e.slice(1, e.length)));
    const o = document.createDocumentFragment();
    return (
      e.forEach((n) => {
        typeof n == "function" ? o.append(n(t)) : o.append(n);
      }),
      () => o
    );
  },
  ae = function (e) {
    const t = document.createElement("div");
    return (
      (t.className = "Cradova-app-wrappper"),
      (t.id = "app-wrapper"),
      te(".Cradova-app-wrappper", {
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
        "flex-direction": "column",
        width: "100%",
      }),
      (t.stateID = "Cradova-app-wrappper-id"),
      document.body.append(t),
      t
    );
  };
function ce(e) {
  let t,
    o = 0,
    n = 0;
  if (typeof e == "object") t = e;
  else throw new Error("no call given for the swipe handler");
  function r(c) {
    (o = c.changedTouches[0].screenX), (n = c.changedTouches[0].screenY);
  }
  function s(c) {
    const u = c.changedTouches[0].screenX - o,
      x = c.changedTouches[0].screenY - n,
      f = Math.abs(u / x),
      p = Math.abs(x / u);
    Math.abs(f > p ? u : x) < 10 && t.touch && a.touch(t.touch),
      f > p
        ? u >= 0
          ? t.right && a.right(t.right)
          : t.left && a.left(t.left)
        : x >= 0
        ? t.down && a.down(t.down)
        : t.up && a.up(t.up);
  }
  document.body.addEventListener("touchstart", r),
    document.body.addEventListener("touchend", s);
  const a = {
    touch(c) {
      return c();
    },
    right(c) {
      return c();
    },
    left(c) {
      return c();
    },
    down(c) {
      return c();
    },
    up(c) {
      return c();
    },
  };
}
function le(e, ...t) {
  const o = "@media only screen and (" + e + ") {",
    n = "}";
  let r = "  ",
    s = " ";
  const a = t.length;
  let c,
    u = "  ";
  const x = (p) => {
    for (const [h, m] of Object.entries(t[p][1])) r += "" + h + ": " + m + ";";
    return (s += "" + t[p][0] + "{" + r + "}"), s;
  };
  for (let p = 0; p < a; p++) u += x(p);
  let f = document.querySelector("style");
  f === null && (f = document.createElement("style")),
    (f.media = "screen"),
    (c = f.innerHTML),
    (c += o + u + n),
    (f.innerHTML = c),
    document.head.append(f);
}
var v, S, T;
class de {
  constructor(t) {
    M(this, v, 0);
    M(this, S, []);
    M(this, T, null);
    D(this, T, t), w(this, S).push(t);
  }
  get() {
    return w(this, T);
  }
  set(t) {
    D(this, T, t), w(this, S).push(t), D(this, v, w(this, v) + 1);
  }
  forward() {
    w(this, S).length > w(this, v) + 1 &&
      D(this, T, w(this, S)[w(this, v) + 1]);
  }
  backward() {
    w(this, S).length > 0 &&
      w(this, v) > 0 &&
      (D(this, T, w(this, S)[w(this, v) - 1]), D(this, v, w(this, v) - 1));
  }
}
(v = new WeakMap()), (S = new WeakMap()), (T = new WeakMap());
const pe = function (e) {
    return new de(e);
  },
  y = {};
y.routes = {};
y.route = function (e = "/", t) {
  const o = document.createElement("a");
  return (
    (o.href = window.location.href.replace(/#(.*)$/, "") + e.split("/")[1]),
    (y.routes[e] = {
      templateId:
        e.split("/")[1] !== "" ? e.split("/")[1] : window.location.hostname,
      controller: t,
    }),
    o
  );
};
y.navigate = async function (e) {
  let t = null;
  if (e.includes(".")) {
    if (new URL(e).pathname === window.location.pathname) return;
    y.routes[new URL(e).pathname], (t = new URL(e).pathname);
  } else {
    if (e === window.location.pathname) return;
    y.routes[e], (t = e);
  }
  window.history.pushState({}, "", t);
};
y.router = function (e) {
  if (e.target.tagName === "INPUT") return;
  let t;
  if (
    (e.target.tagName === "A" && ((t = e.target), t && t.href.includes("#"))) ||
    (e.target.parentElement &&
      e.target.parentElement.tagName === "A" &&
      (t = e.target.parentElement),
    t && t.href.includes("#")) ||
    (t && t.href.includes("javascript"))
  )
    return;
  if ((e.preventDefault(), t)) {
    if (t.href === "" || new URL(t.href).pathname === window.location.pathname)
      return;
    const r = y.routes[new URL(t.href).pathname];
    if (r) r.controller(e);
    else throw new Error("cradova err route doesn't exist  " + t.href);
    window.history.pushState({}, "", new URL(t.href).pathname),
      window.scrollTo(0, 0);
    return;
  }
  const o = window.location.pathname,
    n = y.routes[o];
  n && (n.controller(e), window.scrollTo(0, 0));
};
document.addEventListener("click", y.router);
window.addEventListener("load", y.router);
window.addEventListener("popstate", (e) => {
  e.preventDefault(), y.router(e);
});
class ue {
  constructor(t, o) {
    (this.html = o),
      (this.name = t),
      (this.template = document.createElement("div")),
      (this.template.style.width = "100%"),
      (this.template.style.display = "flex"),
      (this.template.style.flexDirection = "column"),
      (this.template.id = "cradova-screen-set"),
      (this.callBacks = []),
      (this.treeCreated = !1);
  }
  async package() {
    if (typeof this.html == "function") {
      let t = await this.html();
      typeof t == "function"
        ? this.template.append(t())
        : this.template.append(t);
    } else this.html instanceof HTMLElement && this.template.append(this.html);
    if (!(this.template.firstChild instanceof HTMLElement))
      throw new Error("Cradova err only parent with descendants is valid ");
    this.treeCreated = !0;
  }
  onActivate(t) {
    this.callBacks.push(t);
  }
  addChild(...t) {
    for (let o = 0; o < t.length; o++)
      t[o] && t[o] instanceof HTMLElement && this.template.append(t[o]),
        typeof t[o] == "function" && this.template.append(t[o]());
  }
  detach() {
    const t = document.querySelector("#cradova-screen-set");
    t && document.querySelector("#app-wrapper").removeChild(t);
  }
  async Activate() {
    document.title !== this.name &&
      (this.treeCreated || (await this.package()),
      (document.title = this.name),
      this.detach(),
      document.querySelector("#app-wrapper").append(this.template),
      document.querySelector("#app-wrapper").childElementCount > 1,
      this.callBacks.forEach((t) => t(this.template.firstChild)));
  }
}
const V = {};
V.speak = function (e, t = "en", o = 1, n = 1, r = 1) {
  const s = new SpeechSynthesisUtterance(e);
  (s.lang = t),
    (s.volume = o),
    (s.rate = n),
    (s.pitch = r),
    speechSynthesis.speak(s);
};
V.stop = () => speechSynthesis && speechSynthesis.cancel();
function fe(e, ...t) {
  const o = "@keyframes " + e + " {",
    n = "}",
    r = t.length;
  let s = " ",
    a = " ",
    c = "  ",
    u = null;
  const x = (p) => {
    for (const [h, m] of Object.entries(t[p][1])) s += "" + h + ": " + m + ";";
    return (a += "" + t[p][0] + "{" + s + "}"), a;
  };
  for (let p = 0; p < r; p++) c += x(p);
  let f = document.querySelector("style");
  f === null && (f = document.createElement("style")),
    (f.media = "screen"),
    (u = f.innerHTML),
    (u += o + c + n),
    (f.innerHTML = u),
    document.head.append(f);
}
const k = {};
k.getFileHandle = async function (e) {
  return "showOpenFilePicker" in window
    ? window.showOpenFilePicker().then((t) => t[0])
    : "chooseFileSystemEntries" in window
    ? window.chooseFileSystemEntries()
    : this.getFileLegacy(e);
};
k.getNewFileHandle = function () {
  if ("showSaveFilePicker" in window) {
    const t = {
      types: [{ description: "Text file", accept: { "text/plain": [".txt"] } }],
    };
    return window.showSaveFilePicker(t);
  }
  const e = {
    type: "save-file",
    accepts: [
      {
        description: "Text file",
        extensions: ["txt"],
        mimeTypes: ["text/plain"],
      },
    ],
  };
  return window.chooseFileSystemEntries(e);
};
k.readFile = function (e) {
  return e.text ? e.text() : k.readFileLegacy(e);
};
k.readFileLegacy = function (e) {
  return new Promise((t) => {
    const o = new FileReader();
    o.addEventListener("loadend", (n) => {
      const r = n.srcElement.result;
      t(r);
    }),
      o.readAsText(e);
  });
};
k.writeFile = async function (e, t) {
  if (e.createWriter) {
    const n = await e.createWriter();
    await n.write(0, t), await n.close();
    return;
  }
  const o = await e.createWritable();
  await o.write(t), await o.close();
};
k.verifyPermission = async function (e, t) {
  const o = {};
  return (
    t && ((o.writable = !0), (o.mode = "readwrite")),
    (await e.queryPermission(o)) === "granted" ||
      (await e.requestPermission(o)) === "granted"
  );
};
k.getFileLegacy = (e) =>
  new Promise((t, o) => {
    e.onchange = (n) => {
      const r = e.files[0];
      if (r) {
        t(r);
        return;
      }
      o(new Error("AbortError"));
    };
  });
k.saveAsLegacy = (e, t) => {
  e = e || "Untitled.txt";
  const o = { type: "text/plain" },
    n = new File([t], "", o);
  (aDownloadFile.href = window.URL.createObjectURL(n)),
    aDownloadFile.setAttribute("download", e),
    aDownloadFile.click();
};
const I = {};
I.store = (e, t) => {
  localStorage.setItem(e, JSON.stringify(t));
};
I.retrieve = (e) => localStorage.getItem(e);
I.remove = (e) => {
  localStorage.removeItem(e);
};
I.getKey = (e) => window.localStorage.key(e);
I.clear = () => {
  localStorage.clear();
};
function j(e) {
  return {
    set() {
      e.requestFullscreen().catch((t) => {
        throw t;
      });
    },
    exist() {
      document.exitFullscreen();
    },
  };
}
function he(e, t) {
  const o = document.querySelectorAll(".cra_child_doc");
  if (typeof t == "undefined" && typeof e == "object")
    for (const [n, r] of Object.entries(e))
      o.forEach((s) => {
        if (!(!s.stateID || s.stateID !== n) && typeof r == "object")
          for (const a in r) {
            if (a === "style") {
              for (const [c, u] of Object.entries(r[a])) s.style[c] = u;
              continue;
            }
            if (a === "text") {
              s.innerText = r[a];
              continue;
            }
            if (a === "fullscreen") {
              r[a] ? j(s).set() : j(s).exist();
              continue;
            }
            if (a === "class") {
              s.classList.add(r[a]);
              continue;
            }
            if (a === "toggleclass") {
              s.classList.toggle(r[a]);
              continue;
            }
            if (a === "removeclass") {
              s.classList.remove(r[a]);
              continue;
            }
            if (a === "tree") {
              if (
                (typeof r[a] == "function" && (r[a] = r[a]()),
                !r[a] instanceof HTMLElement)
              )
                throw (
                  (console.error(
                    "wrong element type: can't create element eachState on " +
                      r[a]
                  ),
                  new TypeError(
                    "cradova err invalid element, should be a html element from cradova"
                  ))
                );
              (s.innerHTML = ""), s.append(r[a]);
              continue;
            }
            s[a] = r[a];
          }
      });
  else
    o.forEach((n) => {
      if (!(!n.stateID || n.stateID !== e) && typeof t == "object")
        for (const r in t) {
          if (r === "style") {
            for (const [s, a] of Object.entries(t[r])) n.style[s] = a;
            continue;
          }
          if (r === "text") {
            n.innerText = t[r];
            continue;
          }
          if (r === "fullscreen") {
            t[r] ? j(n).set() : j(n).exist();
            continue;
          }
          if (r === "class") {
            n.classList.add(t[r]);
            continue;
          }
          if (r === "toggleclass") {
            n.classList.toggle(t[r]);
            continue;
          }
          if (r === "removeclass") {
            n.classList.remove(t[r]);
            continue;
          }
          if (r === "tree") {
            if (
              (typeof t[r] == "function" && (t[r] = t[r]()),
              !t[r] instanceof HTMLElement)
            )
              throw (
                (console.error(
                  "wrong element type: can't create element state on " + t[r]
                ),
                new TypeError(
                  "cradova err invalid element, should be a html element from cradova"
                ))
              );
            (n.innerHTML = ""), n.append(t[r]);
            continue;
          }
          n[r] = t[r];
        }
    });
}
const { innerWidth: ge, innerHeight: me } = window,
  N = me,
  O = ge,
  we = {
    base: "8px",
    font: "14px",
    radius: "20px",
    padding: "24px",
    large: "40px",
    big: "32px",
    small: "24px",
    s5: "5px",
    s8: "8px",
    s10: "10px",
    s16: "16px",
    s20: "20px",
    s30: "30px",
    s40: "40px",
    s50: "50px",
    s60: "60px",
    h1: "30px",
    h2: "24px",
    h3: "20px",
    h4: "16px",
    h5: "14px",
    h6: "13px",
    body1: "30px",
    body2: "22px",
    body3: "16px",
    body4: "14px",
    body5: "13px",
    body6: "12px",
    borderWidth: "0.4px",
    horizontalLineHeight: "1px",
    screenWidth: O < N ? O + "px" : N + "px",
    screenHeight: O < N ? N + "px" : O + "px",
    drawerWidth: (3 / 4) * O + "px",
    navBarHeight: "60px",
    buttonRadius: "4px",
    icons: {
      tiny: "15px",
      small: "20px",
      medium: "30px",
      large: "45px",
      xl: "50px",
    },
    images: { small: "20px", medium: "40px", large: "60px", logo: "200px" },
  };
function ye() {
  if (!JSON.parse(_.LS.retrieve("screen")))
    _.LS.store("screen", { screens: [] });
  else {
    const e = JSON.parse(_.LS.retrieve("screen"));
    _.LS.store("screen", { screens: e.screens.slice(0, e.screens.length - 1) });
  }
  window.addEventListener("blur", () => {
    const e = JSON.parse(_.LS.retrieve("screen"));
    if (e && Array.isArray(e.screens)) {
      const t = e.screens;
      t.push(window.location.pathname),
        _.LS.store("screen", { screens: t }),
        (window.location.pathname = "/");
    }
  }),
    window.addEventListener("beforeunload", () => {
      const e = JSON.parse(_.LS.retrieve("screen"));
      if (e && Array.isArray(e.screens)) {
        const t = e.screens;
        t.push(window.location.pathname), _.LS.store("screen", { screens: t });
      }
      window.location.pathname = "/";
    }),
    window.addEventListener("focus", () => {
      const e = JSON.parse(_.LS.retrieve("screen"));
      _.Router.navigate(e.screens[e.screens.length - 1]);
    });
}
function xe() {
  window.addEventListener("beforeunload", (e) => {
    const t = e || window.event;
    return t && (t.preventDefault(), (t.returnValue = "")), "";
  });
}
function Ae(e, t) {
  if ((e && typeof e == "function" && (e = e()), !e instanceof HTMLElement))
    throw (
      (console.error("wrong element type: can't create element state on " + e),
      new TypeError(
        "cradova err invalid element, should be a html element from cradova"
      ))
    );
  (e.stateID = t), e.classList.add(".cra_child_doc_local");
  function o(n) {
    const r = document.querySelectorAll(".cra_child_doc_local");
    console.log(r),
      r.forEach((s) => {
        if ((console.log(s.stateID), !(!s.stateID || s.stateID !== t))) {
          console.log(s);
          for (const a in n) {
            if (a === "style") {
              for (const [c, u] of Object.entries(n[a])) s.style[c] = u;
              continue;
            }
            if (a === "text") {
              s.innerText = n[a];
              continue;
            }
            if (a === "fullscreen") {
              n[a] ? fullScreen(s).set() : fullScreen(s).exist();
              continue;
            }
            if (a === "class") {
              s.classList.add(n[a]);
              continue;
            }
            if (a === "toggleclass") {
              s.classList.toggle(n[a]);
              continue;
            }
            if (a === "removeclass") {
              s.classList.remove(n[a]);
              continue;
            }
            if (a === "tree" && Array.isArray(n[a])) {
              s.innerHTML = "";
              for (let c = 0; c < n[a].length; c++) {
                if (typeof n[a][c] == "function") {
                  s.append(n[a][c](n));
                  continue;
                }
                s.append(n[a][c]);
              }
              continue;
            }
            s[a] = n[a];
          }
        }
      });
  }
  return [e, o];
}
async function be(e, t = "GET", o, n) {
  return await fetch(e, {
    headers: o,
    method: t,
    body: JSON.stringify(n),
  }).catch((r) => ({
    async text() {
      return { message: JSON.stringify(`${t} ${e} net::ERR_FAILED`) };
    },
  }));
}
async function ke(e, t, o, n) {
  if ((!n && typeof o == "function" && (n = o), typeof e != "string"))
    throw new Error("Cradova err : little Axios invalid url " + e);
  const r = new XMLHttpRequest();
  let s = new FormData();
  const a = t && typeof t != "object" ? "GET" : "POST";
  r.addEventListener("load", async function (c) {
    await n(c.target);
  });
  for (const [c, u] of Object.entries(t)) s.append(c, u);
  r.addEventListener("error", () => {
    n({ response: { message: `${a} ${e} net::ERR_FAILED` } });
  }),
    await r.open(a, e, !0),
    await r.send(s);
}
const i = (...e) => {
  let t,
    o = [];
  typeof e[1] == "object" && !(e[1] instanceof HTMLElement)
    ? ((t = e[1]), e.length > 2 && (o = e.slice(2, e.length)))
    : (e[1] instanceof HTMLElement || typeof e[1] == "function") &&
      (o = e.slice(1, e.length)),
    typeof e[0] == "string" && (e = e[0]);
  function n(r) {
    typeof r != "object" && (r = [r]);
    let s, a, c;
    const [u, x] = r[0].split("|");
    u.indexOf("#") > -1 &&
      ((c = u.split("#")[1]),
      (s = u.split("#")[0]),
      (a = c.split(".")[1]),
      a && (c = c.split(".")[0])),
      u.indexOf(".") > -1 &&
        (a ||
          ((a = u.split(".")[1]),
          (s = u.split(".")[0]),
          a.split("#")[1] && (a = a.split("#")[0]))),
      s === "" && (s = "div"),
      !s && s !== "" && (s = u);
    const f = { tag: s, className: a, ID: c, innerValue: x };
    return (...p) => {
      let h = [],
        m = {},
        H;
      for (let l = 0; l < p.length; l++) {
        if (
          typeof p[l] == "function" ||
          p[l] instanceof HTMLElement ||
          (Array.isArray(p[l]) &&
            (p[l][0] instanceof HTMLElement || typeof p[l][0] == "function"))
        ) {
          h.push(p[l]);
          continue;
        }
        if (!(p[l] instanceof HTMLElement) && typeof p[l] == "object") {
          m = p[l];
          continue;
        }
        if (typeof p[l] == "string") {
          H = p[l];
          continue;
        }
      }
      o.length && h.push(...o);
      const g = document.createElement(f.tag);
      f.className && (g.className = f.className),
        f.ID && (g.id = f.ID),
        f.innerValue && g.append(f.innerValue);
      for (const l in t) {
        if (l === "style") {
          for (const [A, R] of Object.entries(t[l])) g.style[A] = R;
          continue;
        }
        if (l === "class") {
          g.classList.add(t[l]);
          continue;
        }
        if (l === "text") {
          g.innerText = t[l];
          continue;
        }
        g[l] = t[l];
      }
      if (m && typeof m == "object" && !Array.isArray(m))
        for (const l in m) {
          if (l === "style") {
            for (const [A, R] of Object.entries(m[l])) g.style[A] = R;
            continue;
          }
          if (l === "text") {
            g.innerText = m[l];
            continue;
          }
          if (l === "class") {
            g.classList.add(m[l]);
            continue;
          }
          if (l === "fullscreen") {
            t[l] ? j(g).set() : j(g).exist();
            continue;
          }
          g[l] = m[l];
        }
      if (h && h[0])
        for (let l = 0; l < h.length; l++) {
          if (typeof h[l] == "function") {
            g.append(h[l](m));
            continue;
          }
          if (Array.isArray(h[l])) {
            const A = h[l],
              R = [];
            for (let L = 0; L < A.length; L++) {
              if (
                !(A[L] instanceof HTMLElement) &&
                typeof A[L] != "function" &&
                !Array.isArray(A[L])
              )
                throw new TypeError(
                  "cradova err invalid children list, should be a html element from cradova  " +
                    A[L]
                );
              R.push(A[L]);
            }
            h = [...h.slice(0, l + 1), ...R, ...h.slice(l + 1, h.length)];
            continue;
          }
          g.append(h[l]);
        }
      return H && g.append(H), g.stateID && g.classList.add("cra_child_doc"), g;
    };
  }
  return e[0].raw ? (e = n(e[0].raw)) : (e = n(e)), e;
};
i.register = (e) => {
  for (const t in e) i[t] = e[t];
};
i.register({
  w: se,
  css: te,
  Init: ae,
  media: le,
  swipe: ce,
  Store: pe,
  Screen: ue,
  Router: y,
  LS: I,
  FS: k,
  Speaker: V,
  metrics: we,
  fetcher: be,
  animate: fe,
  dispatch: he,
  HotReload: ye,
  littleAxios: ke,
  createState: Ae,
  PromptBeforeLeave: xe,
});
i.Init();
window._ = i;
window.addEventListener("load", async () => {
  "serviceWorker" in navigator &&
    (await navigator.serviceWorker
      .register("service-worker.js")
      .then(function (e) {
        console.log(
          `Service Worker registration successful. Scope: ${e.scope}`
        );
      })
      .catch((e) => console.log(e)));
});
var ve = "/assets/menu.482bf599.svg";
const Se = i("img.menu", {
  alt: "menu",
  src: ve,
  onclick: () => {
    i.dispatch("drawer", { toggleclass: "show-drawer" });
  },
});
i.css(".menu", {
  width: "24px",
  position: "absolute",
  left: "10px",
  top: "16px",
});
i.media("min-width: 790px", [
  ".menu",
  { position: "absolute", left: window.innerWidth - 140 + "px" },
]);
var Ce = "/assets/favicon.20caa747.ico";
const Ee = i("div.header-bar"),
  Te = i("img.logo", { alt: "logo" });
function ie({ Text: e }) {
  return Ee(Se, Te({ src: Ce }), i("h2| " + e));
}
i.css(".header-bar", {
  width: "100%",
  height: "60px",
  "background-color": "#A0A3BD",
  color: "#4dccc6",
  display: "flex",
  "padding-left": "40px",
  "font-size": "16px",
  "align-items": "center",
  "justify-content": "flex-start",
});
i.css(".header-bar .logo", {
  width: "46px",
  height: "46px",
  "margin-right": "15px",
});
const J = i("img", { style: { width: "24px", height: "24px" } }),
  d = ({ placeholder: e, credentials: t, field: o, type: n }) =>
    i("input.input", {
      onchange() {
        const r = n === "file" ? this.files[0] : 0;
        if (r) {
          let s = t.get();
          (s[o] = r), t.set(s);
        }
      },
      oninput: (r) => {
        let s = t.get();
        (s[o] = r.target.value), t.set(s);
      },
      style: {
        minHeight: e ? "40px" : "auto",
        minWidth: e ? "26auto" : "100%",
        border: e ? "2px solid white" : "auto",
        width: e ? "80%" : "auto",
        marginLeft: e ? "10px" : "auto",
        backgroundColor: e ? "#dde1e7" : "transparent",
        borderColor: "whitesmoke",
        marginBottom: e ? "10px" : "auto",
        borderRadius: e ? "12px" : "0px",
        fontSize: e ? "16px" : "14px",
        textAlign: "left",
        padding: "10px",
        color: e ? "#656669" : "transparent",
      },
      placeholder: e || "",
      type: n || "text",
    });
i.css(".gam", {
  margin: "auto",
  padding: "6px",
  margin: "8px",
  "border-radius": "8px",
  "align-items": "center",
  "justify-content": "center",
  "background-color": "#747896",
});
i.css(".batch", {
  "background-color": "#eeeeee",
  "justify-content": "center",
  "align-items": "center",
  padding: "9px",
  "font-weight": "800",
  color: "grey",
  "text-align": "center",
  "border-radius": "10px",
});
var Le =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAnCAIAAADsA61cAAAAA3NCSVQICAjb4U/gAAAAGXRFWHRTb2Z0d2FyZQBnbm9tZS1zY3JlZW5zaG907wO/PgAAA+BJREFUWIXtl0tvHEUQx/9V/ZhZr712LMdhkW2MUBQEKCFCkAtISEhwzoGPwI0vwXfgxpkzNxTBAYlDLkHiISsRjhSMTZBjr/NY2zvTM91dHLz2zq5nnThScsF1Wk131a/eM0tZbw8vV/gl886QZ8gz5NNFP7dmJ6Ouo9lUUi3pacw8J/L7e/qHNdXQaBr5oB0+XQ4vEOkCbvylv7urM48oAGi3IMX4ZOlZqaeuZRTc3uH98oAHABu7tPqIHzt6Rgv1UXrvo0jt0UaXsyKKDAA+YjePiGVRDqkwkdY19muidM5578f5uNyKzOBKSFGwMBU1jbrovXfOHbcw6kVRliKSpCkdmtsvaUILM44on1+KX/+qnjgqI1oWy9PxrTlqpmYks2KMy/OiLK0x1edUfV9674uybKQpEQFY79JKRzFh0shSKy61BnHc2lR3drjrMGFwrR3enou1KRGRLM+tMdUMD5A+hMK5NE2ZGcBKh2/eV14QIwAstuS9C2FhakDNPIpADS1W1eL6EmPM89wmiVb9e/1ahhidy22SHPD2Slrvchn7PADbPVrrsq8E09CYTkZ5qw95q0e7xSDHzGyTxLk8HNrSAKKIcy6xA0d6JfZKVHs29/BxMBjH5ZdN9c0fpgjoeVy/6D9bDufS/m2tFGziDlJIpAVwzhmtq+me0Mg8EQ2oRFAENWaMf1pXX920nawfXFaaTkZfXi2PLmitRaRPdXnOzGa4qSatXJ0PR0lTjPakLLVk3LT/tqW6lWTee0K3d3j10ZCDxhhmdnmuiSix9riVy+djGenfPXIBTYPlVnytVd+WD3rUyagY3ncP9nmuISKgipuJtc45nSTJGNdx5Xy4NEs+QhGm7NgyXpiQphGrUKUuTUXCEK9PTZKTdqxmTBqZSWSE99iRANXu/eJK+eqkTBgAMIw3Z+X9dmiYei/pVJ/OTxz9uKYyT1bJO3OxugFubaqb9/n3LbXYiu/Ox+sXx65M2tnZrnsuWmk7XOO7j/jbO3onoxAB4I0Z+XAhXGsPsvk4pwhEwVxDiqLwwQM1Dadre0dEfAiuKI5OXcBKh7uuzwPwd5dmOnzxXJw9nL+Zwx+uKETEGkvHiwlo4ppyEmCZszyzxhyo9Ura7lFeyZaP2Cugj2mLiPdlI23UNA+Ak17RRER0pDadCDC6CgiDjThO8TRIgIhj6JeKCR8tBFUx9UpTLs/H5rHhiSEQnWh2f3933Jn3PnhvrOXD5P/8j/rzIW90eb4pr0/HjxdDc3gSYoxlUajh9XkK5AHVew8M7HYyFsBHajdrv69In8h7OvJFyP/jD8IZ8gXJfyn43XodtC3oAAAAAElFTkSuQmCC";
function B(e) {
  switch (e) {
    case "Courses":
      return Re();
    case "Resources":
      return je();
    case "Domains":
      return De();
    case "Notifications":
      return Ie();
    default:
      return "nothing here in  " + e + "  work space please don't refresh";
  }
}
const b = () =>
    i(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#efeeea",
        },
      },
      i("img.spin", { src: Le, style: { width: "22px" } }),
      i`p| Updating Backend...`
    ),
  C = (e, t) =>
    i(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#efeeea",
        },
      },
      i`p| Transaction Failed!`,
      i("p", {
        text: e,
        style: {
          padding: "15px",
          border: "2px yellow solid",
          borderRadius: "12px",
          width: "90%",
          height: "40%",
          margin: "0px auto",
        },
      }),
      i("button.btn", {
        text: "   Get Back   ",
        style: {
          padding: "8px 18px",
          border: "2px white solid",
          borderRadius: "12px",
          margin: "20px auto",
        },
        onclick() {
          if (typeof t != "string") {
            i.dispatch("home-statistics-components", { tree: t });
            return;
          }
          i.dispatch("workspace", { tree: B(t) });
        },
      })
    ),
  E = (e, t) =>
    i(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        },
      },
      i`p| Transaction Successful!`,
      i("p", {
        text: e,
        style: {
          padding: "15px",
          border: "2px yellow solid",
          borderRadius: "12px",
          width: "90%",
          height: "40%",
          margin: "0px auto",
        },
      }),
      i("button.btn", {
        text: "   Get Back   ",
        style: {
          padding: "8px 18px",
          border: "2px white solid",
          borderRadius: "12px",
          margin: "20px auto",
        },
        onclick() {
          if (typeof t != "string") {
            i.dispatch("home-statistics-components", { tree: t });
            return;
          }
          i.dispatch("workspace", { tree: B(t) });
        },
      })
    );
function De() {
  const e = i.Store({
    name: "",
    password: "",
    email: "",
    token: "",
    session: "",
    name: "friday",
    title: "",
    email: "fridaymichaels662@gmail.com",
    password: "uiedbooker662",
    yeah_that_freaking_thing: !0,
  });
  return i(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "80%",
        margin: "0px auto",
        flexDirection: "column",
      },
    },
    i("h3| All Domains"),
    i(
      "div",
      i("h4.work-space-title| Create Domains"),
      d({ placeholder: "Domain title", field: "title", credentials: e }),
      i("button.btn", {
        text: "Make Request",
        onclick: async () => {
          i.dispatch("workspace", { tree: b() });
          const t = await i.fetcher(
            "https://unihub.trgwii.com//admin/create/domain",
            "POST",
            {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            e.get()
          );
          let o = await t.text();
          o.includes(":") || (o = { message: "you are offline" }),
            typeof o == "string" && (o = JSON.parse(o)),
            t.ok
              ? i.dispatch("workspace", { tree: E(o.message, "Domains") })
              : i.dispatch("workspace", { tree: C(o.message, "Domains") });
        },
      })
    ),
    i(
      "div",
      i("h4.work-space-title| Delete Domain"),
      d({ placeholder: "Domain title", field: "title", credentials: e }),
      i("button.btn", {
        text: "Make Request",
        onclick: async () => {
          i.dispatch("workspace", { tree: b() });
          const t = await i.fetcher(
            "https://unihub.trgwii.com//admin/delete/domain",
            "POST",
            {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            e.get()
          );
          let o = await t.text();
          o.includes(":") || (o = { message: "you are offline" }),
            typeof o == "string" && (o = JSON.parse(o)),
            t.ok
              ? i.dispatch("workspace", { tree: E(o.message, "Domains") })
              : i.dispatch("workspace", { tree: C(o.message, "Domains") });
        },
      })
    )
  );
}
function Re() {
  const e = i.Store({
    name: "",
    password: "",
    email: "",
    token: "",
    session: "",
    name: "friday",
    title: "",
    email: "fridaymichaels662@gmail.com",
    password: "uiedbooker662",
    yeah_that_freaking_thing: !0,
    file: "",
    welcome: "",
    domain: "",
  });
  return i(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "90%",
        margin: "0px auto 80px auto",
        flexDirection: "column",
      },
    },
    i("h3| Courses"),
    i(
      "div",
      i("h4.work-space-title| Create Course"),
      d({ placeholder: "Course title", field: "title", credentials: e }),
      d({ placeholder: "Domain title", field: "domain", credentials: e }),
      d({ placeholder: "Welcome message", field: "welcome", credentials: e }),
      i("p| upload Course thumbnail"),
      d({ field: "file", credentials: e, type: "file" }),
      i("button.btn", {
        text: "Make Request",
        onclick: async () => {
          i.dispatch("workspace", { tree: b() }),
            await i.littleAxios(
              "https://unihub.trgwii.com//admin/create/Course",
              e.get(),
              (t) => {
                let o = t.response;
                o.includes(":") && (o = JSON.parse(o)),
                  o.message !== "ok"
                    ? i.dispatch("workspace", {
                        tree: C(o.message ? o.message : o, "Courses"),
                      })
                    : i.dispatch("workspace", {
                        tree: E(o.message, "Courses"),
                      });
              }
            );
        },
      })
    ),
    i(
      "div",
      i("h4.work-space-title| Update Course"),
      d({ placeholder: "Course title", field: "title", credentials: e }),
      d({ placeholder: "Domain title", field: "domain", credentials: e }),
      d({ placeholder: "Welcome message", field: "welcome", credentials: e }),
      i("p| upload Course thumbnail"),
      d({ field: "file", credentials: e, type: "file" }),
      i("button.btn", {
        text: "Make Request",
        onclick: async () => {
          i.dispatch("workspace", { tree: b() }),
            await i.littleAxios(
              "https://unihub.trgwii.com//admin/update/Course",
              e.get(),
              (t) => {
                let o = t.response;
                o.includes(":") && (o = JSON.parse(o)),
                  o.message !== "ok"
                    ? i.dispatch("workspace", {
                        tree: C(o.message ? o.message : o, "Courses"),
                      })
                    : i.dispatch("workspace", {
                        tree: E(o.message, "Courses"),
                      });
              }
            );
        },
      })
    ),
    i(
      "div",
      i("h4.work-space-title| Delete Course"),
      d({ placeholder: "Course title", field: "title", credentials: e }),
      i("button.btn", {
        text: "Make Request",
        onclick: async () => {
          i.dispatch("workspace", { tree: b() });
          const t = await i.fetcher(
            "https://unihub.trgwii.com//admin/delete/Course",
            "POST",
            {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            e.get()
          );
          let o = await domain.text();
          o.includes(":") || (o = { message: "you are offline" }),
            typeof o == "string" && (o = JSON.parse(o)),
            t.ok
              ? i.dispatch("workspace", { tree: E(o.message, "Courses") })
              : i.dispatch("workspace", { tree: C(o.message, "Courses") });
        },
      })
    )
  );
}
function je() {
  const e = i.Store({
    name: "",
    password: "",
    email: "",
    token: "",
    session: "",
    name: "friday",
    courseTitle: "",
    resourceTitle: "",
    email: "fridaymichaels662@gmail.com",
    password: "uiedbooker662",
    yeah_that_freaking_thing: !0,
    file: "",
    welcome: "",
    domain: "",
  });
  return i(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "90%",
        margin: "0px auto 60px auto",
        flexDirection: "column",
      },
    },
    i("h3| Resources"),
    i(
      "div",
      i("h4.work-space-title| Create Resource"),
      d({
        placeholder: "Resource title",
        field: "resourceTitle",
        credentials: e,
      }),
      i("p| only pdf, json, video and audio"),
      d({ placeholder: "Resource type", field: "type", credentials: e }),
      d({ placeholder: "Course title", field: "courseTitle", credentials: e }),
      d({ placeholder: "Resource link", field: "link", credentials: e }),
      i("p| upload Resource file"),
      d({ field: "file", credentials: e, type: "file" }),
      i("button.btn", {
        text: "Make Request",
        onclick: async () => {
          i.dispatch("workspace", { tree: b() }),
            await i.littleAxios(
              "https://unihub.trgwii.com//admin/create/resource",
              e.get(),
              (t) => {
                let o = t.response;
                o.includes(":") && (o = JSON.parse(o)),
                  o.message !== "ok"
                    ? i.dispatch("workspace", {
                        tree: C(o.message ? o.message : o, "Resources"),
                      })
                    : i.dispatch("workspace", {
                        tree: E(o.message, "Resources"),
                      });
              }
            );
        },
      })
    ),
    i(
      "div",
      i("h4.work-space-title| Create Resource"),
      d({
        placeholder: "Resource title",
        field: "resourceTitle",
        credentials: e,
      }),
      i("p| only pdf, json, video and audio"),
      d({ placeholder: "Resource type", field: "type", credentials: e }),
      d({ placeholder: "Course title", field: "courseTitle", credentials: e }),
      d({ placeholder: "Resource link", field: "link", credentials: e }),
      i("p| upload Resource file"),
      d({ field: "file", credentials: e, type: "file" }),
      i("button.btn", {
        text: "Make Request",
        onclick: async () => {
          i.dispatch("workspace", { tree: b() }),
            await i.littleAxios(
              "https://unihub.trgwii.com//admin/up/resource",
              e.get(),
              (t) => {
                let o = t.response;
                o.includes(":") && (o = JSON.parse(o)),
                  o.message !== "ok"
                    ? i.dispatch("workspace", {
                        tree: C(o.message ? o.message : o, "Resources"),
                      })
                    : i.dispatch("workspace", {
                        tree: E(o.message, "Resources"),
                      });
              }
            );
        },
      })
    ),
    i(
      "div",
      i("h4.work-space-title| Delete Resource"),
      d({
        placeholder: "Resource title",
        field: "resourceTitle",
        credentials: e,
      }),
      d({ placeholder: "Course title", field: "courseTitle", credentials: e }),
      i("button.btn", {
        text: "Make Request",
        onclick: async () => {
          i.dispatch("workspace", { tree: b() });
          let o = await (
            await i.fetcher(
              "https://unihub.trgwii.com//admin/delete/Resource",
              "POST",
              {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              e.get()
            )
          ).text();
          o.includes(":") || (o = { message: "you are offline" }),
            typeof o == "string" && (o = JSON.parse(o)),
            o.message !== "ok"
              ? i.dispatch("workspace", { tree: C(o.message, "Resources") })
              : i.dispatch("workspace", { tree: E(o.message, "Resources") });
        },
      })
    )
  );
}
function Ie() {
  const e = i.Store({
    name: "",
    password: "",
    email: "",
    token: "",
    session: "",
    name: "friday",
    title: "",
    email: "fridaymichaels662@gmail.com",
    password: "uiedbooker662",
    yeah_that_freaking_thing: !0,
    file: "",
    welcome: "",
    domain: "",
    content: "",
    link: "",
    inApp: !1,
    file: "",
  });
  return i(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "80%",
        margin: "0px auto",
        flexDirection: "column",
      },
    },
    i("h3| Create Notification"),
    i(
      "div",
      d({ placeholder: "Notification title", field: "title", credentials: e }),
      d({ placeholder: "Content", field: "content", credentials: e }),
      d({ placeholder: "Link", field: "link", credentials: e }),
      d({ placeholder: "in app?", field: "inApp", credentials: e }),
      i("p| upload Notification thumbnail"),
      d({ field: "file", credentials: e, type: "file" }),
      i("button.btn", {
        text: "Make Request",
        onclick: async () => {
          i.dispatch("workspace", { tree: b() }),
            await i.littleAxios(
              "https://unihub.trgwii.com//admin/create/notification",
              e.get(),
              (t) => {
                let o = t.response;
                o.includes(":") && (o = JSON.parse(o)),
                  o.message !== "ok"
                    ? i.dispatch("workspace", {
                        tree: C(o.message ? o.message : o, "Notifications"),
                      })
                    : i.dispatch("workspace", {
                        tree: E(o.message, "Notifications"),
                      });
              }
            );
        },
      })
    )
  );
}
i.css(".work-space-title", { color: "grey", margin: "9px" });
i("img");
i("h1");
i("h2");
i("h3");
i("h4");
const P = i("p");
i("div.microlight");
const X = i("a"),
  Oe = i("div");
var Me = "/assets/des.24792972.svg";
const Ne = {
  allUsers: "1000000000000000000",
  allAdvertisers: "1000000000000000000",
  paidUsers: "1000000000000000000",
  unPaidUsers: "1000000000000000000",
  allDomain: "1000000000000000000",
  allCourses: "1000000000000000000",
  allResources: "1000000000000000000",
  allAdverts: "1000000000000000000",
  paidAdvert: "1000000000000000000",
  lastToken: "1000000000000000000",
  isTokenActive: !0,
  allDiscovery: "1000000000000000000",
  inActiveAdverts: "1000000000000000000",
  liveClass: "1000000000000000000",
  allPost: "1000000000000000000",
  notification: "1000000000000000000",
  activeDiscovery: "1000000000000000000",
  allVideoStream: "10000000000000000000",
  allGroups: "10000000000000000000",
};
function Fe(e) {
  let t = [],
    o;
  for (const [n, r] of Object.entries(e))
    (e[n] = n.toLowerCase()),
      (o = r),
      r === !0 ? (o = "yeah!") : r === !1 && (o = "nop!"),
      t.push({ name: e[n], value: o });
  return t;
}
let ee;
const Be = i("div.statistics-wrapper", { stateID: "widget" }),
  Ue = function (e) {
    return (
      (ee = Fe(e)),
      i(
        "div",
        {
          stateID: "home-statistics-components",
          style: {
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        i(
          "div.upper",
          i("h3| Dash Board"),
          i("img", { src: Me, alt: "world cup" })
        ),
        Be(
          ee.map((t) =>
            i(
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
                  alignItems: Array.isArray(t.value)
                    ? "flex-start"
                    : "space-between",
                  justifyContent: Array.isArray(t.value)
                    ? "flex-start"
                    : "space-between",
                  borderRadius: "8px",
                  flexDirection: Array.isArray(t.value) ? "column" : "row",
                  color: "#111110",
                },
              },
              i("h3", {
                text: t.name.includes("_")
                  ? t.name.split("_").join("  ")
                  : t.name,
                style: {
                  borderBottom: "2px #4dccc6 solid",
                  margin: Array.isArray(t.value) ? "auto" : "5px",
                  color: "#06222d",
                  fontWeight: "200",
                },
              }),
              Array.isArray(t.value)
                ? t.value.map((o) =>
                    i(
                      "h3",
                      {
                        text: o.title ? o.title : o.resourceTitle,
                        onclick: () => {
                          const n = o.link ? o.link : o.image;
                          n && window.open(n);
                        },
                        style: { fontWeight: "100", fontSize: "14px" },
                      },
                      o.Course
                        ? i("span", {
                            text:
                              "   ________  " + o.Course.length + "   courses",
                          })
                        : ""
                    )
                  )
                : i("span", { text: t.value })
            )
          ),
          i("button.btn| Refresh Statistics", {
            onclick: async () => {
              window.location.reload();
            },
          })
        )
      )
    );
  },
  He = async () => {
    if (!i.LS.retrieve("x-000-ttf-kktw-iii-cude"))
      return i.Router.navigate("/access"), "";
    const t = i.Store({
        name: "friday",
        email: "fridaymichaels662@gmail.com",
        password: "uiedbooker662",
        yeah_that_freaking_thing: !0,
      }),
      o = await i.fetcher(
        "https://unihub.trgwii.com//admin/stat",
        "POST",
        {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        t.get()
      );
    if (!o || !o.ok) t.set(Ne);
    else {
      const n = JSON.parse(await o.text());
      t.set(n.data);
    }
    return i(
      "div",
      {
        style: {
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
        },
      },
      ie({ Text: "unihub admin" }),
      Ue(t.get())
    );
  },
  G = new i.Screen("Unihub Amin", He);
i.css(".upper", {
  display: "flex",
  color: "#a0a3bd",
  "align-items": "center",
  padding: "15px",
  "background-color": "#efeeea",
});
i.css(".upper img", { width: "34px", height: "34px", "margin-left": "20px" });
i.css(".statistics-wrapper", {
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
});
i.css(".statistics-wrapper .data", {
  display: "flex",
  color: "#a0a3bd",
  "align-items": "center",
  padding: "8px !important",
  "margin-bottom": "10px !important",
  "background-color": "#fff",
});
var Je = "/assets/banner.8a125017.svg";
const Pe = [
    "Domains",
    "Courses",
    "Resources",
    "Notifications",
    "Payments",
    "Advertisers",
    "Users",
  ],
  Xe = {
    Domains: { style: { backgroundColor: "#747896" } },
    Courses: { style: { backgroundColor: "#747896" } },
    Resources: { style: { backgroundColor: "#747896" } },
    Notifications: { style: { backgroundColor: "#747896" } },
    Payments: { style: { backgroundColor: "#747896" } },
    Advertisers: { style: { backgroundColor: "#747896" } },
    Users: { style: { backgroundColor: "#747896" } },
  },
  We = () =>
    i(
      "div",
      {
        style: {
          backgroundColor: "#a0a3bd",
          width: "100%",
          display: "flex",
          alignContent: "center",
        },
      },
      i(
        "div",
        {
          style: {
            display: "flex",
            alignContent: "center",
            padding: "0px 0px 0px 290px",
            justifyContent: "center",
            marginBottom: "8px",
            overflow: "auto",
            paddingBottom: "8px",
          },
        },
        Pe.map((e, t) =>
          i(
            "div.gam",
            {
              stateID: e,
              style: { backgroundColor: t === 0 ? "#3490f3" : "#747896" },
            },
            i("h3| " + e, {
              onclick() {
                i.dispatch("workspace", { tree: B(e) }),
                  i.dispatch(Xe),
                  i.dispatch(this.parentElement.stateID, {
                    style: { backgroundColor: "#3490f3" },
                  });
              },
              style: {
                color: "whitesmoke",
                fontWeight: "800",
                fontSize: "13px",
                margin: "1px 2px",
              },
            })
          )
        )
      )
    );
function Ye() {
  return i.LS.retrieve("x-000-ttf-kktw-iii-cude")
    ? i(
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
        i("h3| Unihub Work Space", {
          style: {
            color: "whitesmoke",
            fontWeight: "900",
            fontSize: "22px",
            margin: "4px auto",
            backgroundColor: "#A0A3BD",
          },
        }),
        We(),
        i(
          "div.workspace",
          {
            stateID: "workspace",
            style: {
              paddingTop: "4%",
              width: "100%",
              height: "100%",
              backgroundColor: "#efeeea",
              flexDirection: "column",
              display: "flex",
            },
          },
          i("div", {
            style: {
              background: "url(" + Je + ")",
              backgroundSize: "100% auto",
              paddingTop: "calc(140 / 700 * 100%)",
            },
          }),
          B("Domains")
        )
      )
    : (i.Router.navigate("/access"), "");
}
const z = new i.Screen("work space", Ye),
  qe = () => {
    if (!i.LS.retrieve("x-000-ttf-kktw-iii-cude"))
      return i.Router.navigate("/access"), "";
    const t = i.Store({
      name: "",
      password: "",
      email: "",
      token: "",
      session: "",
      file: "",
    });
    return i(
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
      ie({ Text: "Settings screen" }),
      i`br`,
      i(
        "div",
        { style: { padding: "20px" } },
        i("h4.Text| Admin Login Details", {
          style: { fontSize: "28px", fontWeight: "900", marginBottom: "12px" },
        }),
        d({ placeholder: "name", credentials: t, field: "name", type: "text" }),
        d({
          placeholder: "password",
          credentials: t,
          field: "password",
          type: "password",
        }),
        d({
          placeholder: "email",
          credentials: t,
          field: "email",
          type: "email",
        }),
        d({
          placeholder: "access token",
          credentials: t,
          field: "token",
          type: "text",
        }),
        d({
          placeholder: "session token",
          credentials: t,
          field: "session",
          type: "text",
        }),
        d({ field: "file", credentials: t, type: "file" }),
        i("button.btn| Save Current Logins", {
          onclick: async () => {
            await i.littleAxios(
              "https://unihub.trgwii.com//admin/register",
              t.get(),
              (o) => {
                const n = JSON.parse(o.response);
                !n.data || !n.data.passTime
                  ? i.dispatch("proccesed", {
                      text: "update failed please retry!",
                    })
                  : i.LS.store("x-000-ttf-kktw-iii-cude", n.data);
              }
            );
          },
        }),
        i("p| please wait here untill your creditials appears", {
          stateID: "proccesed",
        })
      )
    );
  };
i.css(".btn", {
  background: "#c5cae9",
  "font-weight": "600",
  color: "white",
  padding: "6px 12px",
  border: "none",
  "border-radius": "12px",
  "out-line": "hidden",
});
i.css(".container", {
  background: "#efeeea",
  "font-weight": "600",
  color: "white",
  height: "100vh",
  width: "100%",
});
i.css(".Title", {
  "font-weight": "600",
  color: "white",
  "font-size": "24px",
  margin: "10px",
});
i.css(".Text", {
  "font-weight": "600",
  color: "#A0A3BD",
  "font-size": "16px",
  "margin-left": "20px",
});
const K = new i.Screen("Profile", qe);
var Ve =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAYAAACcXioiAAAACXBIWXMAABYlAAAWJQFJUiTwAAADbUlEQVRoge2aT5baRhCHv2p0AHICyyeYuUGYE3jmBIZ9YkZ7xxR53ot5L3vbJ8jkBMOcIOQEUW6grGO6skDwJAEDPUiAn+dbIVEtVXW3qv/8Gr5xZB8j1bRnxqUIl0jnFVjcgi85SI6Rm80fRZipJtNdhbYGoJp2gVvEDYFug46GkJn3dyLcqybZJoONAYxG6a04N+J0jtfJMD9WTT7X/1gLQDWdFLVeJweZIT7D2z9teImTV3hiRC7ZVHkiE/3wLqncKl9sdl6m2HwMzFSTvHGnt6CaXoMMEelV3ZHP+uHdYHVZKqCIG5VMc8wPVJP71r19Av017WNuBMTLe+Lc7eiXn++gCEA1jRH3d6lchvmrbR/OsSn8e6AUBOZfqyZZtLSplDB/cy7OA6gmmWo6KIJYIJ1PwJWs1X6tj50Ta9+o+R8ioFex8vPxcd0KQoFVAOboRzh5gy1vyfScuk4d1SRXnUyXmUno/Bgt8m5hYcxO596+2F9QpFazy6gYNBbXbv7kAKWa9mup9hlIhs0HB7R0uZK7Ufkf8Tw9UEk1Hz8Pi3GdEdBEoqgGsPvdliESH/pWMckOfcaSsACwAWb9Q15oRq7j4eSQZ5QJCqDot9rUy5sgsAXOj5cATs1LAKcmMAulXeC6JV+WBM3HAltAHspTj3aQKXC1r3VYAA2MwruxXoh1UADm/Vice0uL2y3m/V2IfVAA43EyARqbBjTB95WFzpGXAE7N9xeAahrvMMmPuYcaOpXYtnNdt7vaR5xogsCReLfzALjOW2Aa7k44gYt6f7dHEDl+/uX5LoUR1XYa4u2moJrcfvz4W/qUzdev//3b8jcQl35nEZCtbrrOxa7S79//1I46sy9OLkpboVkE9ljaquuppt1jZpFgrKTYGLOIxce23C7sSicaAme5Q62a9qnMhOd/FArN5KGkReWF+nFWrbBBpcl0NHxdZCEbr7oRdJHO7wSsio6CdD5VBHbxY6iIfJVWoFAnD9lFbgTVtKjQ0kqtpCKVxgG7AfmTVRNZD3EPqulGgbltqicFrLwCzMoqUl0nXlcDF+SYTJdnGFYPapYuEJsRL85kuDesL13X1NNNSn2MkxEm/YYdPBCZYvObenLZfthjg8B8GhYnBbZNDncet1FNe8A1yMWa7N8OOYuu8gjc75rV/g9b41C84TxDcwAAAABJRU5ErkJggg==",
  Ge =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAaCAYAAABGiCfwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALkSURBVHgBpVbtedMwEL6TzW8yQpig7QSYCSgTJJ2AegEsQ/8nKfxvu0EzQc0EmAliNsh/aolX0jlxEjtf3PPYlqXTvbpvMR1BWk8G+CRW0ZANDWS6co/WaUFHEh8ASYijjMgme9gqYi7I1DmAKzoVDCBDgDysQKyt8JpjVDY80HLAxO/J8iV+h0EaTwV0eRRYfvdjZOt6iuEAIAXE5odMhcONiVUmoBVZ86FLS+4AevQnNybN83RKR5L4VQP0cx8gt5hhOrXAcCmMJZ1BkKNFy1LkrEyq1rDqRTTKzwUKYCnA+BlD58vb9pqS04zJ2Zvt4ymm6yVT35CzEEwq5l2Didpgsvmx8lxaaH0/0flskWWT28211LliRuRzcrUWY1MIXUTevjyRE4I3+ggLjIMgG84a8UXHFmehDIqM3HavmbWUuIG1Po/6gELwOL+yDSeFyanJO7O7NwQGkh2KNKZUzCEh8d0XFInXxDkeEYbnnf5ye0O0Kl1F5y5b/5bR0L3iZkMcv1n0QnE08iYL1aEUbdvmX/bsbOYdb6noAAUT+LJVbaXEtX8r+0SHyYPGzeD19e8VPn86GINQa+YNOOriGMVx5OdNjwkDDTbAECAV/AVrSDHdIUSfM6Hitzq/f3FaspUlBInO9lR6ji4kYr1FYgAVfl45obSb0NxUfh77jaE4/8RMAaCiD8dHcDB/2fg0dn7AiZ2AxDG0c837y7cXWlpl52icz4d6VouScEizSos4TNRPUC0hFU3w92kN5k90RSeS5GUmv4/NvNTG1E2gStvr/G42ov+mKPQ2aza69zr0rfHF09Y0lRw6i/Jv3zMpZ5XvAC1agfkcsiYlXynUr+3ieoicf/XX+we0KE3SPLd5uGOTa/ETasqTqWf7rgVS965Pvha0BAylmQ5lCgJcQ/S1zgXNIFx4kEfwMzXJG9qKPvrCs6slI2A42cPmepcrWdOzrnIdoL6XQZvLrUtqecoV4h8slno8gF463QAAAABJRU5ErkJggg==",
  oe = "/assets/support.666a408c.svg";
const ze = i("div.tab", { stateID: "downTab" }),
  W = i("p"),
  Y = i("a"),
  q = i("img", { style: { width: "24px", height: "24px" }, alt: "tab nav" });
function Z() {
  return ze(
    Y(
      { href: "/", stateID: "tab1" },
      q({ src: Ve }),
      W({ text: "statistics" })
    ),
    Y(
      { href: "/workspace", stateID: "tab2" },
      q({ src: Ge }),
      W({ text: "workspace" })
    ),
    Y(
      { href: "/Profile", stateID: "tab3" },
      q({ src: oe }),
      W({ text: "Profile" })
    )
  );
}
i.css(".tab", {
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
i.css(".tab a", {
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
i.css(".tab a p", { "font-size": "13px", "font-weight": "600" });
i.media(
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
  [".tab a", { width: "52px", height: "100vh", "max-height": "100%" }],
  [".tab a p", { display: "none !important" }]
);
var Ke =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIVSURBVHgB7ZnBTcMwFIZ/G6s3UEcoGzQbwAb0xoW23JAKAiagTACVAHGjgIS4ARPAAsjdAEbouQQbO1Sc7MZpH0oQ/qSqkf2S+E/+92Q7QCTyv2Eg5mBD1tMV7JvDDfNrTptHSqtBbYk/ng6TMQghFbCzKRtLNTybizZc/Rp4/5xg/fI+eQcRHET02rIjapC+wVtsn43pbb0egAgSAbtteWQGNzSH9YDwOmP8xJ4DAhayUOb3ZTyYq6xhPkbpBK1FLDW3gDy/h7JoXsxloRC/hzLNi7d586KwgIJ+D8bmxd6WPEFBgi1E4PdQCuVFkAAqv4di80KnaF3cJaO82FwLUfo9FHsvLiBDSu1MAb/l9wL08/LCa6FeR14xjS6qwejsJklcHc43YFR3KzR4S3O3/dp3dTgFaJbNJisFA++42n050ETF0J4iQjYbLYsooGyigLKJAsomCiibKKBs/rwAAVrGZhr+6OvUdmHEsj1TMsgEZPs73OzvDGcvxne6siEUJIhWeXQWMrvPeYO3fMeoAYggE8A0z91B+EGpFxARq1DZuNfEJiFRPZwWdQpgUE+oGIwVEJByfmr+SL9lLcoHw7Gr3SnAljqt3SeUxLGvRHuT+Pw2sW8hSITNGSEQXEaFEKGxY/MgD82uXN8XMLMK2RNTjlUzwGt4ksgOnilsF/l8msUqtHzFYto+MPdOpg8yEol4+AJAFLXjcYT9ZwAAAABJRU5ErkJggg==",
  Ze = "/assets/file-text.7c2d64cf.svg";
function Q() {
  return Oe(
    {
      class: "drawer",
      stateID: "drawer",
      tabIndex: 0,
      onblur: () => {
        i.dispatch("drawer", { removeclass: "show-drawer" });
      },
      contentEditable: !0,
    },
    X({ href: "/" }, J({ src: Ke }), P({ text: "home" })),
    X({ href: "/workspace" }, J({ src: Ze }), P({ text: "learn" })),
    X({ href: "/Profile" }, J({ src: oe }), P({ text: "setting" }))
  );
}
i.css(".drawer", {
  transform: "scaleZ(0)",
  position: "absolute",
  top: 0,
  left: "-2000px",
  display: "flex",
  "align-items": "flex-start",
  "justify-content": "center",
  "flex-direction": "column",
  height: "100%",
  width: i.metrics.drawerWidth,
  padding: "0px",
  transition: "all 3s ease",
  border: "1px",
  "max-width": "300px",
  "background-color": "white",
  "out-line": "none",
  color: "white",
});
i.css(".drawer a", {
  display: "flex",
  width: "25%",
  "flex-direction": "column",
  "align-items": "center",
  "justify-content": "center",
});
i.css(".drawer a p", {
  "font-size": "13px",
  "font-weight": "600",
  color: "#a0a3bd",
});
i.media(
  "min-width: 790px",
  [
    ".drawer",
    {
      left: "0px",
      "background-color": "#c5cae9",
      color: "#c5cae9",
      padding: "0px 5px",
      "border-top-left-radius": "0px",
      "border-top-right-radius": "20px",
      "border-bottom-right-radius": "20px",
    },
  ],
  [".drawer a p", { color: "#c5cae9" }]
);
var Qe = "/assets/xp-level.58ff4781.svg";
const ne = (e, t) => (
  t || (t = ""),
  i(
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
    i("img", { src: Qe, style: { maxHeight: "200px" } }),
    i("h3|  The Journey to Greatness Starts here"),
    i("h5|  " + t),
    d({ placeholder: "your name", field: "name", credentials: e }),
    d({ placeholder: "your email", field: "email", credentials: e }),
    d({ placeholder: "your password", field: "password", credentials: e }),
    d({ field: "file", credentials: e, type: "file" }),
    i("button.btn", {
      text: "Access Server",
      onclick: async () => {
        i.dispatch("login", { tree: b() }),
          await i.littleAxios(
            "https://unihub.trgwii.com//admin/register",
            e.get(),
            (o) => {
              let n = o.response;
              n.includes(":") && (n = JSON.parse(n)),
                n.message !== "ok"
                  ? i.dispatch("login", {
                      tree: ne(e, n.message ? n.message : n),
                    })
                  : (i.LS.store("x-000-ttf-kktw-iii-cude", n.data),
                    i.Router.navigate("/"));
            }
          );
      },
    })
  )
);
function _e() {
  if (i.LS.retrieve("x-000-ttf-kktw-iii-cude"))
    return i.Router.navigate("/"), "";
  const t = i.Store({ name: "", email: "", file: "", password: "" });
  return i(
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
    i("h3| Unihub Administrators", {
      style: {
        color: "whitesmoke",
        fontWeight: "700",
        fontSize: "24px",
        margin: "4px auto",
        backgroundColor: "#A0A3BD",
      },
    }),
    i(
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
      ne(t)
    )
  );
}
const $e = new i.Screen("access unihub", _e);
G.addChild(Z, Q);
K.addChild(Z, Q);
z.addChild(Z, Q);
G.onActivate((e) => {
  i.dispatch("drawer", { removeclass: "show-drawer" }),
    i.dispatch("tab1", { style: { color: "white", paddingTop: "2px" } });
});
z.onActivate((e) => {
  i.dispatch("drawer", { removeclass: "show-drawer" }),
    i.dispatch("tab2", { style: { color: "white", paddingTop: "2px" } });
});
K.onActivate((e) => {
  i.dispatch("drawer", { removeclass: "show-drawer" }),
    i.dispatch("tab3", { style: { color: "white", paddingTop: "2px" } });
});
i.swipe({
  up: () => {
    i.dispatch("downTab", { style: { display: "none" } });
  },
  down: () => {
    i.dispatch("downTab", { style: { display: "flex" } });
  },
});
i.Router.route("/", () => G.Activate());
i.Router.route("/Profile", () => K.Activate());
i.Router.route("/workspace", () => z.Activate());
i.Router.route("/access", () => $e.Activate());
const U = {
  appName: "Amin",
  hasFSAccess:
    "chooseFileSystemEntries" in window || "showOpenFilePicker" in window,
  isMac: navigator.userAgent.includes("Mac OS X"),
  isAndroid: navigator.userAgent.includes("Android"),
  isWindows: navigator.userAgent.includes("Windows"),
};
window.addEventListener("appinstalled", (e) => {
  console.log("app installed!");
});
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault(),
    (U.installPrompt = e),
    F.removeAttribute("disabled"),
    F.classList.remove("hide");
});
window.addEventListener("appinstalled", () => {
  (U.installPrompt = null), console.log("PWA was installed");
});
const F = document.getElementById("butInstall");
F.addEventListener("click", () => {
  F.setAttribute("disabled", !0), U.installPrompt.prompt();
});
U.getPWADisplayMode = function () {
  const e = window.matchMedia("(display-mode: standalone)").matches;
  return document.referrer.startsWith("android-app://")
    ? "twa"
    : navigator.standalone || e
    ? "standalone"
    : "browser";
};
