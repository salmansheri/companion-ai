import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/provider/theme-provider";
import Sidebar from "@/components/sidebar/sidebar";
import { cn } from "@/lib/utils";
import { ReactQueryProvider } from "@/components/provider/react-query-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Companion.ai | Your AI Companion",
  description: "Your AI Companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn("bg-secondary", inter.className)}>
          <ReactQueryProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Header />
              <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0 ">
                <Sidebar />
              </div>
              <main className="md:pl-20 pt-16 h-full">
                {children}
                <Toaster />
              </main>
            </ThemeProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
