import { SideIcon } from "../../side-icon/side-icon.js";
import { css } from "./style.js"

const iconStyles = new CSSStyleSheet();
iconStyles.replaceSync(css());

export class SideMenuIcon extends SideIcon {
    constructor() {
        super();
        this.shadowRoot.adoptedStyleSheets.push(iconStyles);

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

}