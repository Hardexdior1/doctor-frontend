import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { AuthProvider } from "./context/AuthContext";
import ClientLayout from "./clientLayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Medicare- Book Trusted Doctors Online",
  description: "Find and book certified doctors, read patient reviews, and manage appointments easily on our trusted medical platform.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <AuthProvider>


       <ClientLayout>
       <main>
        {children}
        </main>
       </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
