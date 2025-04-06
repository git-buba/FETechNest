import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Header } from '@/shared/layout/ui/header'
import { Footer } from '@/shared/layout/ui/footer'
import { ThemeProvider } from '@/shared/providers/theme-provider'
import { Suspense } from 'react'
import { Geist, Geist_Mono } from "next/font/google"

// 폰트 최적화
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // 폰트 로딩 최적화
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap', // 폰트 로딩 최적화
  preload: true,
});

export const metadata: Metadata = {
  title: '개발자 뉴스 & 기술 블로그 모음',
  description: '최신 개발자 뉴스와 기술 블로그를 한 곳에서 볼 수 있는 서비스입니다.',
  keywords: ['개발자', '뉴스', '기술 블로그', '프로그래밍', '개발 소식'],
  authors: [{ name: 'Tech Blog Aggregator Team' }],
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="ko" 
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="preload" as="image" href="/images/default-blog.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <Suspense fallback={null}>
        <Analytics />
      </Suspense>
      <body
        className="antialiased flex min-h-screen flex-col"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
