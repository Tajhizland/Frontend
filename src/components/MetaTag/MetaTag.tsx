import Head from "next/head";

export default function MetaTag(
    {
        description,
        canonical,
        robots="index, follow",
        title,
        structuredData,
    }
        :
        {
            description: string,
            title: string
            canonical?: string
            robots?: string
            structuredData?: string
        }
) {

    return (<Head>
        <meta name="developer" content="Mehran Sobhani - mehransobhani77@gmail.com"/>

        <title>{title}</title>
        <meta name="description" content={description} />
        {
            canonical && <link rel="canonical" href={canonical}/>
        }
        <meta name="robots" content={robots}/>

        <meta name="twitter:title" content="تجهیزلند"/>
        <meta name="twitter:description"
              content="فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و..."/>

        <meta property="og:title" content="تجهیزلند"/>
        <meta property="og:description"
              content="فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و..."/>
        <meta property="og:type" content="website"/>
        <meta property="og:country_name" content="iran"/>
        <meta property="og:phone_numbers" content="02166477790,02166477791"/>

        {structuredData && <script type="application/ld+json">
            {structuredData}
        </script>}

    </Head>)
}
