Refrensi Website 
https://getwashlaundry.id/en
https://pimilaundry.com
Desain di modifikasi di bagian warna webstie, tampilan, fitur, dann layout

Fitur Manipulasi DOM yang digunakan

Fitur 1 – Dark Mode Toggle
Method: `classList.toggle()`, `setAttribute()`
Menyimpan preferensi tema ke `localStorage`
Ikon tombol berubah (bulan ↔ matahari)
Tersedia di navbar desktop dan mobile

Fitur 2 – Kalkulator Estimasi Harga
Method:`getElementById`, `querySelector`, `addEventListener`, `innerHTML`
Input: berat (kg) + jenis layanan
Harga: Reguler Rp 7.000/kg | Express Rp 12.000/kg | Premium Rp 15.000/kg
Hasil ditampilkan langsung via DOM manipulation

Fitur 3 – Validasi Form Contact
Method:`preventDefault()`, `getElementById`, `innerHTML`
Cek field kosong → notifikasi "Lengkapi data terlebih dahulu!"
Validasi format email dengan regex
Berhasil → notifikasi "Pesan berhasil terkirim!" + reset form
Tidak ada reload halaman

Fitur 4 – Counter Animation
Method:`setInterval`, `IntersectionObserver`, `classList`, `innerHTML`
Target: 5000+ Pelanggan, 1000+ Order, 100+ Mitra, 98+ % Kepuasan
Animasi dari 0 ke target saat section masuk viewport
Animasi hanya berjalan sekali

Fitur 5 – Back To Top Button
Method:`scroll event`, `classList.add/remove`, `scrollTo()`
Tombol muncul otomatis saat scroll > 400px
Animasi slide-up saat muncul
Klik smooth scroll ke atas
