import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sneha - Developer, Designer & Creative Thinker",
  description: "Portfolio of Sneha, a developer and designer creating thoughtful digital experiences in Bengaluru, India.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
