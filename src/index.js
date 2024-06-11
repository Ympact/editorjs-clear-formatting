/**
 * Import;
 */
// awaiting PR to be merged: https://github.com/codex-team/icons/pull/42
//import { IconClearFormatting } from '@codexteam/icons';

/**
 * Import functions
 */
import { SelectionUtils } from './utils/selection.js';

const DICTIONARY = {
  clearFormatting: 'Clear formatting within selection',
};

/**
 * Link Autocomplete Tool for EditorJS
 */
export default class ClearFormatting {

    /**
     * Default configuration
     * @param {object} config
     */
    config = {
        shortcut: null,
        closeOnClick: false,
        // for as long there is no icon for this tool in codex/icons, we will use the following svg
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.7,7h3.1M17.1,9l.7-1.8c0-.1,0-.2-.1-.2h-3.8M11.1,14.6l-.9,2.4M13.8,7l-.7,2M10.2,17h-2M10.2,17h2"/><line x1="7" x2="17.8" y1="7" y2="17" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>',

    }

    /**
     * State of the tool
     */
    state = false;

    /**
     * Specifies Tool as Inline Toolbar Tool
     * @returns {boolean}
     */
    static get isInline() {
        return true;
    }


    /**
     * Sanitizer Rule
     * @returns {object}
     */
    static get sanitize() {
        // this tool dopes not create any HTML element, so no need to sanitize
    }


    /**
     * Title for hover-tooltip
     * @returns {string}
     */
    get title() {
        console.log(this.api);
        return DICTIONARY.clearFormatting;
    }


    /**
     * Set a shortcut
     * @returns {string}
     */
    get shortcut() {
        if(this.config.shortcut !== null){
            return this.config.shortcut;
        }
    }


    /**
     * Initialize basic data
     *
     * @param {object} options - tools constructor params
     * @param {object} options.config — initial config for the tool
     * @param {object} options.api — methods from Core
     * @param {object} options.block - block api
     */
    constructor({config, api, block}) {
        /**
         * Essential tools
         */
        this.api = api;
        this.block = block;
        console.log('block', block);
        console.log('api', api);
        this.config = {...this.config, ...config};
    }


    /**
     * Create element with buttons for toolbar
     *
     * @returns {HTMLDivElement}
     */
    render() {
        /**
         * Create wrapper for buttons
         * @type {HTMLButtonElement}
         */
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.innerHTML = this.config.icon;
        this.button.classList.add(this.api.styles.inlineToolButton);

        return this.button;
    }


    /**
     * Handle clicks on the Inline Toolbar icon
     * Lets show the search input and results to choose from
     *
     * @param {Range} range — range to wrap with link
     * @returns {void}
     */
    surround(range) {
        if (!range) {
            return;
        }

        SelectionUtils.clearFormatting();

        if(this.config.closeOnClick){
            this.api.inlineToolbar.close();
        }
    }


    /**
     * Check for a tool's state
     *
     * @param {Selection} selection — selection to be passed from Core
     * @returns {void}
     */
    async checkState(selection) {
        this.state = SelectionUtils.hasFormatting();
        this.button.classList.toggle(this.api.styles.inlineToolButtonActive, this.state);
    
        // get the parent div of this selected text
        let blockDiov = selection.anchorNode.parentElement;
        console.log('blockDiv', blockDiov);

        console.log(this.block.holder);
        this.api.listeners.on(this.block.holder, 'change', () => {
            // check if the current selection was edited by other inline tools, we probably need to expand the selection to include the new html tags, and thus reenable the clear formatting button
        });
        // keep checking as we don't have another way to check if the current selection was edited by other inline tools
        // atm this will not work, we will need to implement something like rangy.splitBoundaries()
        /*
    
        this.jobs.push( setTimeout(() => {
            this.state = this.hasFormatting();

            console.log('checkState', this.state)
            this.button.classList.toggle(this.api.styles.inlineToolButtonActive, this.state);
            }, 500)
        )
        */

        return;
    }

    
    /**
     * Function called with Inline Toolbar closing
     * @returns {void}
     */
    clear() {
        this.api.listeners.off(this.block.holder, 'change');
    }
}