# JabarUMKM Hub 🌟

Website edukatif, eksploratif, dan interaktif untuk mendukung digitalisasi produk UMKM dari berbagai kabupaten/kota di Jawa Barat.

---

## 🎯 Tentang Proyek

JabarUMKM Hub adalah platform web modern yang menampilkan produk-produk UMKM unggulan Jawa Barat, lengkap dengan fitur interaktif seperti peta SVG, sistem badge, chatbot, command palette, keranjang belanja, dan animasi canggih. Website ini sepenuhnya frontend-only dan dapat dijalankan langsung di browser.

---

## 🛠️ Teknologi yang Digunakan
- **HTML5** (struktur semantik)
- **TailwindCSS (CDN)** (utility-first styling)
- **Vanilla JavaScript** (interaksi, logika, animasi)
- **Swiper.js** (slider produk)
- **AOS, GSAP, Vanilla Tilt** (animasi)
- **localStorage** (tracking user, badge, cart, dsb)
- **SVG** (peta interaktif)
- **Lightbox** (galeri gambar)

---

## 📁 Struktur Folder

```
last_revisi_webdesign/
│
├── public/
│   ├── index.html            # Halaman utama (landing page)
│   ├── produk.html           # Daftar & detail produk
│   ├── badge.html            # Galeri & progress badge
│   ├── tentang.html          # Tentang platform, tim, FAQ
│   ├── kontak.html           # Kontak & form
│   ├── css/
│   │   └── style.css         # Custom CSS & animasi
│   ├── js/
│   │   ├── main.js           # Interaksi utama, animasi, scroll, navbar
│   │   ├── produk.js         # Logika produk, filter, sort, wishlist, quick view
│   │   ├── data.js           # Data produk (array lengkap)
│   │   ├── badge.js          # Sistem badge, tracking, confetti
│   │   ├── chatbot.js        # AI Assistant, keyword matching
│   │   ├── cart.js           # Keranjang belanja, checkout
│   │   ├── map.js            # Interaksi peta SVG
│   │   ├── command-palette.js# Command Palette (Ctrl+K, search, produk)
│   │   ├── animations.js     # Efek animasi tambahan
│   │   └── map.js            # Interaksi peta SVG
│   ├── assets/
│   │   ├── img/              # Gambar produk, logo, partner, founder
│   │   └── svg/              # SVG peta (jabar-map.svg)
│   └── README.md             # Dokumentasi proyek
```

---

## 🚀 Fitur Utama

### 🏠 Halaman Utama (index.html)
- Hero section animasi, partikel, CTA
- Produk unggulan (slider, badge, rating, quick view, wishlist)
- Peta interaktif SVG Jawa Barat (klik daerah, modal info, produk per daerah)
- Section partner/logo (logo UMKM & partner, termasuk logo ITS Day)
- Cerita UMKM (timeline testimoni)
- Call to Action (CTA) untuk bergabung
- Footer informatif (tautan, kontak, logo partner)
- Floating chatbot (AI Assistant)
- Command Palette (Ctrl+K, search navigasi & produk)
- Loading screen animasi

### 🛒 Produk (produk.html)
- Daftar produk lengkap (filter daerah, search, sort, pagination/load more)
- Wishlist produk (localStorage)
- Quick view produk (modal)
- Add to cart (keranjang belanja)
- Badge produk (terlaris, best, diskon, new)
- Rating, sold, dan detail produk
- Keranjang belanja (cart modal, checkout, localStorage)

### 🏆 Sistem Badge (badge.html)
- Galeri badge (unlock otomatis, progress, kategori)
- Badge spesial, eksplorasi, produk, harian, dsb
- Confetti animation saat unlock
- Statistik badge & progress
- Notifikasi popup badge

### 🤖 Chatbot in Produk Page (chatbot.js)
- AI Assistant (floating button, modal)
- Keyword matching: produk, daerah, kategori, bantuan, greeting
- Tracking penggunaan chatbot (badge)
- Interaksi responsif (animasi, loading, balasan dinamis)

### 🗺️ Peta Interaktif (map.js, jabar-map.svg)
- SVG peta Jawa Barat (hover, klik, highlight)
- Modal info daerah & produk
- Tracking kunjungan daerah (badge, localStorage)

### ⚡ Command Palette (command-palette.js)
- Ctrl+K untuk search cepat (navigasi, produk, fitur)
- Integrasi data produk dari data.js
- Trigger desktop & mobile

### 🛍️ Keranjang Belanja (cart.js)
- Add to cart dari produk/quick view
- Modal keranjang (lihat, hapus, checkout)
- Checkout form (simulasi)
- Badge keranjang (jumlah item, notifikasi)

### 🎨 Sistem Animasi & UI
- AOS (Animate On Scroll)
- GSAP (animasi partikel, timeline, loading)
- Swiper.js (slider produk, produk per daerah)
- Lightbox (galeri gambar)
- Vanilla Tilt (efek tilt pada card)
- Confetti (badge unlock)
- Responsive & mobile friendly

### 📊 Data & Storage
- Produk didefinisikan di data.js (array lengkap, gambar, harga, rating, dsb)
- localStorage untuk tracking badge, kunjungan, wishlist, cart, interaksi produk, dsb

