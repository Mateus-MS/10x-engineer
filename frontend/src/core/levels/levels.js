const tabHolder = document.getElementById("nav-bar")
if (!tabHolder) throw new Error("tab holder not found")

class Levels{
    constructor(name, parent, content){
        this.name = name;
        this.content = content;
        this.parent = parent;

        this.isOpen = false;

        this.treeElement = this.createTreeItem();
        this.tabElement = null;
    }

    onTreeItemClick(e){
        // De-select all others
        tabHolder.querySelectorAll(".selected").forEach(i => i.classList.remove('selected'));
        
        if(this.isOpen) {
            this.tabElement.classList.add("selected")
            return
        }


        this.createTabItem();
        this.isOpen = true;
    }

    closeTab(e){
        e.target.parentNode.removeChild(e.target)
        this.isOpen = false;
    }

    createTreeItem(){
        const treeElement = document.createElement("div-file")
        treeElement.setAttribute("fileName", this.name)
        treeElement.addEventListener("click", (e)=>{
            this.onTreeItemClick(e);
        })

        this.parent.appendChild(treeElement);
        return treeElement;
    }

    createTabItem(){
        this.tabElement = document.createElement("div-tab")
        this.tabElement.setAttribute("fileName", this.name)
        this.tabElement.classList.add("selected")

        this.tabElement.addEventListener('tab-close', (e) => {
            this.closeTab(e);
        });

        tabHolder.appendChild(this.tabElement);
    }
}

new Levels(
    "variables.py", 
    document.getElementById("1-1"),
    "teste"
)
new Levels(
    "operators.py", 
    document.getElementById("1-1"),
    "teste"
)