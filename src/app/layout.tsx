import type { Metadata } from "next";
import "primereact/resources/themes/lara-light-blue/theme.css"; // Elige tu tema
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./globals.css";


export const metadata: Metadata = {
  title: "UI Forge",
  description:
    "UI Forge is a collection of UI components and utilities for building modern web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
