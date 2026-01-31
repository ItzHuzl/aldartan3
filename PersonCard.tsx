'use client'

import Link from 'next/link'
import Image from 'next/image'

interface PersonCardProps {
  id: string
  name: string
  category: string
  emoji: string
  imageUrl?: string | null
  totalBoosts: number
  supporters: number
  rank: number
}

export default function PersonCard({
  id,
  name,
  category,
  emoji,
  imageUrl,
  totalBoosts,
  supporters,
  rank
}: PersonCardProps) {
  const getRankBadgeClass = () => {
    if (rank === 1) return 'bg-gradient-to-br from-yellow-400 to-yellow-600'
    if (rank === 2) return 'bg-gradient-to-br from-gray-300 to-gray-500'
    if (rank === 3) return 'bg-gradient-to-br from-amber-600 to-amber-800'
    return 'bg-gradient-to-br from-[#667eea] to-[#764ba2]'
  }

  return (
    <Link href={`/person/${id}`}>
      <div className="card p-6 hover:-translate-y-2 cursor-pointer">
        <div className={`w-10 h-10 ${getRankBadgeClass()} text-white rounded-full flex items-center justify-center font-bold text-lg mb-4`}>
          {rank}
        </div>
        
        <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center overflow-hidden relative">
          {imageUrl ? (
            <Image 
              src={imageUrl} 
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-6xl">{emoji}</span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">{category}</p>
        
        <div className="flex justify-between pt-4 border-t-2 border-gray-100">
          <div className="text-center">
            <div className="text-xl font-bold text-primary">{totalBoosts.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">Boost</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-primary">{supporters}</div>
            <div className="text-xs text-gray-500 mt-1">Supporters</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
