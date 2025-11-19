import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "TioElvis Labs",
  description: "Personal projects and experiments by TioElvis.",
};

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>{children}</body>
    </html>
  );
}
