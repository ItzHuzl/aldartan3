'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Person {
  id: string
  name: string
  category: string
  description: string
  emoji: string
  imageUrl?: string | null
  totalBoosts: number
  supporters: number
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [people, setPeople] = useState<Person[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingPerson, setEditingPerson] = useState<Person | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    emoji: '👤',
    imageUrl: ''
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      // Check if user is admin
      if (!session?.user?.isAdmin) {
        alert('Танд админ эрх байхгүй байна!')
        router.push('/')
        return
      }
      fetchPeople()
    }
  }, [status, session, router])

  const fetchPeople = async () => {
    try {
      const response = await fetch('/api/people')
      const data = await response.json()
      setPeople(data)
    } catch (error) {
      console.error('Failed to fetch people:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', imageFile)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        return data.imageUrl
      }
      return null
    } catch (error) {
      console.error('Upload failed:', error)
      return null
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      let imageUrl = formData.imageUrl

      // Upload image if selected
      if (imageFile) {
        const uploadedUrl = await uploadImage()
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        }
      }

      const url = editingPerson 
        ? `/api/people/${editingPerson.id}`
        : '/api/people'
      
      const method = editingPerson ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          imageUrl
        })
      })

      if (response.ok) {
        alert(editingPerson ? 'Амжилттай засагдлаа!' : 'Амжилттай нэмэгдлээ!')
        closeModal()
        fetchPeople()
      } else {
        alert('Алдаа гарлаа')
      }
    } catch (error) {
      alert('Алдаа гарлаа')
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}"-г устгах уу?`)) return

    try {
      const response = await fetch(`/api/people/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Амжилттай устгагдлаа!')
        fetchPeople()
      } else {
        alert('Алдаа гарлаа')
      }
    } catch (error) {
      alert('Алдаа гарлаа')
    }
  }

  const openEditModal = (person: Person) => {
    setEditingPerson(person)
    setFormData({
      name: person.name,
      category: person.category,
      description: person.description || '',
      emoji: person.emoji,
      imageUrl: person.imageUrl || ''
    })
    setImagePreview(person.imageUrl || '')
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingPerson(null)
    setFormData({ name: '', category: '', description: '', emoji: '👤', imageUrl: '' })
    setImageFile(null)
    setImagePreview('')
  }

  if (loading || status === 'loading') {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-white text-2xl">Уншиж байна...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button onClick={() => setShowModal(true)} className="btn-primary">
          + Шинэ хүн нэмэх
        </button>
        <button className="btn-secondary">
          📊 Статистик
        </button>
      </div>

      <div className="card p-6">
        <h2 className="text-2xl font-bold mb-6">Бүх хүмүүс удирдах ({people.length})</h2>
        
        {people.length === 0 ? (
          <p className="text-center text-gray-500 py-10">Хүмүүс байхгүй байна</p>
        ) : (
          <div className="space-y-4">
            {people.map((person) => (
              <div
                key={person.id}
                className="flex justify-between items-center py-4 px-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-4">
                  {person.imageUrl ? (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      <Image 
                        src={person.imageUrl} 
                        alt={person.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="text-4xl w-16 h-16 flex items-center justify-center">
                      {person.emoji}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-lg">{person.name}</p>
                    <p className="text-sm text-gray-600">
                      {person.category} • {person.totalBoosts.toLocaleString()} boost
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => openEditModal(person)}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-80"
                  >
                    Засах
                  </button>
                  <button 
                    onClick={() => handleDelete(person.id, person.name)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Устгах
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Person Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 my-8">
            <h3 className="text-2xl font-bold mb-6">
              {editingPerson ? 'Хүн засах' : 'Шинэ хүн нэмэх'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold mb-2">Зураг</label>
                <div className="space-y-3">
                  {imagePreview && (
                    <div className="relative w-32 h-32 mx-auto rounded-lg overflow-hidden bg-gray-100">
                      <Image 
                        src={imagePreview} 
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="input"
                  />
                  <p className="text-xs text-gray-500">
                    Зураг сонгоно уу (JPG, PNG, эсвэл Emoji хэрэглэнэ)
                  </p>
                </div>
              </div>

              {/* Emoji (fallback) */}
              <div>
                <label className="block text-sm font-semibold mb-2">Emoji (зурагны оронд)</label>
                <input
                  type="text"
                  value={formData.emoji}
                  onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                  className="input"
                  maxLength={2}
                  placeholder="👤"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Нэр *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Ангилал *</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input"
                  placeholder="Жишээ: Хөгжим, Спорт, Кино"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Тайлбар *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input min-h-[100px]"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="submit" 
                  disabled={uploading}
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  {uploading ? 'Илгээж байна...' : editingPerson ? 'Хадгалах' : 'Нэмэх'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-secondary flex-1"
                >
                  Болих
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
