import { moveFirstChar } from "./utils/moveFirstChar.js";

const contentHolder = document.getElementById("content")
if (!contentHolder) throw new Error("content holder not found")

let lineIndex = 0;
let charIndex = 0;

window.addEventListener("keydown", (e) => {
    if (e.repeat) return;

    let line = contentHolder.children[lineIndex];

    let color = line.children[0]
    let gray = line.children[1]

    let lineLength = line.innerText.length;

    keepLineAbovePercentage(line.parentElement, line)

    moveFirstChar(gray, color)

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