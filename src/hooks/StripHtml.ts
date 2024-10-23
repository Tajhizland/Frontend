export const stripHTML = (html:string) => {
    if (!html)
        return  html;
    let text = html.replace(/<\/?[^>]+(>|$)/g, "");
    text = text.replace(/&nbsp;/g, ' ');
    text = text.replace(/&zwnj;/g, '');
    return text;
};
