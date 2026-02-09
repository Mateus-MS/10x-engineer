import { html } from './body.js';
import { css } from './style.js';
import { highlightCode } from '../../core/utils/codeHighligther.js';
import { convertExtensionToName } from '../../core/utils/extensionToName.js';
import { moveFirstChar } from '../../core/utils/moveFirstChar.js';

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
        this.shadowRoot.adoptedStyleSheets = [tabStyles];
        this.lineLengths = null;

        this._closeListeners = new Set();

        this._charCount = 0;

        this.needUpdateIndexes = false;
        this._charIndex = 0;
        this._lineIndex = 0;
    }

    updateIndexes(){
        let counter = this.charCount;

        let lineCounter = 0;

        for(let i = 0; i < this.lineLengths.length; i++){
            if(counter >= this.lineLengths[i]){
                lineCounter += 1
                counter -= this.lineLengths[i]
            } else {
                break
            }
        }

        // the char index is equal to what remain in counter
        this._charIndex = counter;

        // If the new lineIndex is different from the new one, update the selected line
        if(this._lineIndex !== lineCounter){
            contentHolder.children[this._lineIndex].classList.remove("selected")
            contentHolder.children[lineCounter].classList.add("selected")
        }
        this._lineIndex = lineCounter;

        this.needUpdateIndexes = false;
    }

    get charCount(){
        return this._charCount
    }

    set charCount(x){
        if (x !== this._charCount) {
            this._charCount = x
            this.needUpdateIndexes = true
        }
    }

    get charIndex(){
        if(this.needUpdateIndexes){
            this.updateIndexes()
        }

        return this._charIndex
    }

    get lineIndex(){
        if(this.needUpdateIndexes){
            this.updateIndexes()
        }

        return this._lineIndex
    }

    onClose(callback) {
        this._closeListeners.add(callback);
    }

    unfocus(){
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
            let rawData = this._getData();
            this.highlightedLines = await highlightCode(rawData, convertExtensionToName(this.fileName.split(".")[1]));

            this.lineLengths = []
            let lines = rawData.split("\n")
            for(let i = 0; i < lines.length; i++){
                this.lineLengths[i] = lines[i].length
            }
        }

        contentHolder.innerHTML = this.highlightedLines
            .map((line, index) => {
                const lineNumber = index + 1; 

                if(this.lineIndex > index){
                    return `<div class="code-line ${index == this.lineIndex ? "selected" : ""}" data-line="${lineNumber}"><div class="color">${line || ' '}</div><div class="gray"></div></div>`;
                }

                return `<div class="code-line ${index == this.lineIndex ? "selected" : ""}" data-line="${lineNumber}"><div class="color"></div><div class="gray">${line || ' '}</div></div>`;
            })
            .join('');

        // There's room to optimization
        let line = contentHolder.children[this.lineIndex];
        let color = line.children[0]
        let gray = line.children[1]
        for(let i = 0; i < this.charIndex; i++){
            moveFirstChar(gray, color)
        }
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