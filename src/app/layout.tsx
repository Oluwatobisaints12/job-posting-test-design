import type { Metadata } from "next";
import "./globals.css";
import { QueryClientProvider } from "./provider";

// Import common layout components
import Header from "./components/header";
import SubHeader from "./components/sub-header";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "Africa Business Radio",
  description: "Listen to the best podcasts from Africa Business Radio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider>
          <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <SubHeader />
            <main className="flex-grow bg-white">
              {children}
            </main>
            <Footer />
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
