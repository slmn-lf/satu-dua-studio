# Service Card Component - Reusable Implementation

## Struktur Komponen

Komponen service card telah diubah menjadi **fully reusable** dengan data-driven approach menggunakan JSON.

### File-file yang Dimodifikasi:

#### 1. **card-service.html** (`components/`)

- Mengubah hardcoded card menjadi container template
- Data sekarang di-render secara dinamis melalui JavaScript
- Lebih clean dan maintainable

#### 2. **ServiceCard.js** (`components/`)

- Komponen pure JavaScript yang menghasilkan elemen DOM
- Menerima parameter: `image`, `title`, `desc`, `onClick`
- Fitur baru:
  - Lazy loading image (`loading="lazy"`)
  - Better error handling untuk onClick handler
  - JSDoc documentation
  - Data attribute untuk button selector yang lebih reliable

#### 3. **photoboothService.js** (`js/services/`)

- Menggunakan `cards.json` yang sudah ada (bukan file terpisah)
- Error handling untuk fetch failures
- Tetap kompatibel dengan localStorage untuk selected service

### Cara Menggunakan:

```javascript
// servicesPage.js - sudah bekerja dengan setup baru
import { renderServices } from "../services/PhotoboothService.js";
import { ServiceCard } from "../components/ServiceCard.js";

export const renderServices = async () => {
  const container = document.getElementById("services-container");
  const services = await getServices();

  services.forEach((service) => {
    const card = ServiceCard({
      image: service.image,
      title: service.title,
      desc: service.desc,
      onClick: () => buyService(service),
    });
    container.appendChild(card);
  });
};
```

### Data JSON Format:

File `/data/cards.json` berisi array dengan struktur:

```json
{
  "id": 1,
  "image": "/assets/images/...",
  "title": "...",
  "desc": "..."
}
```

## Keuntungan Reusable Component:

✅ **Single Source of Truth** - Data hanya di `cards.json`  
✅ **Easy to Maintain** - Ubah data langsung tanpa edit HTML  
✅ **Scalable** - Tambah card hanya dengan menambah JSON entry  
✅ **Reusable** - ServiceCard bisa digunakan di page/component manapun  
✅ **Better Performance** - Lazy loading images  
✅ **Type Safe** - JSDoc documentation untuk IDE autocomplete

## Flow Diagram:

```
cards.json
    ↓
photoboothService.getServices()
    ↓
servicesPage.renderServices()
    ↓
ServiceCard() component
    ↓
DOM Elements
```
