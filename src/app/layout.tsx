import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import EmotionCacheProvider from "@/lib/emotion-cache";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Narayan Singh - Full-Stack Developer",
  description: "Narayan Singh is a full-stack developer with a passion for creating beautiful and functional web applications. I'm a skilled developer with a strong background in web development and a passion for creating beautiful and functional web applications. I'm a skilled developer with a strong background in web development and a passion for creating beautiful and functional web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'light';
                  const html = document.documentElement;
                  if (theme === 'dark') {
                    html.classList.add('dark');
                    html.classList.remove('light');
                  } else {
                    html.classList.add('light');
                    html.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('Error setting initial theme:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <EmotionCacheProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </EmotionCacheProvider>
      </body>
    </html>
  );
}
