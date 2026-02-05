const typeMap = new Map();
typeMap.set("py", "python")
typeMap.set("html", "html")
typeMap.set("css", "css")
typeMap.set("js", "javascript")

export function convertExtensionToName(extension){
    return typeMap.get(extension)
}