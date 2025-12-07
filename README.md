# 📸 PhotoBooth - Component Architecture Guide

## Overview

Panduan lengkap tentang cara membuat dan mengintegrasikan component HTML ke dalam proyek PhotoBooth menggunakan sistem dynamic component loading.

---

## Struktur Proyek

```
photobooth/
├── index.html          # Main entry point
├── main.css            # Global styles
├── main.js             # Main application logic
├── js/
│   └── nav.js          # Component loader utility
├── components/
│   └── navbar.html     # Navigation component
└── README.md           # Dokumentasi ini
```

---

## Sistem Component Loading

Proyek ini menggunakan sistem **dynamic component loading** dengan fetch API. Semua component dimuat secara asynchronous ke dalam container yang sudah ditentukan di HTML.

### Cara Kerja:

1. Component HTML disimpan di folder `components/`
2. Container di HTML memiliki ID unik untuk menampung component
3. `nav.js` menggunakan `loadHTMLComponent()` untuk memuat component
4. Component dirender ke dalam container saat halaman dimuat

---

## 📋 Langkah-Langkah Membuat Component

### Step 1: Buat File Component HTML

Buat file HTML baru di folder `components/`:

```bash
components/
├── navbar.html
├── footer.html        # (contoh component baru)
└── sidebar.html       # (contoh component baru)
```

**Contoh: `components/footer.html`**

```html
<footer class="footer">
  <div class="footer-container">
    <p>&copy; 2025 PhotoBooth. Semua hak dilindungi.</p>
    <ul class="footer-links">
      <li><a href="#privacy">Privacy</a></li>
      <li><a href="#terms">Terms</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </div>
</footer>
```

### Step 2: Buat Container di `index.html`

Tambahkan container div dengan ID unik untuk menampung component:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PhotoBooth</title>
    <link rel="stylesheet" href="main.css" />
  </head>
  <body>
    <!-- Navigation Container -->
    <div id="navbar-container"></div>

    <main class="container">
      <!-- Main Content -->
      <h2>📸 Ambil Foto dengan Kamera</h2>
    </main>

    <!-- Footer Container (BARU) -->
    <div id="footer-container"></div>

    <script src="js/nav.js"></script>
    <script src="main.js"></script>
  </body>
</html>
```

**Penting:**

- ID container harus unik dan deskriptif
- Letakkan container di posisi yang sesuai (navbar di atas, footer di bawah)
- Format: `{component-name}-container`

### Step 3: Daftarkan Component di `js/nav.js`

Tambahkan pemanggilan `loadHTMLComponent()` di file `js/nav.js`:

```javascript
// Load navigation bar when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  loadHTMLComponent("components/navbar.html", "navbar-container");
  loadHTMLComponent("components/footer.html", "footer-container"); // TAMBAH INI
});
```

**Syntax:**

```javascript
loadHTMLComponent(pathToComponent, containerElementId);
```

- `pathToComponent`: Path relatif ke file HTML component (string)
- `containerElementId`: ID element di HTML yang akan menampung component (string)

### Step 4: Tambahkan Styling di `main.css`

Tambahkan CSS untuk component Anda di `main.css`:

```css
/* Footer Styles */
.footer {
  background-color: #2c3e50;
  color: white;
  padding: 30px 20px;
  margin-top: 40px;
  text-align: center;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-links {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 15px;
}

.footer-links a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #3498db;
}
```

---

## 📝 Contoh Lengkap: Membuat Component Sidebar

### 1. Buat `components/sidebar.html`

```html
<aside class="sidebar">
  <div class="sidebar-header">
    <h3>Menu</h3>
  </div>
  <nav class="sidebar-nav">
    <a href="#dashboard" class="sidebar-link">Dashboard</a>
    <a href="#settings" class="sidebar-link">Settings</a>
    <a href="#help" class="sidebar-link">Help</a>
  </nav>
</aside>
```

### 2. Tambah Container di `index.html`

```html
<body>
  <!-- Navbar -->
  <div id="navbar-container"></div>

  <!-- Sidebar & Main Content -->
  <div class="content-wrapper">
    <div id="sidebar-container"></div>

    <main class="container">
      <!-- Content -->
    </main>
  </div>

  <!-- Footer -->
  <div id="footer-container"></div>

  <script src="js/nav.js"></script>
  <script src="main.js"></script>
