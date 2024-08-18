import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import NavBar from "@/components/navigation";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vin Decoder",
  description:
    "Unlock comprehensive vehicle information and specifications by decoding any VIN. Get detailed insights your engine details, safety features, and more with our easy-to-use VIN decoder.",
  keywords: [
    "VIN Decoder",
    "Vehicle Identification Number Lookup",
    "VIN Number Check",
    "VIN Number Lookup",
    "Vehicle Information by VIN",
    "Car VIN Decoder",
    "Vehicle History Report",
    "Free VIN Check",
    "Decode VIN Online",
    "VIN Lookup Service",
    "Car Specifications by VIN",
    "Automotive VIN Decoder",
    "Truck VIN Decoder",
    "Motorcycle VIN Decoder",
    "VIN Number Search",
    "VIN Number Details",
    "Decode Vehicle VIN",
    "VIN Number Explanation",
    "VIN Decoder Tool",
    "Vehicle Info by VIN",
  ],
  openGraph: {
    title: `VIN Decoder`,
    description:
      "Unlock comprehensive vehicle information and specifications by decoding any VIN. Get detailed insights into your engine details, safety features, and more with our easy-to-use VIN decoder.",
    url: `https://vin-decode.com/`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
          <Analytics debug={false} />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
