# 🎵 SpotDown - Modern Spotify Downloader

SpotDown adalah aplikasi web pengunduh musik Spotify yang dirancang dengan estetika **minimalis namun modern**. Mengutamakan pengalaman pengguna (UX) yang mulus melalui animasi mikro yang elegan dan antarmuka yang bersih.

## ✨ Fitur Utama

- **Unduhan Kualitas Tinggi:** Mendukung konversi hingga 320kbps (tergantung sumber).
- **Metadata Lengkap:** Secara otomatis menyertakan Album Art, Nama Artis, dan Judul Lagu pada file MP3.
- **Antarmuka Premium:** Menggunakan teknik *Glassmorphism*, *Grainy Texture*, dan *Floating Elements*.
- **Animasi GSAP & Motion:** 
  - Efek "Drawing" pada dekorasi teks (underline).
  - Staggered entrance untuk elemen hero dan kartu fitur.
  - Background glow yang dinamis dan interaktif.
- **Responsif:** Optimal di perangkat mobile maupun desktop.
- **Auto-Paste:** Fitur satu klik untuk menempelkan link dari clipboard.

## 🚀 Tumpukan Teknologi

Aplikasi ini dibangun menggunakan standar industri terbaru:

- **Frontend:** React 19 (ESModules)
- **Styling:** Tailwind CSS v4 (Modern Engine)
- **Animasi:** 
  - [GSAP](https://gsap.com/) (Untuk animasi kompleks dan timeline)
  - [Framer Motion](https://motion.dev/) (Untuk transisi state dan AnimatePresence)
- **Ikonografi:** Lucide Icons
- **API Handling:** Fetch API dengan sistem Dual-Proxy (AllOrigins & CORSProxy) untuk keandalan maksimal.

## 🛠️ Detail Teknis Animasi

Kami menggabungkan dua library animasi terbaik:
1. **GSAP** menangani *initial load sequence* dan elemen dekoratif statis seperti garis bawah "mencoret" yang memberikan kesan organik.
2. **Framer Motion** digunakan untuk interaksi UI yang dinamis, seperti kemunculan kartu lagu saat data ditemukan dan transisi saat terjadi error.

## 📝 Cara Penggunaan

1. Salin link lagu, album, atau playlist dari aplikasi Spotify.
2. Tempelkan link ke kolom input SpotDown (atau gunakan tombol paste cepat).
3. Klik **Mulai** untuk mengambil data lagu.
4. Klik **Unduh Sekarang** untuk menyimpan file ke perangkat Anda.

---

### ⚠️ Penafian (Disclaimer)
Proyek ini dibuat untuk tujuan pembelajaran dan penggunaan pribadi. Harap hargai hak cipta musisi dengan tetap menggunakan layanan streaming resmi untuk mendukung karya mereka.
