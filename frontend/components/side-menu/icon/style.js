export const css = () => /* css */ `
    :host {
        display: block;
        width: 100%;
    }

    .button {
        width: 100%;
        aspect-ratio: 1/1;
        background-color: transparent;
        border: none;
        cursor: pointer;
        display: grid;
        place-items: center;
        color: gray;
        position: relative;
        transition: color .3s ease-out;
        outline: none;
    }

    /* The blue selection bar using pseudo-element */
    .button::after {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        pointer-events: none; /* Let clicks pass through */
        border-left: 3px solid transparent;
        transition: border-color .3s ease-out;
    }

    /* Icon logic */
    .icon-wrapper {
        width: 40%;
        height: 40%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform .3s ease-out;
        transform: scale(1);
    }

    /* Interaction States */
    .button:hover,
    :host([selected]) .button {
        color: white;
    }

    :host([selected]) .button::after {
        border-left: 3px solid #0078d4;
    }

    :host([selected]) .icon-wrapper {
        transform: scale(1.125);
    }

    /* Font Icon Support */
    span {
        font-family: 'icons';
        font-size: 1.5rem;
        font-style: normal;
    }
`