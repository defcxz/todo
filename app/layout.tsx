import { Providers } from './providers'
import type { Metadata } from 'next'
import { Suspense } from "react";
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'To-do simple web | A side project by @defcxz',
  description: 'Made w/ Next.js + Vercel. By @defcxz [https://def.works]',
}

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={'dark'}>
    <body className={inter.className}>
    <Providers>
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    </Providers>
    </body>
    </html>
  )
}
