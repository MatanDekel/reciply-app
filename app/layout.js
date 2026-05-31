import "./globals.css";

export const metadata = {
  title: "Reciply",
  description: "Discover and save your favourite recipes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-brand-50 font-sans antialiased">
        <header className="bg-white border-b border-orange-100 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-2">
            <span className="text-2xl">🍳</span>
            <span className="text-xl font-bold text-brand-600 tracking-tight">Reciply</span>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        <footer className="mt-16 py-6 text-center text-sm text-gray-400 border-t border-orange-50">
          © {new Date().getFullYear()} Reciply
        </footer>
      </body>
    </html>
  );
}
