import "./globals.css";
import { Rubik } from "next/font/google";
import { LanguageProvider } from "@/context/language";
import Header from "@/components/Header";

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata = {
  title: "Reciply",
  description: "Discover and save your favourite recipes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={rubik.variable}>
      <body className="min-h-screen bg-brand-50 font-sans antialiased">
        <LanguageProvider>
          <Header />
          <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
          <footer className="mt-16 py-6 text-center text-sm text-gray-400 border-t border-orange-50">
            © {new Date().getFullYear()} Reciply
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
