import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "Celebration Studio - Exquisite Event Rentals & Designs",
  description: "Curating romantic, cozy, and luxury items in Terracotta, Blush, Camel, and Olive tones to render your special weddings and celebrations completely unforgettable.",
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
