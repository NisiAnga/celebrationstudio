import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://celebrationstudio.lk"),
  title: {
    default: "Celebration Studio | Premium Event & Party Rentals Sri Lanka",
    template: "%s | Celebration Studio Sri Lanka"
  },
  description: "Celebration Studio is Sri Lanka's premier event and party rental service. Rent exquisite wedding backdrops, luxury table settings, sign boards, and custom decor in Terracotta, Blush, Camel, and Olive tones.",
  keywords: [
    "party rentals Sri Lanka",
    "event rentals Colombo",
    "wedding decor rentals Sri Lanka",
    "wedding rentals Colombo",
    "event equipment hire Sri Lanka",
    "luxury event rentals Sri Lanka",
    "backdrop hire Colombo",
    "table setting rentals Sri Lanka",
    "party supplies Colombo",
    "Celebration Studio Sri Lanka"
  ],
  authors: [{ name: "Celebration Studio" }],
  creator: "Celebration Studio",
  publisher: "Celebration Studio",
  openGraph: {
    title: "Celebration Studio | Premium Event & Party Rentals Sri Lanka",
    description: "Rent exquisite wedding backdrops, luxury table settings, and custom event decor. Curating romantic, cozy, and luxury items in Sri Lanka to render your celebrations completely unforgettable.",
    url: "https://celebrationstudio.lk",
    siteName: "Celebration Studio",
    images: [
      {
        url: "/store_cover.png",
        width: 1200,
        height: 630,
        alt: "Celebration Studio - Premium Event & Party Rentals Sri Lanka",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Celebration Studio | Premium Event & Party Rentals Sri Lanka",
    description: "Rent exquisite wedding backdrops, luxury table settings, and custom event decor in Sri Lanka.",
    images: ["/store_cover.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
