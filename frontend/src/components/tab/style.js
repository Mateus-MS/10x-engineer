export const css = () => /* css */ `
    .tab{
        display: flex;
        align-items: center;
        width: fit-content;
        height: 100%;
        padding: .5em .7em;
        box-sizing: border-box;
        border: 1px solid rgb(177, 177, 177);
        color: rgb(177, 177, 177);
        font-weight: 100;
        font-size: 1.1rem;
        user-select: none;
        cursor: pointer;
    }

    :host(.selected) .tab{
        border: 1px solid transparent !important;
        background-color: #282828 !important;
        color: white !important;

        position: relative;
    }
    :host(.selected) .tab::after{
        content: "";
        position: absolute;
        top: 0;
        left: -1px;
        width: calc(100% + 2px);
        border-top: 2px solid #0078d4;
    }

    .tab:hover{
        background-color: #282828;
    }

    .tab:hover > button{
        opacity: 1;
        pointer-events: auto;
        cursor: pointer;
    }
    .tab > button {
        opacity: 0;
        pointer-events: none;
        margin-left: 1em;
        font-family: icons;
        height: 100%;
        aspect-ratio: 1/1;
        background-color: transparent;
        border: none;
        color: rgb(177, 177, 177);
        border-radius: 5px;
    }
    .tab > button:hover{
        background-color: rgb(56, 56, 56);
        color: rgb(177, 177, 177);
    }

    .file-extension {
        font-family: "icons";
        width: 17px;
        aspect-ratio: 1/1;
        margin-right: .5em;
    }
`;