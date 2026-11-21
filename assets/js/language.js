
document.addEventListener("DOMContentLoaded", () => {

    const languageButton = document.getElementById("language-toggle");
    const cvLink = document.getElementById("cv-link");

    if (!languageButton) return;

    /* =====================================
       DETECTAR IDIOMA ACTUAL
    ====================================== */

    function getSavedLanguage() {

        const translationCookie = document.cookie
            .split("; ")
            .find(cookie => cookie.startsWith("googtrans="));

        if (translationCookie) {

            const value = decodeURIComponent(
                translationCookie.split("=")[1]
            );

            if (value.endsWith("/en")) return "en";
            if (value.endsWith("/es")) return "es";
        }

        return localStorage.getItem("portfolio-language") || "es";
    }

    let currentLanguage = getSavedLanguage();

    /* =====================================
       ACTUALIZAR ENLACE DEL CV
    ====================================== */

    function updateCVLink() {

        if (!cvLink) return;

        if (currentLanguage === "en") {

            cvLink.href = "assets/documents/CV_Shaireth_EN.pdf";

        } else {

            cvLink.href = "assets/documents/CV_Shaireth_ES.pdf";

        }

    }

    /* =====================================
       ACTUALIZAR BOTÓN DE IDIOMA
    ====================================== */

    function updateButton() {

        const nextLanguage = currentLanguage === "es" ? "en" : "es";

        languageButton.textContent = nextLanguage.toUpperCase();

        languageButton.setAttribute(
            "aria-label",
            nextLanguage === "en"
                ? "Switch to English"
                : "Cambiar a español"
        );

        languageButton.setAttribute(
            "aria-pressed",
            String(currentLanguage === "en")
        );

        updateCVLink();

    }

    /* Inicialización */

    updateButton();

    /* =====================================
       CAMBIAR IDIOMA
    ====================================== */

    languageButton.addEventListener("click", () => {

        const nextLanguage = currentLanguage === "es" ? "en" : "es";

        if (typeof window.doGTranslate !== "function") {

            console.error("GTranslate todavía no está disponible.");
            return;

        }

        window.doGTranslate(`es|${nextLanguage}`);

        currentLanguage = nextLanguage;

        localStorage.setItem(
            "portfolio-language",
            currentLanguage
        );

        updateButton();

    });

});
