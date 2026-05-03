import "./globals.css";

export const metadata = {
  title: "Inventaris Maju Jaya",
  description: "Aplikasi inventaris UMKM Maju Jaya",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
