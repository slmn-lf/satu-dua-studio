# 📸 Satu Dua Studio.

Aplikasi photobooth modern dengan vanilla JavaScript, fitur pilih frame, capture kamera real-time, dan komposisi foto profesional.

## ✨ Fitur Utama

- **Pilih Frame**: Pilih dari 3 desain frame photobooth berbeda
- **Preview Kamera**: Video feed real-time dengan efek mirror
- **Capture Otomatis**: Capture 3 foto dengan hitungan mundur 3 detik
- **Komposisi Frame**: Foto otomatis disusun di frame yang dipilih
- **Desain Responsif**: Bekerja di desktop dan mobile
- **Session Storage**: Penyimpanan sementara foto selama proses capture

## 📁 Struktur Proyek

```
photobooth/
├── index.html                 # Halaman utama
├── capture.html               # Halaman capture
├── result.html                # Halaman hasil/preview
├── main.css                   # Gaya global
├── README.md                  # File ini
│
├── components/
│   ├── photobooth-capture.html
│   ├── photobooth-frame-selection.html
│   ├── photobooth-result.html
│   └── css/
│       ├── photobooth.css     # Gaya photobooth
│       ├── global.css
│       └── variables.css
│
├── js/
│   ├── photobooth-capture.js    # Logika capture
│   ├── photobooth-frame-selection.js
│   ├── photobooth-result.js
│   └── nav.js
│
└── photobooth/
    └── frames/
        ├── frame-1.png        # Satu Dua Studio
        ├── frame-2.png        # Birthday
        └── frame-3.png        # Graduation
```

## 🚀 Cara Kerja

1. **Pilih Frame**: Pengguna memilih desain frame
2. **Capture Kamera**: Capture 3 foto dengan countdown 3 detik
3. **Komposisi Foto**: Foto otomatis di-crop (rasio 909:476) dan digabung ke frame
4. **Tampilkan Hasil**: Gambar final ditampilkan dan siap diunduh

## 📱 Detail Teknis

- **Video Mirror**: Preview kamera menggunakan `transform: scaleX(-1)` untuk efek mirror natural
- **Crop Foto**: Setiap foto otomatis di-crop ke rasio aspek 909:476
- **Aspect Ratio**: Menjaga rasio aspek saat menyesuaikan foto di area yang ditentukan
- **Canvas Rendering**: Menggunakan HTML5 Canvas untuk komposisi gambar

## 🎯 Posisi Foto (frame 1080x1920)

- Foto 1: x=50, y=97, width=980, height=540
- Foto 2: x=50, y=637, width=980, height=540
- Foto 3: x=50, y=1177, width=980, height=540

## 🛠️ Instalasi & Penggunaan

```bash
# Buka langsung di browser
open index.html

# Atau gunakan local server
python3 -m http.server 8000
# Kemudian kunjungi http://localhost:8000
```

## 📋 Persyaratan Browser

- Browser modern dengan:
  - WebRTC/getUserMedia support
  - HTML5 Canvas
  - ES6 JavaScript support

## 👥 Kredit

Dibuat untuk **Satu Dua Studio** © 2025
