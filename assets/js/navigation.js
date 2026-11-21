
/* =========================================================
   PORTAFOLIO PROFESIONAL — SHAIRETH CARVAJAL
   NAVEGACIÓN PRINCIPAL Y MENÚ MÓVIL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menu-toggle");
    const mainNavigation = document.getElementById("main-navigation");

    // Verificar que existan los elementos
    if (!menuToggle || !mainNavigation) {
        console.warn("No se encontraron los elementos del menú.");
        return;
    }

    // Abrir y cerrar el menú móvil
    menuToggle.addEventListener("click", () => {

        const isOpen = mainNavigation.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Cerrar menú de navegación"
                : "Abrir menú de navegación"
        );

    });

    // Cerrar el menú al seleccionar una sección
    const navigationLinks = mainNavigation.querySelectorAll("a");

    navigationLinks.forEach(link => {

        link.addEventListener("click", () => {

            mainNavigation.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menú de navegación"
            );

        });

    });

    // Cerrar el menú al volver a una pantalla grande
    window.addEventListener("resize", () => {

        if (window.innerWidth > 850) {

            mainNavigation.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

        }

    });

});



/* =====================================
   CARRUSEL DE CERTIFICADOS
====================================== */

document.addEventListener("DOMContentLoaded", () => {

    const track = document.getElementById("certificates-track");
    const nextButton = document.getElementById("cert-next");
    const prevButton = document.getElementById("cert-prev");
    const dotsContainer = document.getElementById("certificates-dots");

    if (!track || !nextButton || !prevButton || !dotsContainer) return;

    let moving = false;
    let currentIndex = 0;

    const certificates = Array.from(track.children);
    const totalCertificates = certificates.length;

    /* Crear indicadores */

    certificates.forEach((_, index) => {

        const dot = document.createElement("span");

        dot.classList.add("certificate-dot");

        if (index === 0) {
            dot.classList.add("active");
        }

        dotsContainer.appendChild(dot);

    });

    const dots = Array.from(dotsContainer.children);

    /* Actualizar indicador activo */

    function updateDots() {

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });

    }

    /* Calcular distancia */

    function getStep() {

        const card = track.firstElementChild;
        const gap = parseFloat(
            window.getComputedStyle(track).gap
        ) || 0;

        return card.getBoundingClientRect().width + gap;

    }

    /* Avanzar */

    function nextCertificate() {

        if (moving) return;

        moving = true;

        const step = getStep();

        track.style.transform = `translateX(-${step}px)`;

        track.addEventListener("transitionend", function finish() {

            track.removeEventListener("transitionend", finish);

            track.appendChild(track.firstElementChild);

            track.style.transition = "none";
            track.style.transform = "translateX(0)";

            track.offsetHeight;

            track.style.transition = "";

            currentIndex = (currentIndex + 1) % totalCertificates;

            updateDots();

            moving = false;

        });

    }

    /* Retroceder */

    function previousCertificate() {

        if (moving) return;

        moving = true;

        const step = getStep();

        track.style.transition = "none";

        track.insertBefore(
            track.lastElementChild,
            track.firstElementChild
        );

        track.style.transform = `translateX(-${step}px)`;

        track.offsetHeight;

        track.style.transition = "transform 0.45s ease";

        track.style.transform = "translateX(0)";

        track.addEventListener("transitionend", function finish() {

            track.removeEventListener("transitionend", finish);

            track.style.transition = "";

            currentIndex = (
                currentIndex - 1 + totalCertificates
            ) % totalCertificates;

            updateDots();

            moving = false;

        });

    }

    /* Eventos */

    nextButton.addEventListener("click", nextCertificate);
    prevButton.addEventListener("click", previousCertificate);

});
