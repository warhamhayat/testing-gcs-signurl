# Aplikasi Manajemen Data Siswa dengan GCP Bucket

Aplikasi manajemen data siswa dengan frontend React.js (Vite) dan backend Express.js dengan database PostgreSQL dan penyimpanan file di Google Cloud Storage.

## Fitur Utama

- Dashboard dengan tabel data siswa
- Manajemen data siswa (tambah, edit, hapus)
- Upload file PDF (disimpan secara private di GCP Bucket)
- Akses file melalui signed URL (keamanan)
- Pencarian data siswa

## Struktur Proyek

Proyek ini terdiri dari dua bagian utama:

- `fe/`: Frontend React.js dengan Vite dan Tailwind CSS
- `be/`: Backend Express.js dengan PostgreSQL dan Prisma ORM

## Teknologi yang Digunakan

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- React Icons

### Backend
- Express.js
- Prisma ORM
- PostgreSQL
- Google Cloud Storage
- Multer (untuk upload file)

## Keamanan File

- File disimpan secara private di Google Cloud Storage
- Hanya path file yang disimpan di database, bukan URL lengkap
- Akses file menggunakan signed URL yang berlaku 15 menit
- Signed URL dihasilkan saat pengguna ingin melihat file

## Persyaratan

- Node.js (v14 atau lebih baru)
- PostgreSQL
- Google Cloud Platform account dengan Storage Bucket
- File kredensial GCP untuk akses ke bucket

## Pengaturan

### Backend

1. Masuk ke direktori backend:
   ```
   cd be
   ```

2. Instal dependensi:
   ```
   npm install
   ```

3. Konfigurasi file `.env` dengan kredensial database dan GCP:
   ```
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/student_db?schema=public"
   
   # Google Cloud Storage
   GCP_PROJECT_ID="your-project-id"
   GCP_BUCKET_NAME="your-bucket-name"
   GCP_KEYFILE_PATH="credentials.json"
   
   # Server
   PORT=8000
   ```

4. Jalankan migrasi Prisma:
   ```
   npx prisma migrate dev
   ```

5. Jalankan server:
   ```
   npm run dev
   ```

### Frontend

1. Masuk ke direktori frontend:
   ```
   cd fe
   ```

2. Instal dependensi:
   ```
   npm install
   ```

3. Jalankan server pengembangan:
   ```
   npm run dev
   ```

## Penggunaan

1. Buka aplikasi di browser: `http://localhost:5173` (atau port yang ditampilkan di terminal)
2. Gunakan dashboard untuk mengelola data siswa
3. Tambahkan siswa baru dengan mengklik tombol "Tambah Siswa"
4. Edit atau hapus siswa yang ada dengan mengklik ikon yang sesuai
5. Lihat file PDF dengan mengklik tombol "Lihat PDF" (akan meminta signed URL dari backend)

## Dokumentasi Lebih Lanjut

- [Dokumentasi Frontend](fe/README.md)
- [Dokumentasi Backend](be/README.md)

## Catatan Penting

- Pastikan Anda memiliki kredensial GCP yang valid dan bucket yang sudah dibuat
- File yang diunggah dibatasi hanya untuk PDF dengan ukuran maksimal 5MB
- Aplikasi ini tidak memiliki autentikasi pengguna 