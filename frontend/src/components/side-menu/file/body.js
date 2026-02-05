import { convertExtensionToName } from "../../../core/utils/extensionToName.js";

export const html = (fileName) => /* html */ `
    <div class="file">
        <img class="file-extension" src="/frontend/public/icons/materials/${convertExtensionToName(fileName.split(".")[1])}.svg">
        ${fileName}
    </div> 
`;