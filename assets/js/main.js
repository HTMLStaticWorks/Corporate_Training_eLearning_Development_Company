document.addEventListener("DOMContentLoaded", function () {

    // ==========================
    // Theme Toggle
    // ==========================
    const themeBtns = document.querySelectorAll("#theme-toggle, #theme-toggle-mobile");

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-theme");
    }

    function updateThemeIcons() {
        const isLight = document.body.classList.contains("light-theme");

        themeBtns.forEach(btn => {
            const icon = btn.querySelector("i");
            if (!icon) return;

            icon.classList.remove("ph-sun", "ph-moon");
            icon.classList.add(isLight ? "ph-moon" : "ph-sun");
        });
    }

    updateThemeIcons();

    themeBtns.forEach(btn => {
        btn.addEventListener("click", () => {

            document.body.classList.toggle("light-theme");

            localStorage.setItem(
                "theme",
                document.body.classList.contains("light-theme")
                    ? "light"
                    : "dark"
            );

            updateThemeIcons();
        });
    });


    // ==========================
    // RTL Toggle
    // ==========================
    const rtlBtns = document.querySelectorAll("#rtl-toggle, #rtl-toggle-mobile");
    const html = document.documentElement;

    html.dir = localStorage.getItem("dir") || "ltr";

    rtlBtns.forEach(btn => {

        btn.addEventListener("click", () => {

            html.dir = html.dir === "rtl" ? "ltr" : "rtl";

            localStorage.setItem("dir", html.dir);

        });

    });


    // ==========================
    // Mobile Menu
    // ==========================
    const menuToggle = document.getElementById("mobile-menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            menuToggle.classList.toggle("active");

            navMenu.classList.toggle("nav-open");

            document.body.classList.toggle("menu-open");

        });

    }


    // ==========================
    // Home Dropdown
    // ==========================
    const homeItem = document.querySelector(".nav-item.has-submenu");
    const homeLink = document.querySelector(".nav-link-home");

    if (homeItem && homeLink) {

        homeLink.addEventListener("click", function (e) {

            e.preventDefault();

            homeItem.classList.toggle("open");

            homeLink.setAttribute(
                "aria-expanded",
                homeItem.classList.contains("open")
            );

        });

        document.addEventListener("click", function (e) {

            if (!homeItem.contains(e.target)) {

                homeItem.classList.remove("open");

                homeLink.setAttribute("aria-expanded", "false");

            }

        });

    }


    // ==========================
    // Scroll To Top
    // ==========================
    let scrollTop = document.getElementById("scroll-top");

    if (!scrollTop) {

        scrollTop = document.createElement("button");

        scrollTop.id = "scroll-top";

        scrollTop.className = "scroll-top";

        scrollTop.innerHTML = '<i class="ph ph-arrow-up"></i>';

        document.body.appendChild(scrollTop);

    }

    function toggleScrollButton() {

        if (window.scrollY > 500) {

            scrollTop.classList.add("show");

        } else {

            scrollTop.classList.remove("show");

        }

    }

    toggleScrollButton();

    window.addEventListener("scroll", toggleScrollButton);

    scrollTop.addEventListener("click", function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

});