export async function highlightCode(rawCode, lang) {
    if (!Prism.languages[lang]) {
        await new Promise((resolve) => {
            Prism.plugins.autoloader.loadLanguages(lang, () => resolve());
        });
    }

    const highlighted = Prism.highlight(rawCode, Prism.languages[lang], lang);
    
    // Split by newline to get an array of highlighted lines
    return highlighted.split('\n');
}