const iconStyles = new CSSStyleSheet();
iconStyles.replaceSync(`
    :host {
        display: block;
        width: 100%;
    }

    .button {
        width: 100%;
        aspect-ratio: 1/1;
        background-color: transparent;
        border: none;
        cursor: pointer;
        display: grid;
        place-items: center;
        color: gray;
        position: relative;
        transition: color .3s ease-out;
        outline: none;
    }

    /* The blue selection bar using pseudo-element */
    .button::after {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        pointer-events: none; /* Let clicks pass through */
        border-left: 3px solid transparent;
        transition: border-color .3s ease-out;
    }

    /* Icon logic */
    .icon-wrapper {
        width: 40%;
        height: 40%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform .3s ease-out;
        transform: scale(1);
    }

    /* Interaction States */
    .button:hover,
    :host([selected]) .button {
        color: white;
    }

    :host([selected]) .button::after {
        border-left: 3px solid rgb(90, 90, 255);
    }

    :host([selected]) .icon-wrapper {
        transform: scale(1.125);
    }

    /* Font Icon Support */
    span {
        font-family: 'icons';
        font-size: 1.5rem;
        font-style: normal;
    }
`);

class SideMenuIcon extends HTMLElement {
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
        let allIcons = document.querySelectorAll("side-menu-icon")
        
        allIcons.forEach(i => i.removeAttribute('selected'));
        this.setAttribute('selected', '');
    }

    render() {
        const icon = this.getAttribute('icon') || '';
        
        this.shadowRoot.innerHTML = `
            <button class="button" role="tab">
                <div class="icon-wrapper">
                    <span>${icon}</span>
                </div>
            </button>
        `;
    }
}

customElements.define('side-menu-icon', SideMenuIcon);