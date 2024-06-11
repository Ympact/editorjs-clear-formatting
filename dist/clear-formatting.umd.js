(function(e,n){typeof exports=="object"&&typeof module<"u"?module.exports=n():typeof define=="function"&&define.amd?define(n):(e=typeof globalThis<"u"?globalThis:e||self,e.ClearFormatting=n())})(this,function(){"use strict";var d=Object.defineProperty;var h=(e,n,o)=>n in e?d(e,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[n]=o;var l=(e,n,o)=>(h(e,typeof n!="symbol"?n+"":n,o),o);class e{static hasFormatting(t){if(t===void 0)return!1;let i=window.getSelection();if(i.rangeCount===0)return!1;let r=i.getRangeAt(0);if(r.cloneContents().children.length)return!0;let s=r.commonAncestorContainer;return s.nodeType===Node.TEXT_NODE&&(s=s.parentElement),s!==t}static clearFormatting(){let t=window.getSelection(),i=t.getRangeAt(0),c=i.cloneRange().extractContents().textContent,u=document.createTextNode(c);i.deleteContents(),i.insertNode(u),t.removeAllRanges(),t.addRange(i)}static findBlock(t){let i=t.anchorNode;return i.nodeType===Node.TEXT_NODE?i.parentElement.closest(".cdx-block"):i.closest(".cdx-block")}}const n={clearFormatting:"Clear formatting within selection"};class o{constructor({config:t,api:i}){l(this,"config",{shortcut:null,closeOnClick:!1,icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.7,7h3.1M17.1,9l.7-1.8c0-.1,0-.2-.1-.2h-3.8M11.1,14.6l-.9,2.4M13.8,7l-.7,2M10.2,17h-2M10.2,17h2"/><line x1="7" x2="17.8" y1="7" y2="17" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>'});l(this,"state",!1);l(this,"block",null);this.api=i,this.config={...this.config,...t}}static get isInline(){return!0}static get sanitize(){}get title(){return this.api.i18n.t(n.clearFormatting)}get shortcut(){if(this.config.shortcut!==null)return this.config.shortcut}render(){return this.button=document.createElement("button"),this.button.type="button",this.button.innerHTML=this.config.icon,this.button.classList.add(this.api.styles.inlineToolButton),this.button}surround(t){t&&(e.clearFormatting(),this.config.closeOnClick&&this.api.inlineToolbar.close())}async checkState(t){this.block=e.findBlock(t),this.updateState(),this.block.addEventListener("input",this.updateState)}updateState(){this.state=e.hasFormatting(this.block),this.button.disabled=!this.state,this.api!==void 0&&this.button.classList.toggle(this.api.styles.inlineToolButtonActive,this.state)}clear(){this.block.removeEventListener("input",this.updateState)}}return o});
