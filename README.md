# JabarUMKM Hub 🌟

Website edukatif dan eksploratif untuk mendukung digitalisasi produk UMKM dari berbagai kabupaten/kota di Jawa Barat.

## 🎯 Tentang Proyek

JabarUMKM Hub adalah platform frontend-only yang dibangun dengan teknologi modern untuk mempromosikan dan mendukung UMKM Jawa Barat. Website ini menampilkan produk-produk berkualitas dari berbagai daerah dengan fitur interaktif yang menarik.

## 🛠️ Teknologi yang Digunakan

- **HTML5** - Struktur halaman semantik
- **TailwindCSS (CDN)** - Styling utility-first tanpa build tool
- **Vanilla JavaScript** - Interaksi dan logika aplikasi
- **localStorage** - Penyimpanan data lokal pengguna
- **SVG** - Peta interaktif Jawa Barat

## 📁 Struktur Folder

```
jabarumkm-hub/
│
├── index.html              # Halaman utama
├── tentang.html            # Halaman tentang
├── badge.html              # Halaman galeri badge
├── daerah-garut.html       # Halaman produk Garut
├── daerah-bandung.html     # Halaman produk Bandung
│
├── css/
│   └── style.css          # Custom CSS dan animasi
│
├── js/
│   ├── main.js            # JavaScript utama (scroll, navbar, modal)
│   ├── map.js             # Interaksi peta SVG
│   ├── chatbot.js         # Logika chatbot
│   └── badge.js           # Sistem badge dan localStorage
│
├── assets/
│   ├── img/               # Gambar produk dan ilustrasi
│   └── svg/               # File SVG dan ikon
│
└── README.md              # Dokumentasi proyek
```

## 🚀 Fitur Utama

### 🏠 Halaman Utama (index.html)
- **Hero Section** dengan animasi scroll reveal
- **Produk Unggulan** dengan 4 produk utama
- **Peta Interaktif** Jawa Barat dengan navigasi ke halaman daerah
- **Sistem Badge** dengan notifikasi popup

### 🗺️ Peta Interaktif
- SVG peta Jawa Barat dengan 19 kabupaten/kota
- Hover effects dan klik navigasi
- Tracking kunjungan daerah
- Modal informasi produk per daerah

### 🤖 Chatbot
- Modal interaktif dengan animasi
- Keyword matching untuk pencarian produk
- Respons terhadap pertanyaan tentang:
  - Produk tertentu
  - Daerah tertentu
  - Kategori produk (halal, handmade, makanan)
  - Bantuan dan greeting

### 🏆 Sistem Badge
- 12 badge berbeda dengan kategori:
  - Achievement (First Visit, Product Explorer)
  - Exploration (Eksplorator, Local Supporter)
  - Craft (Handmade Lover)
  - Halal (Halal Hunter)
  - Region (Garut Explorer, Bandung Explorer, dll)
  - Master (Jabar Master)
- Animasi confetti saat unlock
- Progress tracking dan statistik

### 📱 Responsif
- Mobile-first design
- Responsif di semua ukuran layar
- Touch-friendly interactions

## 🎨 Design System

### Palet Warna
- **Primary**: `#A05A2C` (Terracotta)
- **Accent**: `#6B8E23` (Olive)
- **Highlight**: `#F9C74F` (Kuning cerah)
- **Background**: `#FAF9F6` (Ivory)
- **Text**: `#333333` (Netral)

### Font
- **Inter** - Font utama untuk body text
- **Poppins** - Font untuk heading dan emphasis

### Animasi
- Scroll reveal dengan Intersection Observer
- Hover effects pada cards dan buttons
- Modal transitions
- Confetti animation untuk badge unlock

## 📊 Data Management

### localStorage Structure
```javascript
{
  "visitedRegions": ["garut", "bandung", "cirebon"],
  "productInteractions": [
    {
      "region": "garut",
      "category": "makanan",
      "isHalal": true,
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  ],
  "unlockedBadges": ["first_visit", "eksplorator"],
  "totalVisits": 15
}
```

### Badge Conditions
- **First Visit**: `totalVisits >= 1`
- **Eksplorator**: `visitedRegions.length >= 3`
- **Handmade Lover**: `handmade_products >= 5`
- **Halal Hunter**: `halal_products >= 3`
- **Jabar Master**: `visitedRegions.length >= 10 && totalProducts >= 20`

## 🚀 Cara Menjalankan

1. **Clone repository**
   ```bash
   git clone https://github.com/username/jabarumkm-hub.git
   cd jabarumkm-hub
   ```

2. **Buka di browser**
   - Buka file `index.html` di browser
   - Atau gunakan live server:
   ```bash
   # Dengan Python
   python -m http.server 8000
   
   # Dengan Node.js
   npx serve .
   ```

3. **Akses website**
   - Buka `http://localhost:8000` di browser

## 📱 Penggunaan

### Navigasi
- **Beranda**: Lihat produk unggulan dan peta interaktif
- **Tentang**: Informasi platform dan pembuat
- **Badge**: Galeri badge dan progress tracking

### Interaksi
1. **Klik produk** untuk melihat detail dan tracking badge
2. **Klik daerah di peta** untuk melihat produk lokal
3. **Gunakan chatbot** untuk mencari produk atau bantuan
4. **Kumpulkan badge** dengan menjelajahi berbagai fitur

### Badge System
- Badge akan terbuka otomatis saat syarat terpenuhi
- Popup notifikasi dengan animasi confetti
- Progress tracking di halaman badge

## 🔧 Customization

### Menambah Produk
Edit file `js/chatbot.js` dan tambahkan produk baru di `productDatabase`:

```javascript
const productDatabase = {
  'produk_baru': {
    name: 'Nama Produk',
    region: 'Daerah',
    description: 'Deskripsi produk',
    price: 'Rp 10.000 - 50.000',
    category: 'Kategori',
    halal: true
  }
};
```

### Menambah Badge
Edit file `js/badge.js` dan tambahkan badge baru di `badgeDefinitions`:

```javascript
const badgeDefinitions = {
  'badge_baru': {
    id: 'badge_baru',
    name: 'Nama Badge',
    description: 'Deskripsi badge',
    icon: '🎯',
    color: '#FF6B6B',
    condition: (userData) => userData.someCondition,
    category: 'achievement'
  }
};
```

### Menambah Daerah
1. Tambahkan path SVG di `js/map.js`
2. Buat file HTML daerah baru (contoh: `daerah-cirebon.html`)
3. Update data daerah di `jabarRegions`

## 🌟 Fitur Opsional yang Bisa Ditambahkan

- **Dark Mode** toggle
- **Wishlist** produk
- **Testimoni** UMKM
- **Mini Map** pada produk
- **Loader** transisi antar halaman
- **PWA** (Progressive Web App)
- **Offline** support

## 📄 Lisensi

Proyek ini dibuat untuk tujuan edukasi dan pengembangan UMKM Jawa Barat.

## 👥 Kontribusi

Kontribusi sangat diterima! Silakan buat pull request atau laporkan issue.

## 📞 Kontak

- Email: info@jabarumkmhub.com
- Instagram: @jabarumkmhub
- Facebook: JabarUMKM Hub

---

**Dibuat dengan ❤️ untuk UMKM Jawa Barat** 
