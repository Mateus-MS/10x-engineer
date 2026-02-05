export const css = () => /* css */ `
    .header{
        display: flex;
        align-items: center;
        justify-content: center;
        
        color: rgb(177, 177, 177);
        cursor: pointer;
        user-select: none;
        position: relative;

        background-color: red;
    }
    
    .title {
        width: 100%;
        font-weight: 100;
        font-size: 1.1em;
        margin: .3em 0;
    }
    
    .arrow{
        /* I was trying to build a recursive tree where nested components used padding for indentation. 
           This created a "staircase effect" that broke my full-width hover states. */
        margin-left: calc(var(--deepeness) * 1.5em);
        font-family: 'icons';
        margin-right: .5em;
        transform: rotate(0deg);
    }
    :host(.opened) .arrow{
        transform: rotate(90deg);
    }
    
    :host(.opened) slot{
        display: block;
    }
    slot {
        display: block;
        display: none;
        background-color: yellow;
    }
`;