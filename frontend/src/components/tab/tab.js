import { html } from './body.js';
import { css } from './style.js';
import { highlightCode } from '../../core/utils/codeHighligther.js';
import { convertExtensionToName } from '../../core/utils/extensionToName.js';

const tabStyles = new CSSStyleSheet();
tabStyles.replaceSync(css());

const tabHolder = document.getElementById("nav-bar")
if (!tabHolder) throw new Error("tab holder not found")
    
const contentHolder = document.getElementById("content")
if (!contentHolder) throw new Error("content holder not found")

class Tab extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})

        this.highlightedLines = null;
        this.instanceContent = null;
        this.shadowRoot.adoptedStyleSheets = [tabStyles];

        this._closeListeners = new Set();

        this.charIndex = 0;
        this.lineIndex = 0;
    }

    onClose(callback) {
        this._closeListeners.add(callback);
    }

    unfocus(){
        this.instanceContent = contentHolder.innerHTML
        this.classList.remove("selected")
        contentHolder.innerHTML = ""
    }
    
    focus(){
        tabHolder.querySelectorAll(".selected").forEach(i => i.unfocus());
        this.classList.add("selected")
        
        this.loadContent()
    }

    close(e){
        for (const file of this._closeListeners) file(this);

        if(this.classList.contains("selected")){
            let closestSibling = this.nextElementSibling || this.previousElementSibling;
            if(closestSibling){
                closestSibling.focus()
            } 
        }

        this.parentElement.removeChild(this)
    }

    onclick(e){
        this.focus();
    }

    async loadContent(){
        if(this.highlightedLines === null){
            this.highlightedLines = await highlightCode(this._getData(), convertExtensionToName(this.fileName.split(".")[1]));
        }
    
        if(this.instanceContent === null || this.instanceContent === "" || this.instanceContent === " ") {
            this.instanceContent = this.highlightedLines
                .map((line, index) => {
                    const lineNumber = index + 1; 
    
                    return `<div class="code-line ${lineNumber == 1 ? "selected" : ""}" data-line="${lineNumber}"><div class="color"></div><div class="gray">${line || ' '}</div></div>`;
                })
                .join('');
        }
        contentHolder.innerHTML = this.instanceContent
    }

    connectedCallback(){
        this.fileName = this.getAttribute('fileName')

        this.render();

        this.focus();

        this.addEventListener("click", (e)=>{
            this.onclick(e)
        })

        // Listen to clicks on button
        const closeBtn = this.shadowRoot.querySelector('button');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            this.close(e)
        });
    }

    render(){
        this.shadowRoot.innerHTML = html(this.fileName);
    }
}

customElements.define('div-tab', Tab);