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
