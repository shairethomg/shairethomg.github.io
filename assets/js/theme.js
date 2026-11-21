
/* =========================================================
   PORTAFOLIO PROFESIONAL — SHAIRETH CARVAJAL
   FASE 2 | BLOQUE 2.4 | SISTEMA DE TEMAS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.querySelector(".theme-icon");

    // Recuperar la preferencia guardada
    const savedTheme = localStorage.getItem("portfolio-theme");

    // Detectar el tema del sistema operativo
    const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    // Determinar el tema inicial
    let currentTheme = savedTheme ||
        (systemPrefersDark ? "dark" : "light");

    // Aplicar el tema
    function applyTheme(theme) {

        currentTheme = theme;

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        // Actualizar el icono y la descripción accesible
        if (themeIcon) {
            themeIcon.textContent =
                theme === "dark" ? "☀" : "☾";
        }

        if (themeToggle) {
            themeToggle.setAttribute(
                "aria-label",
                theme === "dark"
                    ? "Activar modo claro"
                    : "Activar modo oscuro"
            );

            themeToggle.setAttribute(
                "aria-pressed",
                String(theme === "dark")
            );
        }
    }

    // Aplicar el tema inicial
    applyTheme(currentTheme);

    // Cambiar el tema al pulsar el botón
    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            const newTheme =
                currentTheme === "light" ? "dark" : "light";

            // Guardar la preferencia del visitante
            localStorage.setItem("portfolio-theme", newTheme);

            applyTheme(newTheme);

        });

    }

    // Seguir los cambios del sistema si el visitante
    // todavía no ha seleccionado una preferencia manual
    window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).addEventListener("change", event => {

        const manualPreference =
            localStorage.getItem("portfolio-theme");

        if (!manualPreference) {
            applyTheme(event.matches ? "dark" : "light");
        }

    });

});
