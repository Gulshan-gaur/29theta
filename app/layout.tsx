import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "29θ - Physical Intelligence Robot Training Platform",
  description: "Training Intelligence Through Physical Reality",
  icons: [
    { rel: "icon", url: "/29θ-logo.png", type: "image/png" },
    { rel: "shortcut icon", url: "/29θ-logo.png", type: "image/png" },
    { rel: "apple-touch-icon", url: "/29θ-logo.png", type: "image/png" },
  ],
  openGraph: {
    title: "29θ - Physical Intelligence Robot Training Platform",
    description: "Training Intelligence Through Physical Reality",
    images: [
      {
        url: "https://mqsongdeatils.blob.core.windows.net/seo/video-thumbnail.png",
        width: 512,
        height: 512,
        alt: "29θ Logo",
      },
    ],
    type: "website",
    locale: "en_US",
    siteName: "29θ - Physical Intelligence Robot Training Platform",
  },
  twitter: {
    card: "summary_large_image",
    title: "29θ - Physical Intelligence Robot Training Platform",
    description: "Training Intelligence Through Physical Reality",
    images: ["https://mqsongdeatils.blob.core.windows.net/seo/video-thumbnail.png"],
    creator: "@29theta",
  },
  metadataBase: new URL("https://29theta.com"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon fallback for older browsers */}
        <link rel="icon" href="/29θ-logo.png" type="image/png" />
        <link rel="shortcut icon" href="/29θ-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/29θ-logo.png" type="image/png" />
        {/* SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="robot, AI, training, physical intelligence, robotics, platform, 29θ, Physical AI" />
      </head>
      <body className={`font-sans ${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>{children}</body>
    </html>
  )
}
