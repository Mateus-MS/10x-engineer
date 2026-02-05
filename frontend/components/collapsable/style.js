export const css = () => /* css */ `
    :host {
        display: block;
        width: 100%;
    }
    .header{
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid transparent;
        
        background-color: #1D1D1D;
        color: rgb(177, 177, 177);
        cursor: pointer;
        user-select: none;
        position: relative;

        /* 1. Reset the "staircase": pull the background back to the far left */
        margin-left: calc(var(--deepeness) * -1.5em);
        
        /* 2. Re-apply the visual indentation to the icons/text only */ 
        padding-left: calc(var(--deepeness) * 1.5em);
    }

    :host(.selected) .header{
        border: 1px solid #0078d4 !important;
        background: #04395e !important;
        color: white !important;
    }

    .header:hover{
        background-color: rgb(82, 82, 82);
    }
    
    .title {
        width: 100%;
        font-weight: 100;
        font-size: 1.1em;
        margin: .3em 0;
    }
    
    .arrow{
        /* TEMP */
        margin-left: 1.5em;
        font-family: 'icons';
        margin-right: .5em;
        transform: rotate(-90deg);
    }
    :host(.opened) .arrow{
        transform: rotate(0deg);
    }
    
    :host(.opened) slot {
        display: block;
    }

    slot {
        display: none;
        cursor: pointer;
        padding-left: 1.5em;
    }
`;