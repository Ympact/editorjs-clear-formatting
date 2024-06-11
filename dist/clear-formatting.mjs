var c = Object.defineProperty;
var u = (n, t, e) => t in n ? c(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var o = (n, t, e) => (u(n, typeof t != "symbol" ? t + "" : t, e), e);
class l {
  /**
   * Check if the selection has formatting
   * @returns {boolean}
   */
  static hasFormatting(t) {
    if (t === void 0)
      return !1;
    let e = window.getSelection();
    if (e.rangeCount === 0)
      return !1;
    let s = e.getRangeAt(0);
    if (s.cloneContents().children.length)
      return !0;
    let i = s.commonAncestorContainer;
    return i.nodeType === Node.TEXT_NODE && (i = i.parentElement), i !== t;
  }
  /**
   * Clear formatting from the selected text
   * TODO: 
   *  - expand selection to include the inline tag if the contents of the inline tag equals that of the selection (use case when new formatting was applied to the selection before clearing formatting)
   *  - needs improvement to handle selection within inline tag:
   *    For exmample, when clearing formatting of 'on this': "some <b>emphasis on this text</b> and some more text" should become "some <b>emphasis</b> on this <b>text</b> and some more text"
   * @returns {void}
   */
  static clearFormatting() {
    let t = window.getSelection(), e = t.getRangeAt(0), r = e.cloneRange().extractContents().textContent, a = document.createTextNode(r);
    e.deleteContents(), e.insertNode(a), t.removeAllRanges(), t.addRange(e);
  }
  /**
   * Find the block node in which the selection is made
   * @param {Selection} selection
   * @returns {Node}
   */
  static findBlock(t) {
    let e = t.anchorNode;
    return e.nodeType === Node.TEXT_NODE ? e.parentElement.closest(".cdx-block") : e.closest(".cdx-block");
  }
}
const h = {
  clearFormatting: "Clear formatting within selection"
};
class g {
  /**
   * Initialize basic data
   *
   * @param {object} options - tools constructor params
   * @param {object} options.config — initial config for the tool
   * @param {object} options.api — methods from Core
   */
  constructor({ config: t, api: e }) {
    /**
     * Default configuration
     * @param {object} config
     */
    o(this, "config", {
      shortcut: null,
      closeOnClick: !1,
      // for as long there is no icon for this tool in codex/icons, we will use the following svg
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.7,7h3.1M17.1,9l.7-1.8c0-.1,0-.2-.1-.2h-3.8M11.1,14.6l-.9,2.4M13.8,7l-.7,2M10.2,17h-2M10.2,17h2"/><line x1="7" x2="17.8" y1="7" y2="17" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>'
    });
    /**
     * State of the tool
     * @type {boolean}
     */
    o(this, "state", !1);
    /**
     * block in which the selection is made
     * will be set when checkState is called
     * @type {HTMLElement}
     */
    o(this, "block", null);
    this.api = e, this.config = { ...this.config, ...t };
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
    return this.api.i18n.t(h.clearFormatting);
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
    this.block = l.findBlock(t), this.updateState(), this.block.addEventListener("input", this.updateState);
  }
  /**
   * Update the state of the tool
   * @returns {void}
   */
  updateState() {
    this.state = l.hasFormatting(this.block), console.log(this.button, this.api.styles.inlineToolButtonActive, this.state), this.button.classList.toggle(this.api.styles.inlineToolButtonActive, this.state);
  }
  /**
   * Function called with Inline Toolbar closing
   * @returns {void}
   */
  clear() {
    this.block.removeEventListener("input", this.updateState);
  }
}
export {
  g as default
};
