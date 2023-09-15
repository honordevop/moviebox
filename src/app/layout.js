import { AppProvider } from "@/context/context";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Movie Box",
  description: "MovieBox is a dynamic movie discovery app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
