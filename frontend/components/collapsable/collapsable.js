import { html } from "./body.js"
import { css } from "./style.js"

const collapseStyles = new CSSStyleSheet();
collapseStyles.replaceSync(css());

class Collapse extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: "open"})

        this.shadowRoot.adoptedStyleSheets = [collapseStyles];
    }

    onclick(e){
        document.getElementById("menus").querySelectorAll(".selected").forEach(i => i.classList.remove('selected'));
        if(e.target.classList.contains("file")){
            e.target.classList.add("selected") 
            return
        }
        if (e.target !== this) return;
        if (e) e.stopPropagation();

        this.classList.add("selected") 
        this.classList.toggle("opened");
    }

    connectedCallback(){
        this.titleValue = this.getAttribute('title') || ""

        this.render();

        // Count how deep this element is on tree
        let parent = this.parentElement;
        let deepeness    = 0;
        while(parent.id !== "menus"){
            parent = parent.parentElement;
            deepeness += 1;
        }

        this.style.setProperty('--deepeness', `${deepeness}`);

        this.addEventListener("mousedown", (e)=>{
            this.onclick(e)
        })
    }

    render(){
        this.shadowRoot.innerHTML = html(this.titleValue);
    }

}

customElements.define('div-collapsable', Collapse);