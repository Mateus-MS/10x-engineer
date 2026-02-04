let container = document.getElementById("icons")

let iconsElements = document.getElementsByClassName("side-menu-icons")
for(let iconElement of iconsElements){
    iconElement.addEventListener("click", (e)=>{
        let prevSelected = getSelectedMenuIconElement()
        prevSelected.classList.remove("selected")
        iconElement.classList.add("selected")
    })
}

function getSelectedMenuIconElement(){
    return document.querySelector("#icons .selected")
}