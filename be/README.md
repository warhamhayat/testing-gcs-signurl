# Backend Aplikasi Manajemen Data Siswa

Backend untuk aplikasi manajemen data siswa dengan Express.js, PostgreSQL, dan Google Cloud Storage.

## Fitur

- RESTful API untuk manajemen data siswa
- Integrasi dengan PostgreSQL menggunakan Prisma ORM
- Upload file PDF ke Google Cloud Storage (private)
- Generasi signed URL untuk akses file yang aman

## Struktur Proyek

```
be/
├── node_modules/       # Dependensi
├── prisma/             # Konfigurasi dan migrasi Prisma
│   ├── migrations/     # Migrasi database
│   └── schema.prisma   # Skema database
├── credentials.json    # Kredensial Google Cloud Storage
├── .env                # Variabel lingkungan
├── package.json        # Konfigurasi proyek
├── server.js           # File utama server
└── README.md           # Dokumentasi
```

## Teknologi

- **Express.js**: Framework web untuk Node.js
- **Prisma**: ORM untuk akses database
- **PostgreSQL**: Database relasional
- **Google Cloud Storage**: Penyimpanan file
- **Multer**: Middleware untuk upload file
- **dotenv**: Manajemen variabel lingkungan

## Endpoint API

### Siswa

- `GET /api/students`: Mendapatkan semua data siswa
- `GET /api/students/:id`: Mendapatkan data siswa berdasarkan ID
- `POST /api/students`: Membuat data siswa baru (dengan/tanpa file)
- `PUT /api/students/:id`: Memperbarui data siswa
- `DELETE /api/students/:id`: Menghapus data siswa

### File

- `GET /api/files/:studentId`: Mendapatkan signed URL untuk file siswa (berlaku 15 menit)

## Model Data

### Student

```prisma
model Student {
  id          Int      @id @default(autoincrement())
  name        String
  class       String
  parentName  String
  score       Float
  fileUrl     String?  # Path file di bucket (files/nama-file.pdf)
  fileName    String?
  fileType    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Konfigurasi

Konfigurasi dilakukan melalui file `.env`:

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

## Penggunaan

1. Instal dependensi:
   ```
   npm install
   ```

2. Jalankan migrasi database:
   ```
   npx prisma migrate dev
   ```

3. Jalankan server:
   ```
   npm run dev
   ```

## Penanganan File

- File disimpan secara private di Google Cloud Storage
- File disimpan dalam folder `files/` di bucket
- Hanya path file yang disimpan di database, bukan URL lengkap
- Akses file menggunakan signed URL yang berlaku 15 menit

## Catatan Keamanan

- File tidak dapat diakses publik
- Signed URL bersifat sementara (15 menit)
- Kredensial GCP harus dijaga kerahasiaannya 