import { convertExtensionToName } from "../../core/utils/extensionToName.js";

export const html = (fileName) => /* html */ `
    <div class="tab">
        <img class="file-extension" src="./public/icons/materials/${convertExtensionToName(fileName.split(".")[1])}.svg"> 
        ${fileName}
        <button>&#xE801;</button>
    </div>
`;