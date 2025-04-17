import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
  import { QueryClientProvider } from "./provider";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <QueryClientProvider>
        {children}
        </QueryClientProvider>
       
      </body>
    </html>
  );
}
