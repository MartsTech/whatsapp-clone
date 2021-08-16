import { DefaultSeoProps } from "next-seo";

export const baseUrl = "https://whatsapp-clone-martstech.vercel.app";

export const defaultSEO: DefaultSeoProps = {
  title: "Whatsapp Clone",
  description:
    "WhatsApp Messenger: More than 2 billion people in over 180 countries use WhatsApp to stay in touch with friends and family, anytime and anywhere. WhatsApp is free and offers simple, secure, reliable messaging and calling, available on phones all over the world.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    site_name: "Whatsapp Clone",
    images: [
      {
        url: `${baseUrl}/meta/og-image.png`,
        alt: "Whatsapp Clone",
      },
    ],
  },
};
