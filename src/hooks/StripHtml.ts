export const stripHTML = (html:string) => {
    let text = html.replace(/<\/?[^>]+(>|$)/g, "");
    text = text.replace(/&nbsp;/g, ' ');
    text = text.replace(/&zwnj;/g, '');
    return text;
};
