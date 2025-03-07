# Frontend Aplikasi Manajemen Data Siswa

Frontend untuk aplikasi manajemen data siswa dengan React, Vite, dan Tailwind CSS.

## Fitur

- Dashboard dengan tabel data siswa
- Form untuk menambah dan mengedit data siswa
- Upload file PDF
- Pencarian data siswa
- Akses file PDF melalui signed URL

## Struktur Proyek

```
fe/
├── node_modules/       # Dependensi
├── public/             # Aset statis
├── src/                # Kode sumber
│   ├── components/     # Komponen React
│   │   ├── Modal.jsx
│   │   ├── StudentForm.jsx
│   │   └── StudentTable.jsx
│   ├── pages/          # Halaman
│   │   └── Dashboard.jsx
│   ├── services/       # Layanan API
│   │   └── api.js
│   ├── App.jsx         # Komponen utama
│   ├── config.js       # Konfigurasi aplikasi
│   ├── index.css       # Stylesheet global
│   └── main.jsx        # Entry point
├── .gitignore          # File yang diabaikan Git
├── index.html          # File HTML utama
├── package.json        # Konfigurasi proyek
├── postcss.config.js   # Konfigurasi PostCSS
├── tailwind.config.js  # Konfigurasi Tailwind CSS
├── vite.config.js      # Konfigurasi Vite
└── README.md           # Dokumentasi
```

## Teknologi

- **React**: Library UI
- **Vite**: Build tool dan dev server
- **Tailwind CSS**: Framework CSS utility-first
- **Axios**: Client HTTP
- **React Router**: Routing
- **React Icons**: Ikon

## Komponen Utama

### StudentTable

Komponen tabel yang menampilkan daftar siswa dengan fitur:
- Menampilkan nama, kelas, nama orangtua, dan nilai
- Tombol untuk melihat file PDF (menggunakan signed URL)
- Tombol aksi (lihat detail, edit, hapus)

### StudentForm

Form untuk menambah dan mengedit data siswa dengan validasi:
- Nama siswa
- Kelas
- Nama orangtua
- Nilai
- Upload file PDF (opsional)

### Modal

Komponen modal yang digunakan untuk:
- Menampilkan form tambah/edit
- Konfirmasi hapus data

## Layanan API

Layanan API menggunakan Axios untuk berkomunikasi dengan backend:

- `getStudents()`: Mendapatkan semua data siswa
- `getStudent(id)`: Mendapatkan data siswa berdasarkan ID
- `getFileSignedUrl(studentId)`: Mendapatkan signed URL untuk file
- `createStudent(data)`: Membuat data siswa baru
- `updateStudent(id, data)`: Memperbarui data siswa
- `deleteStudent(id)`: Menghapus data siswa

## Konfigurasi

Konfigurasi aplikasi terdapat di file `src/config.js`:

```javascript
const config = {
  // API URL
  apiUrl: 'http://localhost:8000/api',
  
  // Storage configuration
  storage: {
    // Bucket name (for reference only)
    bucketName: 'school22-bucket'
  }
};
```

## Penggunaan

1. Instal dependensi:
   ```
   npm install
   ```

2. Jalankan server pengembangan:
   ```
   npm run dev
   ```

3. Build untuk produksi:
   ```
   npm run build
   ```

## Penanganan File

- File PDF diupload melalui form multipart/form-data
- File ditampilkan menggunakan signed URL yang diminta dari backend
- Signed URL bersifat sementara (15 menit)

## Responsivitas

Aplikasi didesain responsif dengan Tailwind CSS:
- Layout yang beradaptasi dengan ukuran layar
- Tabel dengan overflow horizontal pada layar kecil
- Form yang responsif
