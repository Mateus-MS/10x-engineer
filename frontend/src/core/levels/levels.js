import { highlightCode } from "../utils/codeHighligther.js"
// import { getRandom } from "../utils/random.js"

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

        contentHolder.innerHTML = highlightedLines
            .map((line, index) => {
                const lineNumber = index + 1; 

                return `<div class="code-line ${lineNumber == 1 ? "selected" : ""}" data-line="${lineNumber}"><div class="color"></div><div class="gray">${line || ' '}</div></div>`;
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
        ""
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

window.addEventListener("keydown", (e) => {
    let line = contentHolder.children[lineIndex];

    let color = line.children[0]
    let gray = line.children[1]

    let lineLength = line.innerText.length;

    keepLineAbovePercentage(line.parentElement, line)

    moveFirstChar(gray, color)
    // if(!contentHolder.classList.contains('shake-effect') && getRandom(0, 3) === 0){
    //     contentHolder.classList.add('shake-effect')
    //     setTimeout(() => {
    //         contentHolder.classList.remove('shake-effect');
    //     }, 500);
    // }

    if(charIndex >= lineLength){
        contentHolder.children[lineIndex].classList.remove("selected")
        
        lineIndex += 1;
        contentHolder.children[lineIndex].classList.add("selected")

        charIndex = 0;
        return
    }

    charIndex += 1;
});

function keepLineAbovePercentage(parent, child, percent = 0.8, smooth = true) {
  const parentHeight = parent.clientHeight;
  const childOffsetTop = child.offsetTop;

  // target position so child.top == 80% of parent height
  const targetScrollTop = childOffsetTop - parentHeight * percent;

  parent.scrollTo({
    top: Math.max(0, targetScrollTop),
    behavior: smooth ? 'smooth' : 'auto'
  });
}

function moveFirstChar(fromEl, toEl) {
    function findFirstTextNode(node) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.length > 0) {
            return node;
        }
        for (let child of node.childNodes) {
            const found = findFirstTextNode(child);
            if (found) return found;
        }
        return null;
    }

    function sameElement(a, b) {
        if (!a || !b) return false;
        if (a.nodeType !== 1 || b.nodeType !== 1) return false;
        if (a.tagName !== b.tagName) return false;
        return a.className === b.className;
    }

    const textNode = findFirstTextNode(fromEl);
    if (!textNode) return;

    const char = textNode.textContent[0];
    textNode.textContent = textNode.textContent.slice(1);

    let current = textNode;
    let chain = [];

    while (current !== fromEl) {
        if (current.nodeType === 1) chain.push(current);
        current = current.parentNode;
    }

    chain = chain.reverse();

    if (chain.length === 0) {
        const last = toEl.lastChild;
        if (last && last.nodeType === Node.TEXT_NODE) {
            last.textContent += char;
        } else {
            toEl.appendChild(document.createTextNode(char));
        }
        return;
    }

    let parent = toEl;

    const firstWrapper = chain[0];
    const tailElement = toEl.lastElementChild;

    let startIndex = 0;

    const canMerge =
        sameElement(tailElement, firstWrapper) &&
        toEl.lastChild === tailElement;

    if (canMerge) {
        parent = tailElement;
        startIndex = 1;
    }

    for (let i = startIndex; i < chain.length; i++) {
        const clone = chain[i].cloneNode(false);
        parent.appendChild(clone);
        parent = clone;
    }

    const lastNode = parent.lastChild;
    if (lastNode && lastNode.nodeType === Node.TEXT_NODE) {
        lastNode.textContent += char;
    } else {
        parent.appendChild(document.createTextNode(char));
    }

    let n = textNode;
    while (n && n !== fromEl) {
        const p = n.parentNode;
        if (n.nodeType === Node.TEXT_NODE && n.textContent === "") {
            p.removeChild(n);
        } else if (n.nodeType === 1 && n.childNodes.length === 0) {
            p.removeChild(n);
        }
        n = p;
    }
}