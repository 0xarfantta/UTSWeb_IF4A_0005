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