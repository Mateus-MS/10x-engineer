export const html = (title) => /* html */ `
    <div class="header">
        <span class="arrow">&#xE800;</span>
        <h2 class="title">${title}</h2>
    </div>
    <slot></slot>
`;