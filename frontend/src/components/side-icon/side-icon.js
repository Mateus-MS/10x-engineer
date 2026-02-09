import { html } from "./body.js"
import { css } from "./style.js"

const iconStyles = new CSSStyleSheet();
iconStyles.replaceSync(css());

export class SideIcon extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        // Attach the shared stylesheet
        this.shadowRoot.adoptedStyleSheets = [iconStyles];

        this.addEventListener("click", ()=>{
            this.onclick()
        })
    }

    connectedCallback() {
        this.render();
    }

    onclick(){
        console.log("Not overrided")
    }

    render() {
        const icon = this.getAttribute('icon') || '';
        
        this.shadowRoot.innerHTML = html(icon);
    }
}

customElements.define('side-icon', SideIcon);