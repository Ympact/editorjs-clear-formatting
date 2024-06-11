(function(e,t){typeof exports=="object"&&typeof module<"u"?module.exports=t():typeof define=="function"&&define.amd?define(t):(e=typeof globalThis<"u"?globalThis:e||self,e.ClearFormatting=t())})(this,function(){"use strict";var u=Object.defineProperty;var g=(e,t,o)=>t in e?u(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var l=(e,t,o)=>(g(e,typeof t!="symbol"?t+"":t,o),o);class e{static hasFormatting(){let n=window.getSelection();if(n.rangeCount===0)return!1;let i=n.getRangeAt(0),s=i.cloneContents().textContent,r=i.toString();return s!==r}static clearFormatting(){let n=window.getSelection(),i=n.getRangeAt(0),a=i.cloneRange().extractContents().textContent,h=document.createTextNode(a);i.deleteContents(),i.insertNode(h),n.removeAllRanges(),n.addRange(i)}}const t={clearFormatting:"Clear formatting within selection"};class o{constructor({config:n,api:i,block:s}){l(this,"config",{shortcut:null,closeOnClick:!1,icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.7,7h3.1M17.1,9l.7-1.8c0-.1,0-.2-.1-.2h-3.8M11.1,14.6l-.9,2.4M13.8,7l-.7,2M10.2,17h-2M10.2,17h2"/><line x1="7" x2="17.8" y1="7" y2="17" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>'});l(this,"state",!1);l(this,"block",null);this.api=i,this.block=s,console.log("api",i),this.config={...this.config,...n}}static get isInline(){return!0}static get sanitize(){}get title(){return this.api.i18n.t(t.clearFormatting)}get shortcut(){if(this.config.shortcut!==null)return this.config.shortcut}render(){return this.button=document.createElement("button"),this.button.type="button",this.button.innerHTML=this.config.icon,this.button.classList.add(this.api.styles.inlineToolButton),this.button}surround(n){n&&(e.clearFormatting(),this.config.closeOnClick&&this.api.inlineToolbar.close())}async checkState(n){this.block=n.anchorNode.parentElement,this.state=e.hasFormatting(),this.button.classList.toggle(this.api.styles.inlineToolButtonActive,this.state),this.api.listeners.on(this.block,"input",i=>{console.info("text has changed",i)})}clear(){this.api.listeners.off(this.block,"input")}}return o});
