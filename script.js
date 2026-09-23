(() => {

const SITE_PASSWORD = "2003";
const ACCESS_KEY = "gfg-site-access-admin";

const hasSiteAccess = () => localStorage.getItem(ACCESS_KEY) === "granted";

const setupThemeSwitcher = () => {
    const root = document.documentElement;
    const themeButtons = document.querySelectorAll(".theme-option");
    const redThemeStylesheet = document.getElementById("redThemeStylesheet");
    const savedTheme = localStorage.getItem("gfg-theme") || "gray";

    const applyTheme = (theme) => {
        root.setAttribute("data-theme", theme);
        redThemeStylesheet.disabled = theme !== "red";

        document.querySelectorAll("img[data-gray-src][data-red-src]").forEach((image) => {
            image.src = theme === "red" ? image.dataset.redSrc : image.dataset.graySrc;
        });

        themeButtons.forEach((button) => {
            const isActive = button.dataset.themeOption === theme;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
    };

    themeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedTheme = button.dataset.themeOption;
            localStorage.setItem("gfg-theme", selectedTheme);
            applyTheme(selectedTheme);
        });
    });

    applyTheme(savedTheme);
};

const setupAuthentication = () => {
    const authScreen = document.getElementById("authScreen");
    const authClose = document.getElementById("authClose");
    const loginTab = document.getElementById("loginTab");
    const registerTab = document.getElementById("registerTab");
    const nameField = document.getElementById("nameField");
    const loginOptions = document.getElementById("loginOptions");
    const authTitle = document.getElementById("authTitle");
    const authSubtitle = document.getElementById("authSubtitle");
    const authSubmit = document.querySelector(".auth-submit");
    const passwordToggle = document.getElementById("passwordToggle");
    const password = document.getElementById("authPassword");

    if (!authScreen || !authTitle || !authSubtitle || !authSubmit || !password || !passwordToggle) {
        return;
    }

    const setSiteLockedState = (isLocked) => {
        document.body.classList.toggle("site-locked", isLocked);
        document.body.style.overflow = isLocked ? "hidden" : "";
    };

    const setMode = (mode) => {
        const isRegister = mode === "register";

        if (loginTab && registerTab) {
            loginTab.classList.toggle("is-active", !isRegister);
            registerTab.classList.toggle("is-active", isRegister);
            loginTab.setAttribute("aria-selected", String(!isRegister));
            registerTab.setAttribute("aria-selected", String(isRegister));
        }

        if (nameField) nameField.hidden = !isRegister;
        if (loginOptions) loginOptions.hidden = isRegister;

        authTitle.textContent = isRegister ? "Crie sua conta" : "Bem-vindo de volta";
        authSubtitle.textContent = isRegister ? "Comece a organizar seus treinos" : "Acesse sua conta para continuar";
        authSubmit.textContent = isRegister ? "CRIAR CONTA" : "ENTRAR";
        authScreen.dataset.mode = "login";
    };

    const openAdminGate = () => {
        authScreen.dataset.mode = "admin";

        if (authClose) authClose.hidden = true;
        if (loginTab && loginTab.parentElement) loginTab.parentElement.hidden = true;
        if (nameField) nameField.hidden = true;
        if (loginOptions) loginOptions.hidden = true;

        const emailField = document.querySelector(".auth-field:not(.name-field)");
        if (emailField) emailField.hidden = true;

        authTitle.textContent = "Área Administrativa";
        authSubtitle.textContent = "Digite a senha para continuar";
        authSubmit.textContent = "Entrar";
        authScreen.classList.add("is-visible");
        authScreen.setAttribute("aria-hidden", "false");
        setSiteLockedState(true);
        password.value = "";
        password.focus();
    };

    const openLoginModal = () => {
        if (authClose) authClose.hidden = false;
        if (loginTab && loginTab.parentElement) loginTab.parentElement.hidden = false;

        const emailField = document.querySelector(".auth-field:not(.name-field)");
        if (emailField) emailField.hidden = false;

        setMode("login");
        authScreen.classList.add("is-visible");
        authScreen.setAttribute("aria-hidden", "false");
        setSiteLockedState(false);
    };

    const closeAuth = () => {
        authScreen.classList.remove("is-visible");
        authScreen.setAttribute("aria-hidden", "true");
        setSiteLockedState(false);
    };

    const validateAdminAccess = () => {
        const typedPassword = password.value.trim();

        if (typedPassword === SITE_PASSWORD) {
            localStorage.setItem(ACCESS_KEY, "granted");
            if (loginTab && loginTab.parentElement) loginTab.parentElement.hidden = false;
            const emailField = document.querySelector(".auth-field:not(.name-field)");
            if (emailField) emailField.hidden = false;
            setMode("login");
            closeAuth();
            return;
        }

        authSubtitle.textContent = "Senha incorreta";
        password.value = "";
        password.focus();
    };

    if (!hasSiteAccess()) {
        openAdminGate();
    } else {
        if (authClose) authClose.hidden = false;
        closeAuth();
    }

    document.querySelectorAll(".auth-trigger").forEach((trigger) => {
        trigger.addEventListener("click", (event) => {
            event.preventDefault();

            if (!hasSiteAccess()) {
                openAdminGate();
                return;
            }

            openLoginModal();
        });
    });

    if (loginTab) loginTab.addEventListener("click", () => setMode("login"));
    if (registerTab) registerTab.addEventListener("click", () => setMode("register"));
    if (authClose) authClose.addEventListener("click", () => {
        if (hasSiteAccess()) {
            closeAuth();
        } else {
            openAdminGate();
        }
    });

    passwordToggle.addEventListener("click", () => {
        const isVisible = password.type === "text";
        password.type = isVisible ? "password" : "text";
        passwordToggle.textContent = isVisible ? "Mostrar" : "Ocultar";
    });

    authSubmit.addEventListener("click", () => {
        if (!hasSiteAccess()) {
            validateAdminAccess();
            return;
        }

        closeAuth();
    });

    password.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            if (!hasSiteAccess()) {
                validateAdminAccess();
                return;
            }

            closeAuth();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && authScreen.classList.contains("is-visible") && hasSiteAccess()) {
            closeAuth();
        }
    });
};

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        () => {
            setupThemeSwitcher();
            setupAuthentication();
        },
        { once: true }
    );

} else {

    setupThemeSwitcher();
    setupAuthentication();

}

})();
