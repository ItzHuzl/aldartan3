# 🚀 ALDARTAN - DEPLOY ЗААВАР

## ✅ БИ ТАНД ЮУ ӨГСӨН БЭ:

Бүх кодууд бэлэн байна! Танд зөвхөн:
1. GitHub-руу upload хийх
2. Vercel холбох
3. Database тохируулах

---

## 📦 1-Р АЛХАМ: ФАЙЛУУД ТАТАХ

1. **aldartan-github.zip** файлыг татаж авах
2. Задлах
3. **aldartan-github** folder-ыг харах

---

## 🌐 2-Р АЛХАМ: GITHUB REPOSITORY ҮҮСГЭХ

### А. GitHub руу орох
https://github.com

### Б. Repository үүсгэх
1. Баруун дээд буланд **+** → **New repository**
2. Бөглөх:
   - **Repository name:** `aldartan`
   - **Public** сонгох
   - **Initialize with README:** тэмдэглэхгүй ❌
3. **Create repository** дарах

### В. Хоосон repository харагдана

---

## 📤 3-Р АЛХАМ: ФАЙЛУУД UPLOAD ХИЙХ

Repository хуудас дээр:

### Арга 1: Upload files (Хялбар)

1. **uploading an existing file** link дарах
2. **aldartan-github** folder нээгээд:
   - **Бүх folder** болон **бүх файл** сонгох:
     - ✅ app folder
     - ✅ components folder
     - ✅ lib folder
     - ✅ prisma folder
     - ✅ public folder
     - ✅ types folder
     - ✅ package.json
     - ✅ tsconfig.json
     - ✅ .gitignore
     - ✅ бусад бүх файл
3. GitHub руу **чирж оруулах** (drag and drop)
4. **Commit changes** дарах
5. ⏱️ Хэдэн минут хүлээх (файлууд их байна)

### Арга 2: Command Line (Advanced)

Хэрэв Terminal мэддэг бол:

\`\`\`bash
cd aldartan-github
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/[USERNAME]/aldartan.git
git push -u origin main
\`\`\`

---

## 🌟 4-Р АЛХАМ: VERCEL ХОЛБОХ

### А. Vercel руу орох
https://vercel.com

### Б. GitHub-тай холбох
1. **Sign Up** (эсвэл Sign In)
2. **Continue with GitHub**
3. Authorize Vercel

### В. Project import
1. **Add New...** → **Project**
2. `aldartan` repository олох
3. **Import** дарах

---

## ⚙️ 5-Р АЛХАМ: ENVIRONMENT VARIABLES

**Framework Preset:** Next.js ✅ (автоматаар)

**Environment Variables нэмэх:**

Дараах 6 зүйлийг нэг нэгээр нэмнэ:

| Key | Value |
|-----|-------|
| `NEXTAUTH_SECRET` | `random-secret-key-change-this-12345` |
| `NEXTAUTH_URL` | `https://aldartan.vercel.app` |
| `GOOGLE_CLIENT_ID` | (таны Google Client ID) |
| `GOOGLE_CLIENT_SECRET` | (таны Google Client Secret) |
| `ADMIN_EMAIL` | (таны Gmail) |
| `DATABASE_URL` | `postgresql://...` (6-р алхамд авна) |

⚠️ **DATABASE_URL одоохондоо хоосон орхино** - дараа нь нэмнэ!

---

## 🗄️ 6-Р АЛХАМ: DATABASE ТОХИРУУЛАХ

### А. Vercel Postgres үүсгэх

1. Vercel project хуудас дээр
2. **Storage** tab дарах
3. **Create Database**
4. **Postgres** сонгох
5. **Continue**
6. Database name: `aldartan-db`
7. Region: **Washington D.C., USA** (хамгийн ойр)
8. **Create** дарах

### Б. DATABASE_URL авах

1. Database үүссэний дараа
2. **.env.local** tab дарах
3. **Show secret** дарах
4. `POSTGRES_URL` хуулах

### В. Environment Variable шинэчлэх

1. **Settings** tab
2. **Environment Variables**
3. `DATABASE_URL` олоод **Edit** дарах
4. Хуулсан `POSTGRES_URL`-аа оруулах
5. **Save** дарах

---

## 🔄 7-Р АЛХАМ: REDEPLOY

1. **Deployments** tab
2. **Redeploy** товч дарах (эсвэл automatic deploy хийгдэнэ)
3. ⏱️ 2-3 минут хүлээх
4. ✅ **Success!**

---

## 🔐 8-Р АЛХАМ: GOOGLE OAUTH REDIRECT URI НЭМЭХ

1. https://console.cloud.google.com
2. **Credentials**
3. **Aldartan** OAuth client
4. **Authorized redirect URIs** дээр нэмэх:

\`\`\`
https://aldartan.vercel.app/api/auth/callback/google
\`\`\`

(Vercel-с өгсөн бодит хаягаа ашиглах!)

5. **SAVE**

---

## 🎉 9-Р АЛХАМ: ТУРШИЖ ҮЗЭХ!

1. Vercel-с өгсөн хаягаа нээх (жишээ: `aldartan.vercel.app`)
2. **Google-ээр нэвтрэх**
3. Админ хэсэг автоматаар гарна!

---

## 🐛 АЛДАА ГАРВАЛ:

### "Build failed"
- Logs шалгах
- Environment variables дутуу эсэхийг шалгах

### "Database error"
- DATABASE_URL зөв эсэхийг шалгах
- Vercel Postgres үүссэн эсэхийг шалгах

### "Google OAuth error"
- Redirect URI зөв эсэхийг шалгах
- Client ID, Secret зөв эсэхийг шалгах

---

## 📞 ТУСЛАМЖ

Асуудал гарвал:
1. Vercel logs шалгах
2. GitHub repository байгаа эсэхийг шалгах
3. Environment variables бүгд байгаа эсэхийг шалгах

Амжилт! 🚀