### 🖼️ Aset Visual
- Banyak gambar produk, logo, partner, dan SVG peta
- Logo partner (ITS Day) di footer

### 📄 Halaman Lain
- tentang.html: Info platform, tim, visi, FAQ
- badge.html: Galeri badge & progress
- kontak.html: Form kontak, info kontak, sosial media
- daerah-bandung.html, daerah-garut.html: Produk per daerah

---

## 📊 Data Management & Tracking

### Struktur localStorage
```js
{
  "visitedRegions": ["garut", "bandung", "cirebon"],
  "productInteractions": [
    { "region": "garut", "category": "makanan", "isHalal": true, "timestamp": "2024-01-01T00:00:00.000Z" }
  ],
  "unlockedBadges": ["first_visit", "eksplorator"],
  "totalVisits": 15,
  "wishlist": ["id_produk1", "id_produk2"],
  "cart": [ { id, name, price, qty, ... } ],
  "chatbotUses": 3,
  "mapClicks": 2,
  "dailyVisits": ["2024-06-01", ...]
}
```

### Badge Conditions (Contoh)
- **First Visit**: `totalVisits >= 1`
- **Eksplorator**: `visitedRegions.length >= 3`
- **Handmade Lover**: `produk handmade >= 5`
- **Halal Hunter**: `produk halal >= 3`
- **Jabar Master**: `visitedRegions.length >= 10 && totalProducts >= 20`
- **Chatbot Friend**: `chatbotUses >= 5`
- **Map Explorer**: `mapClicks >= 5`
- **Product Reviewer**: `productInteractions.length >= 15`
- **Daily Visitor**: 7 hari berturut-turut

---

## 🚀 Cara Menjalankan

1. **Clone repository**
   ```bash
   git clone <repo-url>
   cd last_revisi_webdesign
   ```
2. **Buka di browser**
   - Buka file `public/index.html` di browser
   - Atau gunakan live server:
   ```bash
   # Dengan Python
   python -m http.server 8000
   # Dengan Node.js
   npx serve .
   ```
3. **Akses website**
   - Buka `http://localhost:8000` di browser

---

## 📱 Penggunaan & Navigasi

- **Beranda**: Produk unggulan, peta interaktif, cerita UMKM, partner
- **Produk**: Filter, search, sort, wishlist, quick view, add to cart, checkout
- **Badge**: Galeri badge, progress, statistik, confetti
- **Tentang**: Info platform, tim, visi, FAQ
- **Kontak**: Form kontak, sosial media
- **Command Palette**: Ctrl+K untuk search cepat
- **Chatbot**: Floating button, AI Assistant
- **Peta**: Klik daerah, lihat produk lokal

### Interaksi
1. **Klik produk** untuk detail, wishlist, add to cart
2. **Klik daerah di peta** untuk produk lokal & badge
3. **Gunakan chatbot** untuk bantuan/cari produk
4. **Kumpulkan badge** dengan eksplorasi fitur
5. **Gunakan Command Palette** (Ctrl+K) untuk search cepat

---

## 🔧 Customization

### Menambah Produk
Edit file `public/js/data.js` dan tambahkan produk baru ke array `products`:
```js
{
  id: 'produk_baru',
  name: 'Nama Produk',
  daerah: 'bandung',
  price: 'Rp 10.000',
  image: 'assets/img/produk_baru.png',
  description: 'Deskripsi produk',
  rating: 4.8,
  sold: 100,
  stock: 50
}
```

### Menambah Badge
Edit file `public/js/badge.js` dan tambahkan badge baru ke objek `BADGES`:
```js
'badge_baru': {
  id: 'badge_baru',
  name: 'Nama Badge',
  description: 'Deskripsi badge',
  icon: '🎯',
  category: 'achievement',
  condition: (userData) => userData.someCondition,
  progress: (userData) => ({ current: 0, total: 1 })
}
```

---

## 🎨 Design System

### Palet Warna
- **Primary**: #A05A2C (Terracotta)
- **Accent**: #6B8E23 (Olive)
- **Highlight**: #F9C74F (Kuning cerah)
- **Background**: #FAF9F6 (Ivory)
- **Text**: #333333 (Netral)

### Font
- **Inter** (body)
- **Poppins** (heading)

### Animasi & UI
- Scroll reveal, hover, modal, confetti, tilt, pulse, timeline, dsb
- Mobile-first, responsif, touch-friendly

---

## 🤝 Partner & Kontributor
- Logo partner (ITS Day) di footer
- Daftar logo UMKM partner di slider
- Founder: Arya Wardhana

---

## 📢 Catatan
- Semua data produk, badge, dan interaksi disimpan di localStorage (tidak ada backend)
- Website dapat dijalankan offline (kecuali CDN & gambar eksternal)
- Untuk kontribusi, silakan fork & pull request

---

## 📬 Kontak & Bantuan
- Email: info@Etaloka.id
- Instagram: @Etaloka.id
- Website: [Etaloka.id](#)

---

Selamat mengeksplorasi dan mendukung UMKM Jawa Barat! 🚀 