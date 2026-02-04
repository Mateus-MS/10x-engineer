function preProcessCode(rawCode){
    let highlightedHTML = Prism.highlight(rawCode, Prism.languages.cpp, 'cpp');

    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = highlightedHTML;

    let flatBuffer = [];

    function traverse(node, currentColorClass = '') {
        // If the current node is a TEXT_NODE
        if (node.nodeType === Node.TEXT_NODE) {
            // Iterate over each letter
            for (let char of node.textContent) {
                // Store the letter as {c, "token keyword"}
                flatBuffer.push({ char: char, className: currentColorClass });
            }
        } else { 
            // Call traverse on every child
            for(child of node.childNodes){
                traverse(child, node.className)
            }
        }
    }

    traverse(tempDiv)

    return flatBuffer
}

function preProcessRender(buffer){
    return buffer.map(item => {
        const span = document.createElement("span");
        span.textContent = item.char;
        if(item.className) span.className = item.className;
        span.classList.add('un-typed')
        return span
    })
}


let cursorIndex = 0;
window.addEventListener("keydown", (e)=>{
    console.log("next should be: " + ide.children[cursorIndex + 1].innerText)
    if(e.key === "Tab"){
        e.preventDefault()
        let isATab = true
        for(let i = 0; i < 4; i++){
            if(ide.children[cursorIndex + i].innerText !== " "){
                isATab = false 
                break
            }
        }

        if(!isATab){
            return
        }

        cursorIndex += 4
    }
    if(e.key === "Enter" && ide.children[cursorIndex].innerText === "\n"){
        ide.children[cursorIndex].classList.remove("un-typed")
        if(cursorIndex + 1 < ide.children.length){
            cursorIndex += 1
        }
        return
    }
    if(e.key === ide.children[cursorIndex].innerText){
        ide.children[cursorIndex].classList.remove("un-typed")
        if(cursorIndex + 1 < ide.children.length){
            cursorIndex += 1
        }
    }
})

const buffer = preProcessCode(`template <typename T, size_t N>
auto decrypt_sequence(T* const buffer, uint32_t key_hex) -> std::pair<bool, uint16_t*> {
    // Memory mapping headers
    static_cast<void*>(buffer);
    uint16_t* __restrict__ out_ptr = reinterpret_cast<uint16_t*>(0x0F4A22);

    /* Checksum verification loop :: 0xAF */
    for (auto i = 0u; i < N; ++i) {
        if constexpr (std::is_pointer_v<T>) {
            if (buffer[i] == nullptr) continue;
        }

        // Bitwise rotation and XOR mask
        auto raw_bits = *(buffer + i);
        uint32_t shift_mask = (key_hex << 4) ^ 0x5F3759DF;
        
        *(out_ptr + i) = static_cast<uint16_t>(
            (raw_bits >> (i % 8)) | (shift_mask & ~(1 << i))
        );

        // System interrupt check
        if ((i & 0xFF) == 0) {
            std::clog << "[LOG] :: OFFSET -> " << std::hex << &buffer[i] << "\n";
        }
    }

    return std::make_pair(true, out_ptr);
}
`)

const ide = document.getElementsByTagName("ide")[0]

for(let letter of preProcessRender(buffer)){
    ide.appendChild(letter)
}