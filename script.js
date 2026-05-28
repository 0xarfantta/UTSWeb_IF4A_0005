document.addEventListener('DOMContentLoaded', function () {

  initDarkMode();
  initKalkulatorEstimasi();
  initValidasiForm();
  initCounterAnimation();
  initBackToTop();
  initNavbarScroll();
  initActiveNavLink();
  initFooterYear();

});

function initDarkMode() {

  const toggleDesktop = document.getElementById('darkModeToggle');
  const toggleMobile  = document.getElementById('darkModeToggleMobile');
  const iconDesktop   = document.getElementById('darkIcon');
  const iconMobile    = document.getElementById('darkIconMobile');

  const savedTheme = localStorage.getItem('laundrygo-theme') || 'light';
  applyTheme(savedTheme);

  if (toggleDesktop) {
    toggleDesktop.addEventListener('click', function () {
      toggleTheme();
    });
  }

  if (toggleMobile) {
    toggleMobile.addEventListener('click', function () {
      toggleTheme();
    });
  }

   function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
  
    localStorage.setItem('laundrygo-theme', newTheme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    const isDark = theme === 'dark';

    if (iconDesktop) {
      iconDesktop.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    }
    if (iconMobile) {
      iconMobile.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    }

    [toggleDesktop, toggleMobile].forEach(function (btn) {
      if (btn) {
        if (isDark) {
          btn.classList.add('dark-active');
        } else {
          btn.classList.remove('dark-active');
        }
      }
    });
  }
}

function initKalkulatorEstimasi() {

  // Ambil elemen menggunakan getElementById
  const btnHitung      = document.getElementById('btnHitung');
  const beratInput     = document.getElementById('beratInput');
  const jenisSelect    = document.getElementById('jenisSelect');
  const hasilEstimasi  = document.getElementById('hasilEstimasi');

  // Pastikan elemen ada (kalau section services ter-render)
  if (!btnHitung) return;

  // Tambah event listener pada tombol hitung
  btnHitung.addEventListener('click', function () {
    hitungEstimasi();
  });

  // Juga hitung saat Enter ditekan di input berat
  beratInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') hitungEstimasi();
  });

  function hitungEstimasi() {

    const berat = parseFloat(beratInput.value);
    const harga = parseInt(jenisSelect.value);

    if (isNaN(berat) || berat <= 0) {
     
      hasilEstimasi.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i>Masukkan berat yang valid (minimal 1 kg)!';
      hasilEstimasi.style.display  = 'block';
      hasilEstimasi.style.background    = '#fff5f5';
      hasilEstimasi.style.border        = '1.5px solid #ffc9c9';
      hasilEstimasi.style.color         = '#c92a2a';
      return;
    }

    // Hitung total
    const berat_final = berat < 2 ? 2 : berat; // minimum 2 kg
    const total       = berat_final * harga;

    // Format Rupiah
    const totalFormatted = total.toLocaleString('id-ID');

    const selectedOption = jenisSelect.querySelector('option:checked');
    const namaJenis      = selectedOption.textContent.split('–')[0].trim();

    hasilEstimasi.innerHTML =
      '<i class="bi bi-calculator-fill me-2"></i>' +
      'Estimasi Total (' + namaJenis + '):<br>' +
      '<strong style="font-size:1.2rem;">Rp ' + totalFormatted + '</strong>' +
      (berat < 2 ? '<br><small style="opacity:0.7">(Min. 2 kg)</small>' : '');

    hasilEstimasi.style.display    = 'block';
    hasilEstimasi.style.background = '';
    hasilEstimasi.style.border     = '';
    hasilEstimasi.style.color      = '';

    hasilEstimasi.classList.remove('animate-pop');
    void hasilEstimasi.offsetWidth; // reflow trick untuk restart animasi
    hasilEstimasi.classList.add('animate-pop');
  }
}
