const collapseStyles = new CSSStyleSheet();
collapseStyles.replaceSync(`
    .header{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5em;
        color: rgb(177, 177, 177);
        cursor: pointer;
    }

    .title {
        width: 100%;
        font-weight: 100;
        font-size: 1.1em;
    }

    .arrow{
        font-family: 'icons';
        margin-right: .5em;
    }
`);


class Collapse extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})

        this.shadowRoot.adoptedStyleSheets = [collapseStyles];
    }

    connectedCallback(){
        this.titleValue = this.getAttribute('title') || ""

        this.render();
    }

    render(){
        this.shadowRoot.innerHTML = `
            <div class="header">
                <span class="arrow">&#xE800;</span>
                <h2 class="title">${this.titleValue}</h2>
            </div>
            <slot></slot>
        `;
    }
}

customElements.define('div-collapsable', Collapse);