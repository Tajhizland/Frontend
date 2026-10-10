export const stripHTML = (html?: string | null) => {
    if (!html) return "";
    let text = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ").replace(/<\/?[^>]+(>|$)/g, " ");
    text = text.replace(/&nbsp;/g, ' ');
    text = text.replace(/&zwnj;/g, '\u200c');
    text = text.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    text = text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'");
    text = text.replace(/&#(x[0-9a-f]+|\d+);/gi, (match, code: string) => {
        const value = code[0].toLowerCase() === "x" ? parseInt(code.slice(1), 16) : Number(code);
        return value > 0 && value <= 0x10ffff ? String.fromCodePoint(value) : match;
    });
    return text;
};
