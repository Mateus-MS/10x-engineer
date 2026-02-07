import { highlightCode } from "../utils/codeHighligther.js"

const tabHolder = document.getElementById("nav-bar")
if (!tabHolder) throw new Error("tab holder not found")
    
const contentHolder = document.getElementById("content")
if (!contentHolder) throw new Error("content holder not found")

class Levels{
    constructor(name, parent, content){
        this.name = name;
        this.content = content;
        this.linesCount = this.content.split('\n').length + 2;
        this.parent = parent;

        this.isOpen = false;

        this.treeElement = this.createTreeItem();
        this.tabElement = null;
    }

    async loadContent(){
        const highlightedLines = await highlightCode(this.content, 'python');
        let rawText = this.content.split("\n")

        contentHolder.innerHTML = highlightedLines
            .map((line, index) => {
                const lineNumber = index + 1; 

                return `<div class="code-line reveal ${lineNumber == 1 ? "selected" : ""}" data-line="${lineNumber}" data-text='${rawText[index]}'>${line || ' '}</div>`;
            })
            .join('');
    }

    onTreeItemClick(e){
        // De-select all others
        tabHolder.querySelectorAll(".selected").forEach(i => i.classList.remove('selected'));
        this.loadContent();
        
        if(this.isOpen) {
            this.tabElement.classList.add("selected")
            return
        }

        this.createTabItem();
        this.isOpen = true;
    }

    onTabItemClick(e){
        // De-select all others
        tabHolder.querySelectorAll(".selected").forEach(i => i.classList.remove('selected'));

        this.tabElement.classList.add("selected")
        this.loadContent();
    }

    closeTab(e){
        // If closing the opened tab
        if(e.target.classList.contains("selected")){
            // And has any other tab open, select the closest sibling
            let closestSibling = e.target.nextElementSibling || e.target.previousElementSibling;
            if(closestSibling){
                closestSibling._levelInstance.onTabItemClick();
            } else {
                contentHolder.innerHTML = ""
            }
        }

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
        this.tabElement._levelInstance = this;

        this.tabElement.addEventListener('tab-close', (e) => {
            this.closeTab(e);
        });
        this.tabElement.addEventListener('click', (e)=>{
            this.onTabItemClick(e);
        })

        tabHolder.appendChild(this.tabElement);
    }
}

async function startLevel() {
    new Levels(
        "variables.py", 
        document.getElementById("1-1"),
        `# --- BASIC DATA TYPES ---d
name = "Alex"           # String
age = 25                # Integer
score = 88.5            # Float
is_active = True        # Boolean

# --- STRING OPERATIONS ---
greeting = "Hello " + name
print(greeting)

# --- MATH AND UPDATES ---
age = age + 1           # Incrementing
health = 100
damage = 20
current_health = health - damage

# --- LISTS (GROUPING VARIABLES) ---
inventory = ["sword", "shield", "map"]
item_count = len(inventory)

# --- FORMATTING OUTPUT ---
print(f"Status: {name}")
print(f"Level: {age}")
print(f"Health: {current_health}")
print(f"Items: {item_count}")

# --- TYPE DYNAMICS ---
# Variables can be redefined with different types
data = 10
print(data)

data = "Now I am a string"
print(data)

# --- CONSTANTS ---
# Use uppercase for values that shouldn't change
PI = 3.14159
MAX_CONNECTIONS = 5

# --- CALCULATIONS ---
radius = 5
area = PI * (radius ** 2)
print(f"Circle Area: {area}")

# --- LOGIC CHECK ---
can_enter = is_active and (age > 18)
print(f"Access granted: {can_enter}")

# --- NULL VALUES ---
# Use None to represent 'nothing'
player_target = None`);

    new Levels(
        "operators.py", 
        document.getElementById("1-1"),
        "teste2"
    )

    new Levels(
        "index.html", 
        document.getElementById("1-2"),
        "teste3"
    )
}

startLevel();

let lineIndex = 0;

let charIndex = 0;
let firstLetter = null;

window.addEventListener("keydown", (e) => {
    let line = contentHolder.children[lineIndex];
    let lineLength = line.innerText.length;

    if(charIndex >= lineLength){
        contentHolder.children[lineIndex].classList.remove("selected")
        
        lineIndex += 1;
        contentHolder.children[lineIndex].classList.add("selected")

        charIndex = 0;
        firstLetter = null;
        return
    }

    if(firstLetter === null){
        firstLetter = getCharPosition(line, 0);
    }

    let cursor = charIndex === 0 ? firstLetter : getCharPosition(line, charIndex);

    let pixelOffset = cursor.x - firstLetter.x + cursor.w;

    line.style.setProperty('--progress-px', `${pixelOffset}px`);

    charIndex += 1;
});

function getCharPosition(container, targetIndex) {
    const range = document.createRange();
    let currentPos = 0;
    let found = false;

    // We need to loop through all text nodes inside the div
    const traverse = (node) => {
        if (found) return;

        if (node.nodeType === Node.TEXT_NODE) {
            const len = node.textContent.length;
            if (currentPos + len > targetIndex) {
                // The character is in THIS text node
                range.setStart(node, targetIndex - currentPos);
                range.setEnd(node, targetIndex - currentPos + 1);
                found = true;
            } else {
                currentPos += len;
            }
        } else {
            for (let child of node.childNodes) {
                traverse(child);
            }
        }
    };

    traverse(container);

    if (found) {
        const rect = range.getBoundingClientRect();
        return {
            x: rect.right + window.scrollX,
            y: rect.top + window.scrollY,
            w: rect.width
        };
    }
    return null; 
}