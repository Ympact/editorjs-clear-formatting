/**
 * Useful functions
 */
export class SelectionUtils {
    /**
     * Check if the selection has formatting
     * @returns {boolean}
     */

    static hasFormatting() {
        let sel = window.getSelection();
        if (sel.rangeCount === 0) return false; // No selection
    
        let range = sel.getRangeAt(0);
        let selectedText = range.cloneContents().textContent;
        let rangeText = range.toString();
    
        return selectedText !== rangeText;
    }

    /**
     * Clear formatting from the selected text
     * @returns {void}
     */
    static clearFormatting() {
        let sel = window.getSelection();
        let range = sel.getRangeAt(0);
    
        // Create a new Range to clone the contents, so we don't modify the document yet
        let cloneRange = range.cloneRange();
        let selectedText = cloneRange.extractContents();
    
        //Strip all HTML elements from the selected text
        let textContent = selectedText.textContent;
    
        // Create a text node with the stripped text
        let textNode = document.createTextNode(textContent);
    
        // Replace the selected text with the text node in the original Range
        range.deleteContents();
        range.insertNode(textNode);
    
        // Restore selection
        sel.removeAllRanges();
        sel.addRange(range);
    }
}