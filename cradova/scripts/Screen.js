class Screen {
  constructor(name, template) {
    this.html = template;
    this.name = name;
    this.template = document.createElement("div");
    this.template.style.width = "100%";
    this.template.style.display = "flex";
    this.template.style.flexDirection = "column";
    this.template.id = "cradova-screen-set";
    this.callBacks = [];
    this.treeCreated = false;
  }
  async package() {
    if (typeof this.html === "function") {
      let fuc = await this.html();
      if (typeof fuc === "function") {
        this.template.append(fuc());
      } else {
        this.template.append(fuc);
      }
    } else {
      if (!(this.html instanceof HTMLElement)) {
        throw new Error("Cradova err only parent with descendants is valid");
      } else {
        this.template.append(this.html);
      }
    }
    this.treeCreated = true;
  }

  onActivate(cb) {
    this.callBacks.push(cb);
  }
  addChild(...addOns) {
    for (let i = 0; i < addOns.length; i++) {
      if (addOns[i] && addOns[i] instanceof HTMLElement) {
        this.template.append(addOns[i]);
      }
      if (typeof addOns[i] === "function") {
        this.template.append(addOns[i]());
      }
    }
  }
  detach() {
    const screen = document.querySelector("#cradova-screen-set");
    if (screen) {
      document.querySelector("#app-wrapper").removeChild(screen);
    }
  }
  async Activate() {
    if (document.title === this.name) {
      return;
    }
    const screen = document.querySelector("#cradova-screen-set");
    if (screen) {
      this.detach();
    }
    if (!this.treeCreated) {
      await this.package();
    }
    document.title = this.name;
    document.querySelector("#app-wrapper").append(this.template);
    this.callBacks.forEach((cb) => cb(this.template.firstChild));
  }
}

export default Screen;
