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

function initValidasiForm() {

  const contactForm  = document.querySelector('#contactForm');
  const formNotif    = document.querySelector('#formNotif');

  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {

    e.preventDefault();

    const nama  = document.getElementById('contactNama').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const pesan = document.getElementById('contactPesan').value.trim();

    if (!nama || !email || !pesan) {
      tampilkanNotif(
        'error',
        '<i class="bi bi-exclamation-circle-fill me-2"></i>Lengkapi data terlebih dahulu!'
      );
      highlightEmptyFields(nama, email, pesan);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      tampilkanNotif(
        'error',
        '<i class="bi bi-envelope-x-fill me-2"></i>Format email tidak valid!'
      );
      document.getElementById('contactEmail').classList.add('is-invalid-custom');
      return;
    }

    tampilkanLoading();

    setTimeout(function () {
      tampilkanNotif(
        'success',
        '<i class="bi bi-check-circle-fill me-2"></i>Pesan berhasil terkirim! Kami akan menghubungi Anda segera.'
      );

      contactForm.reset();
      removeFieldHighlights();
    }, 1500);

  });

  function tampilkanNotif(tipe, htmlPesan) {
    formNotif.style.display = 'block';
    formNotif.className = 'form-notif notif-' + tipe;
    formNotif.innerHTML = htmlPesan;


    formNotif.scrollIntoView({ behavior: 'smooth', block: 'center' });

    if (tipe === 'success') {
      setTimeout(function () {
        formNotif.style.display = 'none';
      }, 5000);
    }
  }

  function tampilkanLoading() {
    formNotif.style.display = 'block';
    formNotif.className = 'form-notif';
    formNotif.style.background = 'var(--primary-bg)';
    formNotif.style.border     = '1.5px solid var(--primary-light)';
    formNotif.style.color      = 'var(--primary-dark)';
    formNotif.innerHTML =
      '<span class="spinner-border spinner-border-sm me-2" role="status"></span>' +
      'Mengirim pesan...';
  }

  function highlightEmptyFields(nama, email, pesan) {
    const namaEl  = document.getElementById('contactNama');
    const emailEl = document.getElementById('contactEmail');
    const pesanEl = document.getElementById('contactPesan');

    if (!nama)  namaEl.style.borderColor  = '#f03e3e';
    if (!email) emailEl.style.borderColor = '#f03e3e';
    if (!pesan) pesanEl.style.borderColor = '#f03e3e';

    [namaEl, emailEl, pesanEl].forEach(function (el) {
      el.addEventListener('input', function () {
        el.style.borderColor = '';
      }, { once: true });
    });
  }

  function removeFieldHighlights() {
    ['contactNama', 'contactEmail', 'contactPesan'].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.style.borderColor = '';
    });
  }
}

function initCounterAnimation() {

  const counterSection = document.getElementById('counterSection');
  const counters = document.querySelectorAll('.counter-number');

  if (!counterSection || counters.length === 0) return;

  let animated = false; 

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !animated) {
        animated = true;
        startCounterAnimation();
        observer.unobserve(counterSection);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(counterSection);

  function startCounterAnimation() {

    counters.forEach(function (counter) {

      const target   = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; 
      const steps    = 60;   
      const increment = target / steps;
      let current    = 0;
      let step       = 0;

   
      const timer = setInterval(function () {
        step++;
        current += increment;

        if (step >= steps || current >= target) {
          
          counter.innerHTML = target.toLocaleString('id-ID') + '+';
          clearInterval(timer);
        } else {
        
          counter.innerHTML = Math.floor(current).toLocaleString('id-ID') + '+';
        }
      }, duration / steps);

    });
  }
}

function initBackToTop() {

  const backToTopBtn = document.getElementById('backToTop');

  if (!backToTopBtn) return;

  window.addEventListener('scroll', function () {
   
    if (window.scrollY > 400) {

      backToTopBtn.classList.add('visible');
    } else {
  
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function initNavbarScroll() {

  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
      navbar.style.padding = '8px 0';
    } else {
      navbar.classList.remove('scrolled');
      navbar.style.padding = '14px 0';
    }
  });
}

function initActiveNavLink() {

  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.navbar-nav .nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');


        navLinks.forEach(function (link) {
          link.classList.remove('active');
        });

        const activeLink = document.querySelector('.navbar-nav .nav-link[href="#' + id + '"]');
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });
}

function initFooterYear() {
  const yearEl = document.getElementById('footerYear');
  if (yearEl) {
 
    yearEl.innerHTML = new Date().getFullYear();
  }
}


(function initRevealAnimation() {

  const styleEl = document.createElement('style');
  styleEl.innerHTML = [
    '.reveal-el { opacity: 0; transform: translateY(28px); transition: opacity 0.65s ease, transform 0.65s ease; }',
    '.reveal-el.revealed { opacity: 1; transform: translateY(0); }',
  ].join('\n');
  document.head.appendChild(styleEl);

  const revealTargets = document.querySelectorAll(
    '.service-card, .pricing-card, .testi-card, .process-step, .contact-info-item, .counter-card'
  );

  revealTargets.forEach(function (el) {
    el.classList.add('reveal-el');
  });


  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(function (el) {
    revealObserver.observe(el);
  });
})();

(function initNavCollapseOnClick() {
  const navLinks    = document.querySelectorAll('.navbar-nav .nav-link');
  const navCollapse = document.getElementById('navMenu');

  if (!navCollapse) return;

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      // Tutup navbar collapse di mobile setelah link diklik
      const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    });
  });
})();
