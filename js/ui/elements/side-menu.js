const iconsContainer = document.getElementById("icons")
if (!iconsContainer) throw new Error("Icons container not found")

const sideMenuStyles = new CSSStyleSheet();
sideMenuStyles.replaceSync(`
    .title {
        width: 100%;
        margin-bottom: 1.5em;
        color: rgb(177, 177, 177);
        font-weight: 100;
        font-size: 1.1em;
    }
`);

class SideMenu extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})

        this.shadowRoot.adoptedStyleSheets = [sideMenuStyles];
        
        this.iconElement = null;

        // Attributes
        this.titleValue = null;
    }

    connectedCallback(){
        const iconValue = this.getAttribute('icon')
        this.titleValue = this.getAttribute('title') || ""

        this.iconElement = document.createElement('side-menu-icon');
        this.iconElement.setAttribute("icon", iconValue)

        iconsContainer.appendChild(this.iconElement)

        this.render();
    }

    disconnectedCallback(){
        if (this.iconElement) {
            this.iconElement.remove();
        }
    }

    render(){
        this.shadowRoot.innerHTML = `
            <h2 class="title">${this.titleValue}</h2>
            <slot></slot>
        `;
    }
}

customElements.define('side-menu', SideMenu);