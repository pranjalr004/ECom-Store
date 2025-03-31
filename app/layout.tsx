import type { Metadata } from "next";
import "./globals.css";
import {Inter} from "next/font/google"
import {Toaster} from "@/components/ui/Toaster"

const inter=Inter({subsets:["latin"]})


export const metadata: Metadata = {
  title: "OneEntry Ecommerce App",
  description: "Created By Pranjal Rai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-900">
      <body className={inter.className}>
        <main className="bg-gray-900">{children}</main>
        <Toaster/>
      </body>
    </html>
  );
}
