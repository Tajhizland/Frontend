import {absoluteUrl} from "./seo";

// Only publish contact details actually displayed on the contact/branch pages.
export const localBusinessSchema = {
    "@context": "https://schema.org", "@type": "Store", "@id": absoluteUrl("/#store"),
    name: "تجهیزلند", url: absoluteUrl("/"), image: absoluteUrl("/logo.png"),
    telephone: "+982166477790", email: "support@tajhizland.com",
    address: {"@type": "PostalAddress", addressCountry: "IR", addressLocality: "تهران",
        streetAddress: "خیابان جمهوری، بین دانشگاه و ابوریحان، ضلع شمالی، پلاک ۹۸۱"},
    geo: {"@type": "GeoCoordinates", latitude: 35.69589116711923, longitude: 51.397654536591794},
};
