export function moveFirstChar(fromEl, toEl) {
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