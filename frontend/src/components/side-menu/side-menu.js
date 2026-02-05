import { html } from './body.js';
import { css } from './style.js';
import { SideMenuIcon } from './icon/icon.js';
import { File } from './file/file.js';

const iconsContainer = document.getElementById("icons")
if (!iconsContainer) throw new Error("Icons container not found")

const sideMenuStyles = new CSSStyleSheet();
sideMenuStyles.replaceSync(css());

class SideMenu extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})

        this.shadowRoot.adoptedStyleSheets = [sideMenuStyles];
        
        this.iconElement = null;

        // Attributes
        this.titleValue = null;
    }

    onclick(e){
        document.getElementById("menus").querySelectorAll(".selected").forEach(i => i.classList.remove('selected'));
        e.target.classList.add("selected") 
    }

    connectedCallback(){
        const iconValue = this.getAttribute('icon')
        this.titleValue = this.getAttribute('title') || ""

        this.iconElement = document.createElement('side-menu-icon');
        this.iconElement.setAttribute("icon", iconValue)

        iconsContainer.appendChild(this.iconElement)

        this.render();

        this.addEventListener("mousedown", (e)=>{
            this.onclick(e);
        })
    }

    disconnectedCallback(){
        if (this.iconElement) {
            this.iconElement.remove();
        }
    }

    render(){
        this.shadowRoot.innerHTML = html(this.titleValue);
    }
}

customElements.define('side-menu-icon', SideMenuIcon);
customElements.define('side-menu', SideMenu);

customElements.define('div-file', File);