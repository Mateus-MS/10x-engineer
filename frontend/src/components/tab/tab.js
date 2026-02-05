import { html } from './body.js';
import { css } from './style.js';

const tabStyles = new CSSStyleSheet();
tabStyles.replaceSync(css());

class Tab extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})

        this.shadowRoot.adoptedStyleSheets = [tabStyles];
    }

    onclick(e){
    }

    connectedCallback(){
        this.render();

        // Listen for the button click inside Shadow DOM
        const closeBtn = this.shadowRoot.querySelector('button');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the tab selection click
            
            // Dispatch a custom event that the orchestrator can hear
            this.dispatchEvent(new CustomEvent('tab-close', {
                detail: { fileName: this.getAttribute('fileName') },
                bubbles: true,    // Allows it to move up the DOM tree
                composed: true    // Allows it to cross the Shadow DOM boundary
            }));
        });
    }

    render(){
        const fileName = this.getAttribute('fileName') || '';
        
        this.shadowRoot.innerHTML = html(fileName);
    }
}

customElements.define('div-tab', Tab);