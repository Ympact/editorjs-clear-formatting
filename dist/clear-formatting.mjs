var a = Object.defineProperty;
var h = (n, t, e) => t in n ? a(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var i = (n, t, e) => (h(n, typeof t != "symbol" ? t + "" : t, e), e);
class l {
  /**
   * Check if the selection has formatting
   * @returns {boolean}
   */
  static hasFormatting() {
    let t = window.getSelection();
    if (t.rangeCount === 0)
      return !1;
    let e = t.getRangeAt(0), o = e.cloneContents().textContent, s = e.toString();
    return o !== s;
  }
  /**
   * Clear formatting from the selected text
   * @returns {void}
   */
  static clearFormatting() {
    let t = window.getSelection(), e = t.getRangeAt(0), r = e.cloneRange().extractContents().textContent, c = document.createTextNode(r);
    e.deleteContents(), e.insertNode(c), t.removeAllRanges(), t.addRange(e);
  }
}
const g = {
  clearFormatting: "Clear formatting within selection"
};
class d {
  /**
   * Initialize basic data
   *
   * @param {object} options - tools constructor params
   * @param {object} options.config — initial config for the tool
   * @param {object} options.api — methods from Core
   * @param {object} options.block - block api
   */
  constructor({ config: t, api: e, block: o }) {
    /**
     * Default configuration
     * @param {object} config
     */
    i(this, "config", {
      shortcut: null,
      closeOnClick: !1,
      // for as long there is no icon for this tool in codex/icons, we will use the following svg
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.7,7h3.1M17.1,9l.7-1.8c0-.1,0-.2-.1-.2h-3.8M11.1,14.6l-.9,2.4M13.8,7l-.7,2M10.2,17h-2M10.2,17h2"/><line x1="7" x2="17.8" y1="7" y2="17" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>'
    });
    /**
     * State of the tool
     */
    i(this, "state", !1);
    /**
     * block in which the selection is made
     */
    i(this, "block", null);
    this.api = e, this.block = o, console.log("api", e), this.config = { ...this.config, ...t };
  }
  /**
   * Specifies Tool as Inline Toolbar Tool
   * @returns {boolean}
   */
  static get isInline() {
    return !0;
  }
  /**
   * Sanitizer Rule
   * @returns {object}
   */
  static get sanitize() {
  }
  /**
   * Title for hover-tooltip
   * @returns {string}
   */
  get title() {
    return this.api.i18n.t(g.clearFormatting);
  }
  /**
   * Set a shortcut
   * @returns {string}
   */
  get shortcut() {
    if (this.config.shortcut !== null)
      return this.config.shortcut;
  }
  /**
   * Create element with buttons for toolbar
   *
   * @returns {HTMLDivElement}
   */
  render() {
    return this.button = document.createElement("button"), this.button.type = "button", this.button.innerHTML = this.config.icon, this.button.classList.add(this.api.styles.inlineToolButton), this.button;
  }
  /**
   * Handle clicks on the Inline Toolbar icon
   * Lets show the search input and results to choose from
   *
   * @param {Range} range — range to wrap with link
   * @returns {void}
   */
  surround(t) {
    t && (l.clearFormatting(), this.config.closeOnClick && this.api.inlineToolbar.close());
  }
  /**
   * Check for a tool's state
   *
   * @param {Selection} selection — selection to be passed from Core
   * @returns {void}
   */
  async checkState(t) {
    this.block = t.anchorNode.parentElement, this.state = l.hasFormatting(), this.button.classList.toggle(this.api.styles.inlineToolButtonActive, this.state), console.log("blockDiv", this.block), this.api.listeners.on(this.block, "change", () => {
      console.info("text has changed");
    });
  }
  /**
   * Function called with Inline Toolbar closing
   * @returns {void}
   */
  clear() {
    this.api.listeners.off(this.block, "change");
  }
}
export {
  d as default
};
