import type { Metadata } from "next"
// import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "@/components/ui/sonner"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"

//@ts-ignore
import "./globals.css"

// export const geistSans = Geist({
//   variable: "--font-geist-sans",
// })

// export const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
// })

export const metadata: Metadata = {
  title: "MEI - Seguro",
  description: "Gestão de MEI, serviço direcionados principalmente a mei(s)",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <SonnerToaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
