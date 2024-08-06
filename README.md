# Task Management System

Proyek ini adalah Sistem Manajemen Tugas sederhana yang dibangun dengan NestJS dan TypeScript. Ini memungkinkan pengguna untuk mengelola proyek dan tugas, serta mengundang pengguna lain untuk berkolaborasi dalam proyek. Aplikasi ini mencakup autentikasi menggunakan token JWT dan mendukung operasi CRUD untuk pengguna, proyek, dan tugas.
## Use Cases

1. **Registrasi dan Autentikasi Pengguna**
   - Pengguna dapat register dan login ke sistem.

2. **Manajemen Proyek**
    - Pengguna dapat membuat, membaca, memperbarui, dan menghapus proyek.
    - Pengguna dapat mengundang pengguna lain untuk berkolaborasi dalam proyek.

3. **Manajement Tugas**
    - Pengguna dapat membuat, membaca, memperbarui, dan menghapus tugas dalam proyek.
    - Tugas terkait dengan proyek tertentu dan hanya dapat dikelola oleh pengguna yang menjadi bagian dari proyek.

## Struktur

Proyek ini menggunakan pattern service-repository design untuk memisahkan business logic dan clean code.

### Kenapa Service-Repository Pattern?

Service-Repository design memisahkan logika akses data (repositori) dari business logic. Karena ini membantu dalam mempertahankan clean architecture, meningkatkan testability, dan membuat codebase lebih mudah untuk maintenance.

## Running the Project Locally

### Persyaratan

- Node.js (>= 14.x)
- npm (>= 6.x)
- MySQL

### Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd task-management-system


## API Documentasi
Dokumentasi API bisa dilihat di https://documenter.getpostman.com/view/29222401/2sA3rxrZcE
