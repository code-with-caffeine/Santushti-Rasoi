// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Santushti Rasoi | Artisan Indian Sweets",
//   description:
//     "Santushti Rasoi premium handcrafted mithai and dry sweets, rooted in tradition and delivered with care.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html
//       lang="en"
//       className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
//     >
//       <body className="min-h-full flex flex-col">{children}</body>
//     </html>
//   );
// }
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './styles/globals.css';
import './styles/responsive.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-jost',
});

export const metadata = {
  title: 'Santushti Rasoi — Artisan Indian Sweets, Jamshedpur',
  description: 'Handcrafted Indian sweets and premium dry sweets, made with century-old recipes passed down through generations.',
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return ( 
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}
