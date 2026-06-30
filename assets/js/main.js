document.addEventListener('DOMContentLoaded', () => {

    // ==============================
    // Theme Toggle
    // ==============================
    const themeToggleBtns = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');

    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
    }

    themeToggleBtns.forEach(btn => {
        const icon = btn.querySelector('i');

        if (icon) {
            icon.classList.toggle('ph-moon', document.body.classList.contains('light-theme'));
            icon.classList.toggle('ph-sun', !document.body.classList.contains('light-theme'));
        }

        btn.addEventListener('click', () => {

            document.body.classList.toggle('light-theme');

            const isLight = document.body.classList.contains('light-theme');

            localStorage.setItem('theme', isLight ? 'light' : 'dark');

            themeToggleBtns.forEach(button => {
                const i = button.querySelector('i');

                if (!i) return;

                i.classList.toggle('ph-moon', isLight);
                i.classList.toggle('ph-sun', !isLight);
            });

        });
    });

    // ==============================
    // RTL Toggle
    // ==============================
    const rtlToggleBtns = document.querySelectorAll('#rtl-toggle, #rtl-toggle-mobile');
    const html = document.documentElement;

    html.setAttribute(
        'dir',
        localStorage.getItem('dir') === 'rtl' ? 'rtl' : 'ltr'
    );

    rtlToggleBtns.forEach(btn => {

        btn.addEventListener('click', () => {

            const rtl = html.getAttribute('dir') === 'rtl';

            html.setAttribute('dir', rtl ? 'ltr' : 'rtl');

            localStorage.setItem('dir', rtl ? 'ltr' : 'rtl');

        });

    });

    // ==============================
    // Mobile Menu
    // ==============================
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {

        menuToggle.addEventListener('click', function () {

            navMenu.classList.toggle('nav-open');

            menuToggle.classList.toggle('active');

            document.body.classList.toggle('menu-open');

        });

    }

    // ==============================
    // Home Dropdown
    // ==============================
    const homeItem = document.querySelector('.nav-item.has-submenu');
    const homeLink = document.querySelector('.nav-link-home');

    if (homeItem && homeLink) {

        homeLink.addEventListener('click', function (e) {

            if (window.innerWidth <= 991) {

                e.preventDefault();

                homeItem.classList.toggle('open');

                homeLink.setAttribute(
                    'aria-expanded',
                    homeItem.classList.contains('open')
                );

            }

        });

        document.addEventListener('click', function (e) {

            if (!homeItem.contains(e.target)) {

                homeItem.classList.remove('open');

                homeLink.setAttribute('aria-expanded', 'false');

            }

        });

    }

    // ==============================
    // Scroll To Top
    // ==============================
    let scrollTopBtn = document.getElementById('scroll-top');

    if (!scrollTopBtn) {

        scrollTopBtn = document.createElement('button');

        scrollTopBtn.id = 'scroll-top';

        scrollTopBtn.className = 'scroll-top';

        scrollTopBtn.setAttribute('aria-label', 'Scroll to top');

        scrollTopBtn.innerHTML = '<i class="ph ph-arrow-up"></i>';

        document.body.appendChild(scrollTopBtn);

    }

    function toggleScrollTop() {

        scrollTopBtn.classList.toggle('show', window.scrollY > 500);

    }

    toggleScrollTop();

    window.addEventListener('scroll', toggleScrollTop);

    scrollTopBtn.addEventListener('click', function () {

        window.scrollTo({

            top: 0,

            behavior: 'smooth'

        });

    });

});