# 🇲🇳 Монголын Алдартай Хүмүүс

Монголын хамгийн алдартай хүмүүсийг рейтингээр харж, токен ашиглан boost өгөх вэб платформ.

## 🚀 Технологи Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite + Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS

## 📋 Онцлог функцууд

✅ Хүмүүсийг рейтингээр эрэмбэлэх  
✅ Токен ашиглан boost өгөх систем  
✅ Хэрэглэгчийн Dashboard (токен, түүх)  
✅ Админ панел (хүмүүс нэмэх, засах)  
✅ NextAuth authentication  
✅ Responsive дизайн (утсанд тохирно)  
✅ Animations & transitions  

## 🛠️ Суулгах заавар

### 1. Dependencies суулгах

\`\`\`bash
npm install
\`\`\`

### 2. Database тохируулах

\`\`\`bash
# Prisma client үүсгэх
npx prisma generate

# Database migration хийх
npx prisma migrate dev --name init

# Анхны өгөгдөл оруулах (seed)
npx prisma db seed
\`\`\`

### 3. Environment variables шалгах

`.env` файл дээр дараах мэдээллүүд байгаа эсэхийг шалгаарай:

\`\`\`
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

### 4. Development server ажиллуулах

\`\`\`bash
npm run dev
\`\`\`

Вебсайт http://localhost:3000 хаягт ажиллана.

## 👤 Туршилтын хэрэглэгч

Системд орохдоо дараах мэдээллийг ашиглана уу:

- **Email**: test@test.com
- **Password**: password123

## 📁 Файлын бүтэц

\`\`\`
mongolian-famous-people/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── auth/            # NextAuth authentication
│   │   ├── people/          # People CRUD
│   │   ├── boost/           # Boost functionality
│   │   └── user/            # User data
│   ├── person/[id]/         # Person profile page
│   ├── dashboard/           # User dashboard
│   ├── admin/               # Admin panel
│   ├── login/               # Login page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage (ranking)
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Header.tsx
│   ├── PersonCard.tsx
│   └── SessionProvider.tsx
├── lib/                     # Utilities
│   └── prisma.ts           # Prisma client
├── prisma/                  # Database
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed data
├── types/                   # TypeScript types
│   └── next-auth.d.ts
├── .env                     # Environment variables
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
\`\`\`

## 🗄️ Database Schema

### User (Хэрэглэгч)
- id, email, name, password
- tokens (токен тоо)
- transactions (гүйлгээний түүх)

### Person (Алдартай хүн)
- id, name, category, description, emoji
- totalBoosts (нийт boost)
- supporters (дэмжигчдийн тоо)

### Transaction (Гүйлгээ)
- id, userId, personId
- type (boost/purchase/refund)
- amount, description

## 🎨 Дизайн онцлогууд

- **Gradient өнгө**: Цэнхэр-ягаан gradient
- **Responsive**: Утсан, таблет, компьютерт тохирно
- **Animations**: Hover effects, transitions
- **Medals**: Алт (1-р), Мөнгө (2-р), Хүрэл (3-р) медаль

## 🔐 Boost систем

1. Хэрэглэгч токен худалдаж авна
2. Хүний хуудас руу орж boost өгнө
3. Токен хасагдаж, хүний boost нэмэгдэнэ
4. Рейтинг автоматаар шинэчлэгдэнэ
5. Гүйлгээ түүхэнд хадгалагдана

## 📱 API Endpoints

- `GET /api/people` - Бүх хүмүүсийг авах
- `POST /api/people` - Шинэ хүн нэмэх (admin)
- `POST /api/boost` - Boost өгөх
- `GET /api/user` - Хэрэглэгчийн мэдээлэл
- `POST /api/auth/[...nextauth]` - Authentication

## 🚧 Цаашдын хөгжүүлэлт

- [ ] Payment gateway нэмэх (Qpay, Social Pay)
- [ ] Real-time updates (WebSocket)
- [ ] Search & Filter функц
- [ ] Social sharing
- [ ] Mobile app (React Native)
- [ ] Multi-language support

## 📝 Scripts

\`\`\`bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open Prisma Studio (DB GUI)
npx prisma migrate   # Database migrations
\`\`\`

## 👨‍💻 Developer

Created with ❤️ using Claude AI

## 📄 License

MIT License - Чөлөөтэй ашиглаарай!
