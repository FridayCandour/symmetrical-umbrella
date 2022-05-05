export default function createState(element, stateID) {
  if (element && typeof element === "function") {
    element = element();
  }
  if (!element instanceof HTMLElement) {
    console.error(
      "wrong element type: can't create element state on " + element
    );
    throw new TypeError(
      "cradova err invalid element, should be a html element from cradova"
    );
  }

  element.stateID = stateID;
  element.classList.add(".cra_child_doc_local");
  function dispatcher(props) {
    const nodes = document.querySelectorAll(".cra_child_doc_local");
    console.log(nodes);
    nodes.forEach((element) => {
      console.log(element.stateID);
      // abort rendering if the state is not for this element
      if (!element.stateID || element.stateID !== stateID) {
        return;
      }

      console.log(element);
      // updating the element's state
      for (const key in props) {
        if (key === "style") {
          for (const [k, v] of Object.entries(props[key])) {
            element.style[k] = v;
          }
          continue;
        }
        if (key === "text") {
          element.innerText = props[key];
          continue;
        }
        if (key === "fullscreen") {
          if (props[key]) {
            fullScreen(element).set();
          } else {
            fullScreen(element).exist();
          }
          continue;
        }
        if (key === "class") {
          element.classList.add(props[key]);
          continue;
        }
        if (key === "toggleclass") {
          element.classList.toggle(props[key]);
          continue;
        }
        if (key === "removeclass") {
          element.classList.remove(props[key]);
          continue;
        }
        if (key === "tree" && Array.isArray(props[key])) {
          // destroy the component tree
          element.innerHTML = "";
          // rebuild the component tree
          for (let i = 0; i < props[key].length; i++) {
            if (typeof props[key][i] === "function") {
              element.append(props[key][i](props));
              continue;
            }
            element.append(props[key][i]);
          }
          continue;
        }
        element[key] = props[key];
      }
    });
  }

  return [element, dispatcher];
}
