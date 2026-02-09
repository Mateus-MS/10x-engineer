import { html } from "./body.js"
import { css } from "./style.js"

const fileStyle = new CSSStyleSheet();
fileStyle.replaceSync(css());

const tabHolder = document.getElementById("nav-bar")
if (!tabHolder) throw new Error("tab holder not found")

export class File extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.adoptedStyleSheets = [fileStyle];

        this.data = null;

        this.isOpen = false;
        this.tabElement = null;
    }

    getData(){
        return this.data;
    }

    async onclick(e){
        if(this.isOpen){
            this.tabElement.focus()
            return
        }

        this.isOpen = true;

        this.tabElement = document.createElement("div-tab")
        this.tabElement.setAttribute("fileName", this.fileName)
        this.tabElement.classList.add("selected")
        this.tabElement._getData = this.getData.bind(this);
        this.tabElement.onClose(() => {
            this.isOpen = false;
        });

        if(this.data === null){
            let response = await fetch(`http://localhost:8080/levels?path=${this.fullPath}`);
            this.data = await response.text();
        }

        tabHolder.appendChild(this.tabElement);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.fileName = this.getAttribute('fileName') || '';
        this.fullPath = this.getAttribute('fullPath') || '';
        
        this.shadowRoot.innerHTML = html(this.fileName);
    
        this.addEventListener("mousedown", (e)=>{
            this.onclick(e)
        })
    }
}