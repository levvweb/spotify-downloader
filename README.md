# 🎵 SpotDown - Modern Spotify Downloader

![SpotDown Badge](https://img.shields.io/badge/SpotDown-v1.0.0-emerald?style=for-the-badge&logo=spotify&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

SpotDown adalah aplikasi web pengunduh musik Spotify yang dirancang dengan estetika **minimalis namun modern**. Mengutamakan pengalaman pengguna (UX) yang mulus melalui animasi mikro yang elegan, antarmuka yang bersih, dan performa yang sangat ringan.

---

## ✨ Fitur Utama

- **🎧 Unduhan Kualitas Tinggi:** Mendukung konversi hingga 320kbps untuk kejernihan audio maksimal.
- **🖼️ Metadata Otomatis:** File MP3 dilengkapi dengan Album Art HD, Nama Artis, dan Judul Lagu secara otomatis.
- **💎 Desain Premium:** Antarmuka modern dengan sentuhan *Glassmorphism*, *Clean Typography*, dan interaksi yang halus.
- **⚡ Performa Tinggi:** 
  - Tidak ada animasi berat yang membebani CPU/GPU.
  - Optimasi *lazy loading* untuk gambar.
  - Penggunaan CSS native untuk transisi yang smooth.
- **📱 Responsif Sempurna:** Tampilan yang pas di semua ukuran layar, dari ponsel hingga desktop.
- **🔒 Privasi Terjamin:** Tanpa registrasi, tanpa penyimpanan data pengguna.

---

## 📂 Struktur Proyek

Berikut adalah struktur direktori dari source code SpotDown:

```bash
spotify-downloader-main/
├── 📁 components/        # Komponen UI Reusable
│   └── 📄 SongCard.tsx   # Kartu tampilan detail lagu & tombol download
├── 📁 services/          # Logika Bisnis & API Handling
│   └── 📄 spotifyService.ts # Service untuk fetch data & handling download
├── 📄 App.tsx            # Komponen Utama & Layout Aplikasi
├── 📄 index.css          # Global Styles & Tailwind Directives
├── 📄 index.html         # Entry point HTML & SEO Meta Tags
├── 📄 index.tsx          # React Entry Point
├── 📄 types.ts           # TypeScript Interfaces & Types
├── 📄 vite.config.ts     # Konfigurasi Vite & Proxy
├── 📄 package.json       # Dependencies manifest
└── 📄 tsconfig.json      # Konfigurasi TypeScript
```

---

## 🚀 Tumpukan Teknologi (Tech Stack)

Aplikasi ini dibangun dengan standar industri modern untuk menjamin kemudahan maintainability dan performa:

- **Core:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/) (Super fast HMR & Bundling)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + Custom CSS Variables
- **Animations:** CSS Transitions & Transforms (Optimized)
- **Icons:** [Lucide React](https://lucide.dev/)
- **API Handling:** Fetch API dengan mekanisme *Proxy Rotation* & *Retry Logic*

---

## 🛠️ Cara Menjalankan (Local Development)

Ingin mengembangkan atau menjalankan proyek ini di komputer Anda sendiri? Ikuti langkah mudah berikut:

1. **Clone Repository (atau Unduh ZIP)**
   ```bash
   git clone https://github.com/levvweb/spotify-downloader.git
   cd spotify-downloader
   ```

2. **Instal Dependencies**
   Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/).
   ```bash
   npm install
   ```

3. **Jalankan Development Server**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

4. **Build untuk Production**
   ```bash
   npm run build
   ```

---

## 📝 Panduan Penggunaan

1. Buka aplikasi **Spotify** dan salin link lagu yang diinginkan.
2. Tempelkan link tersebut ke kolom pencarian di **SpotDown**.
3. Tekan tombol **Mulai** / Enter.
4. Tunggu sebentar hingga kartu lagu muncul, lalu klik **Unduh Sekarang**.

---

### ⚠️ Disclaimer (Penafian)

Proyek ini dibuat semata-mata untuk **tujuan edukasi** dan pembelajaran tentang interaksi API serta pengembangan frontend modern. 

- **Hargai Hak Cipta:** Kami sangat menyarankan Anda untuk menggunakan layanan streaming resmi (Spotify, Apple Music, dll) untuk mendukung artis dan musisi favorit Anda.
- **Penggunaan Pribadi:** Gunakan alat ini hanya untuk cadangan pribadi (personal backup) dan bukan untuk distribusi ilegal atau komersial.

---
