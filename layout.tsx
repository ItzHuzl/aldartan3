import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SessionProvider from '@/components/SessionProvider'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Монголын Алдартай Хүмүүс',
  description: 'Монголын хамгийн алдартай хүмүүсийг рейтингээр харах',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="mn">
      <body className={inter.className}>
        <SessionProvider>
          <div className="container mx-auto px-5 py-8 max-w-7xl">
            <Header />
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
