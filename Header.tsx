'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          🇲🇳 Монголын Алдартай Хүмүүс
        </Link>
        
        <nav className="flex gap-3">
          <Link href="/" className="px-5 py-2 bg-gray-100 rounded-lg hover:bg-primary hover:text-white transition-colors">
            Жагсаалт
          </Link>
          {session && (
            <>
              <Link href="/dashboard" className="px-5 py-2 bg-gray-100 rounded-lg hover:bg-primary hover:text-white transition-colors">
                Dashboard
              </Link>
              {session.user?.isAdmin && (
                <Link href="/admin" className="px-5 py-2 bg-gray-100 rounded-lg hover:bg-primary hover:text-white transition-colors">
                  Админ
                </Link>
              )}
            </>
          )}
        </nav>
        
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <div className="bg-gray-100 px-5 py-2 rounded-lg">
                <span className="font-semibold text-primary">💎 {session.user?.tokens || 0} токен</span>
              </div>
              <div className="text-gray-700">{session.user?.name || session.user?.email}</div>
              <button
                onClick={() => signOut()}
                className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Гарах
              </button>
            </>
          ) : (
            <Link href="/login" className="btn-primary">
              Нэвтрэх
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
