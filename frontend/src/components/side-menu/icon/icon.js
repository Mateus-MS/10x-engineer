import { html } from "./body.js"
import { css } from "./style.js"

const iconStyles = new CSSStyleSheet();
iconStyles.replaceSync(css());

export class SideMenuIcon extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        // Attach the shared stylesheet
        this.shadowRoot.adoptedStyleSheets = [iconStyles];

        this.addEventListener("click", ()=>{
            this.onclick()
        })
    }

    static get observedAttributes() {
        return ['icon', 'selected'];
    }

    attributeChangedCallback() {
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    onclick(){
        document.querySelectorAll("side-menu-icon").forEach(i => i.removeAttribute('selected'));
        this.setAttribute('selected', '');
    }

    render() {
        const icon = this.getAttribute('icon') || '';
        
        this.shadowRoot.innerHTML = html(icon);
    }
}