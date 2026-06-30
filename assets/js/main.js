document.addEventListener('DOMContentLoaded', () => {
    // ---- Theme Logic with LocalStorage ----
    const themeToggleBtns = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    
    // Check saved theme
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        themeToggleBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            if(icon) {
                icon.classList.remove('ph-sun');
                icon.classList.add('ph-moon');
            }
        });
    } else {
        themeToggleBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            if(icon) {
                icon.classList.remove('ph-moon');
                icon.classList.add('ph-sun');
            }
        });
    }

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            
            themeToggleBtns.forEach(b => {
                const icon = b.querySelector('i');
                if(icon) {
                    if (isLight) {
                        icon.classList.remove('ph-sun');
                        icon.classList.add('ph-moon');
                    } else {
                        icon.classList.remove('ph-moon');
                        icon.classList.add('ph-sun');
                    }
                }
            });
        });
    });

    // ---- RTL Logic with LocalStorage ----
    const rtlToggleBtns = document.querySelectorAll('#rtl-toggle, #rtl-toggle-mobile');
    const htmlEl = document.documentElement;

    // Check saved RTL
    if (localStorage.getItem('dir') === 'rtl') {
        htmlEl.setAttribute('dir', 'rtl');
    } else {
        htmlEl.setAttribute('dir', 'ltr');
    }

    rtlToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isRTL = htmlEl.getAttribute('dir') === 'rtl';
            if (isRTL) {
                htmlEl.setAttribute('dir', 'ltr');
                localStorage.setItem('dir', 'ltr');
            } else {
                htmlEl.setAttribute('dir', 'rtl');
                localStorage.setItem('dir', 'rtl');
            }
        });
    });

    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('nav-open');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    const homeItem = document.querySelector('.nav-item.has-submenu');
    const homeLink = document.querySelector('.nav-link-home');
    if (homeItem && homeLink) {
        homeLink.addEventListener('click', (event) => {
            event.preventDefault();
            homeItem.classList.toggle('open');
            homeLink.setAttribute('aria-expanded', homeItem.classList.contains('open'));
        });
        
        // Close submenu when clicking outside
        document.addEventListener('click', (event) => {
            if (!homeItem.contains(event.target)) {
                homeItem.classList.remove('open');
                homeLink.setAttribute('aria-expanded', 'false');
            }
        });
    }

    let scrollTopBtn = document.getElementById('scroll-top');
    if (!scrollTopBtn) {
        scrollTopBtn = document.createElement('button');
        scrollTopBtn.id = 'scroll-top';
        scrollTopBtn.className = 'scroll-top';
        scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
        scrollTopBtn.innerHTML = '<i class="ph ph-arrow-up"></i>';
        document.body.appendChild(scrollTopBtn);
    }

    if (scrollTopBtn) {
        const toggleScrollTop = () => {
            scrollTopBtn.classList.toggle('show', window.scrollY > 500);
        };
        toggleScrollTop();
        window.addEventListener('scroll', toggleScrollTop, { passive: true });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // Intercept nav links and show home page content while updating URL
    function interceptNavLinks(){
        const links = document.querySelectorAll('.nav-menu a');
        links.forEach(a => {
            // Avoid attaching multiple times
            if (a.dataset.spaAttached) return;
            a.dataset.spaAttached = '1';
            a.addEventListener('click', async (e) => {
                const href = a.getAttribute('href');
                if(!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
                e.preventDefault();
                try{
                    const res = await fetch('index.html');
                    if(!res.ok) return window.location.href = href;
                    const text = await res.text();
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(text, 'text/html');
                    // replace sections
                    const newSections = doc.querySelectorAll('body > section');
                    const currSections = document.querySelectorAll('body > section');
                    currSections.forEach(s => s.remove());
                    const footer = document.querySelector('footer');
                    newSections.forEach(s => footer.parentNode.insertBefore(s.cloneNode(true), footer));
                    // replace footer
                    const newFooter = doc.querySelector('footer');
                    if(newFooter && footer){
                        footer.replaceWith(newFooter.cloneNode(true));
                    }
                    // update URL
                    history.pushState({}, '', href);
                    // re-run initializers and reattach handlers
                    interceptNavLinks();
                    initAfterNav();
                }catch(err){
                    console.error(err);
                    window.location.href = href;
                }
            });
        });
    }
    interceptNavLinks();
    window.addEventListener('popstate', () => { interceptNavLinks(); });

    // Hook for re-initializing dynamic features after nav replacement
    function initAfterNav(){
        // reattach scroll-top and mobile toggle behavior
        const menuToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('nav-open');
                menuToggle.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
        }
        // ensure scroll top button exists
        let st = document.getElementById('scroll-top');
        if (!st) {
            st = document.createElement('button');
            st.id = 'scroll-top';
            st.className = 'scroll-top';
            st.setAttribute('aria-label', 'Scroll to top');
            st.innerHTML = '<i class="ph ph-arrow-up"></i>';
            document.body.appendChild(st);
            st.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
        }
    }
});
