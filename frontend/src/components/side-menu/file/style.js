export const css = () => /* css */ `
    .file {
        font-weight: 100;
        font-size: 1.1rem;
        color: rgb(177, 177, 177);
        padding: .3em 0;
        border: 1px solid transparent;
        /* TEMP */
        padding-left: 1.5em;

        display: flex;
        align-items: center;
        user-select: none;

        /* 1. Reset the "staircase": pull the background back to the far left */
        margin-left: calc(var(--deepeness) * -1.5em);
        
        /* 2. Re-apply the visual indentation to the icons/text only */ 
        padding-left: calc((var(--deepeness) + 1) * 1.5em);
    }

    :host(.selected) .file{
        border: 1px solid #0078d4 !important;
        background: #04395e !important;
        color: white !important;
    }
    .file:hover{
        background-color: rgb(82, 82, 82);
    }

    .file-extension {
        font-family: "icons";
        width: 17px;
        aspect-ratio: 1/1;
        margin-right: .5em;
    }
`