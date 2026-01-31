import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create test user
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  const user = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      name: 'Батаа',
      password: hashedPassword,
      tokens: 1250,
      isAdmin: true, // Admin user
    },
  })

  console.log('✅ Created user:', user.email)

  // Create famous people
  const people = [
    {
      name: 'Чингис хаан',
      category: 'Түүх, Улс төр',
      description: 'Монголын эзэнт гүрнийг байгуулсан агуу хаан. 1162 онд төрсөн. Дэлхийн түүхэнд хамгийн том газар нутагтай эзэнт гүрнийг байгуулсан удирдагч юм.',
      emoji: '👨‍🎤',
      totalBoosts: 15200,
      supporters: 342,
    },
    {
      name: 'Б.Амарсайхан',
      category: 'Хөгжим',
      description: 'Монголын алдартай дуучин, хөгжимчин. Олон үеийн хүмүүст хайртай дуунуудыг бүтээсэн.',
      emoji: '🎵',
      totalBoosts: 12800,
      supporters: 289,
    },
    {
      name: 'Н.Түвшинбаяр',
      category: 'Спорт',
      description: 'Олимпийн алтан медальтан бөхчин. Монголын спортын алдар хүндийг дэлхийд түгээсэн.',
      emoji: '🏅',
      totalBoosts: 9500,
      supporters: 201,
    },
    {
      name: 'Д.Алтанхуяг',
      category: 'Кино',
      description: 'Монголын кино урлагийн шилдэг жүжигчин, найруулагч.',
      emoji: '🎬',
      totalBoosts: 7200,
      supporters: 156,
    },
    {
      name: 'Г.Мэнд-Өөгийн',
      category: 'Уран зохиол',
      description: 'Монголын нэрт зохиолч. Олон шилдэг бүтээл туурвисан.',
      emoji: '📚',
      totalBoosts: 6800,
      supporters: 134,
    },
    {
      name: 'О.Цэдэв',
      category: 'Урлаг',
      description: 'Монголын мэдээжийн зураач, уран бүтээлч.',
      emoji: '🎨',
      totalBoosts: 5400,
      supporters: 98,
    },
  ]

  for (const personData of people) {
    const person = await prisma.person.create({
      data: personData,
    })
    console.log('✅ Created person:', person.name)
  }

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
