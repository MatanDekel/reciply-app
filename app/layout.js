import "./globals.css";
import { LanguageProvider } from "@/context/language";
import Header from "@/components/Header";

export const metadata = {
  title: "Reciply",
  description: "Discover and save your favourite recipes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-brand-50 font-sans antialiased">
        <LanguageProvider>
          <Header />
          <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="mt-16 py-6 text-center text-sm text-gray-400 border-t border-orange-50">
      © {new Date().getFullYear()} Reciply
    </footer>
  );
}
