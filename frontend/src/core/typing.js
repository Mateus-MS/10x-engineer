import { moveFirstChar } from "./utils/moveFirstChar.js";

const tabHolder = document.getElementById("nav-bar")
if (!tabHolder) throw new Error("tab holder not found")

const contentHolder = document.getElementById("content")
if (!contentHolder) throw new Error("content holder not found")

window.addEventListener("keydown", (e) => {
  if (e.repeat) return;

  const openTab = tabHolder.querySelector(".selected")

  let line = contentHolder.children[openTab.lineIndex];

  let color = line.children[0]
  let gray = line.children[1]

  let lineLength = line.innerText.length;

  keepLineAbovePercentage(line.parentElement, line)

  moveFirstChar(gray, color)

  if(openTab.charIndex >= lineLength){
      contentHolder.children[openTab.lineIndex].classList.remove("selected")
      
      contentHolder.children[openTab.lineIndex + 1].classList.add("selected")
      return
  }

  openTab.charCount += 1;
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