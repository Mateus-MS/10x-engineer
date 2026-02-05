import { html } from "./body.js"
import { css } from "./style.js"

const fileStyle = new CSSStyleSheet();
fileStyle.replaceSync(css());

export class File extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        // Attach the shared stylesheet
        this.shadowRoot.adoptedStyleSheets = [fileStyle];

        this.addEventListener("mousedown", ()=>{
            this.onclick()
        })
    }

    onclick(e){
        this.classList.add("selected")
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const fileName = this.getAttribute('fileName') || '';
        
        this.shadowRoot.innerHTML = html(fileName);
    
        this.addEventListener("mousedown", (e)=>{
            this.onclick(e)
        })
    }
}