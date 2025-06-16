import type { Metadata } from "next";
import { Montserrat, Poppins, Inter } from "next/font/google";
import './globals.css'
import Footer from './components/Footer';



const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fashion Store - Thời trang hiện đại",
  description: "Cửa hàng thời trang trực tuyến với những sản phẩm chất lượng cao",
  keywords: ["thời trang", "quần áo", "fashion", "online shopping"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${poppins.variable} ${inter.variable} font-sans antialiased bg-background text-text min-h-screen`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
