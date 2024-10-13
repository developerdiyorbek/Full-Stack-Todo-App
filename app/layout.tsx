import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ChildProps } from "@/types";
import "./globals.css";
import { ThemeProvider } from "@/components/Provider/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://full-stack-todo-app-mu.vercel.app"),
  title: "Full Stack todo app",
  description: "A Todo Application Developed by Diyorbek Sulaymonov",
  authors: [{ name: "Diyorbek Sulaymonov", url: "https://diyor-dev.uz" }],
  openGraph: {
    title: "Full Stack todo app",
    description: "A Todo Application Developed by Diyorbek Sulaymonov",
    type: "website",
    url: "https://full-stack-todo-app-mu.vercel.app",
    locale: "uz_UZ",
    images: "https://full-stack-todo-app-mu.vercel.app/myImage.jpg",
    countryName: "Uzbekistan",
    siteName: "todo-app",
    emails: "diyorbeksulaymonov70@gmail.com",
  },
  icons: { icon: "/icon.webp" },
  keywords: "todo app, Todo",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: ChildProps) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${roboto.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-right" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
