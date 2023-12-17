import { Providers } from './providers'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'To-do project',
  description: 'Made w/ Next.js + Vercel. By @defcxz [https://def.works]',
}

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={'dark'}>
    <Providers>
      <body className={inter.className}>
      {children}
      </body>
    </Providers>
    </html>
  )
}