</body>
```

### 3. Daftarkan di `js/nav.js`

```javascript
document.addEventListener("DOMContentLoaded", () => {
  loadHTMLComponent("components/navbar.html", "navbar-container");
  loadHTMLComponent("components/sidebar.html", "sidebar-container");
  loadHTMLComponent("components/footer.html", "footer-container");
});
```

### 4. Tambah CSS di `main.css`

```css
.content-wrapper {
  display: flex;
  gap: 20px;
}

.sidebar {
  width: 250px;
  background-color: #ecf0f1;
  padding: 20px;
  border-radius: 8px;
}

.sidebar-header h3 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar-link {
  padding: 10px;
  color: #2c3e50;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.sidebar-link:hover {
  background-color: #bdc3c7;
}
```

---

## 🔧 API Reference: `loadHTMLComponent()`

```javascript
/**
 * Load HTML component dynamically and insert into container
 * @param {string} componentPath - Path to component HTML file
 * @param {string} elementId - ID of container element
 * @returns {void}
 */
function loadHTMLComponent(componentPath, elementId)
```

### Fitur:

- ✅ Load component asynchronously
- ✅ Error handling otomatis
- ✅ Warning jika container tidak ditemukan
- ✅ Custom event dispatch setelah component loaded
- ✅ Component caching di browser

### Event Listener:

Setelah component dimuat, event `componentLoaded` akan di-dispatch:

```javascript
document.addEventListener("componentLoaded", (event) => {
  console.log("Component loaded:", event.detail);
  // event.detail = { componentPath, elementId }
});
```

---

## ⚠️ Best Practices

### ✅ DO:

- ✅ Gunakan ID unik dan deskriptif untuk container
- ✅ Simpan semua component di folder `components/`
- ✅ Gunakan semantic HTML (`<nav>`, `<footer>`, `<aside>`, dll)
- ✅ Pisahkan CSS component ke `main.css`
- ✅ Gunakan class selector untuk styling component
- ✅ Tambahkan comments untuk component yang kompleks

### ❌ DON'T:

- ❌ Jangan gunakan inline styles di component HTML
- ❌ Jangan duplikasi component di banyak tempat
- ❌ Jangan gunakan ID yang sama untuk multiple elements
- ❌ Jangan load component sebelum DOM ready
- ❌ Jangan gunakan global variables yang conflict

---

## 🐛 Troubleshooting

### Component tidak muncul

**Masalah:** Component tidak ditampilkan di halaman

**Solusi:**

1. Cek apakah container ID sudah ada di HTML
   ```javascript
   // Di browser console
   document.getElementById("navbar-container"); // Harus return element, bukan null
   ```
2. Cek path component apakah benar
   ```javascript
   // Path harus relatif dari index.html
   // ✅ Benar: "components/navbar.html"
   // ❌ Salah: "/components/navbar.html" atau "./components/navbar.html"
   ```
3. Buka browser DevTools → Console untuk melihat error

### Error: "Element with id not found"

**Penyebab:** Container element tidak ada di HTML

**Solusi:**

```html
<!-- Tambah container di index.html -->
<div id="navbar-container"></div>
```

### CORS Error saat load component

**Penyebab:** Membuka file dengan protokol `file://`

**Solusi:**

- Gunakan local server (Live Server, Python http.server, dll)
- Atau deploy ke web server

---

## 📚 Referensi Struktur File

### Networking & Loading:

- `fetch()` API: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- `DOMContentLoaded` Event: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event)

### HTML Semantics:

- `<nav>`, `<main>`, `<footer>`, `<aside>`: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)

### CSS Styling:

- Flexbox: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)
- BEM Naming: [BEM Methodology](http://getbem.com/)

---

## 🚀 Ringkasan Cepat

**Untuk membuat dan menampilkan component baru:**

1. **Buat file**: `components/nama-component.html`
2. **Buat container**: `<div id="nama-component-container"></div>` di index.html
3. **Daftarkan**: `loadHTMLComponent('components/nama-component.html', 'nama-component-container');` di nav.js
4. **Styling**: Tambahkan CSS di main.css
5. **Done!** 🎉

---

**Last Updated:** December 7, 2025  
**Version:** 1.0.0
