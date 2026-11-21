
document.addEventListener("DOMContentLoaded", () => {
    const languageButton = document.getElementById("language-toggle");

    if (!languageButton) return;

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
    }

    updateButton();

    languageButton.addEventListener("click", () => {
        const nextLanguage = currentLanguage === "es" ? "en" : "es";

        if (typeof window.doGTranslate !== "function") {
            console.error("GTranslate todavía no está disponible.");
            return;
        }

        window.doGTranslate(`es|${nextLanguage}`);

        currentLanguage = nextLanguage;
        localStorage.setItem("portfolio-language", currentLanguage);

        updateButton();
    });
});
