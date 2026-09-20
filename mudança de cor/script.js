(() => {

// Configura a abertura da tela de autenticação e a troca entre seus modos visuais.
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

    // Atualiza textos e campos conforme o usuário escolhe login ou cadastro.
    const setMode = (mode) => {
        const isRegister = mode === "register";
        loginTab.classList.toggle("is-active", !isRegister);
        registerTab.classList.toggle("is-active", isRegister);
        loginTab.setAttribute("aria-selected", String(!isRegister));
        registerTab.setAttribute("aria-selected", String(isRegister));
        nameField.hidden = !isRegister;
        loginOptions.hidden = isRegister;
        authTitle.textContent = isRegister ? "Crie sua conta" : "Bem-vindo de volta";
        authSubtitle.textContent = isRegister ? "Comece a organizar seus treinos" : "Acesse sua conta para continuar";
        authSubmit.textContent = isRegister ? "CRIAR CONTA" : "ENTRAR";
    };

    // Fecha a tela de autenticação sem enviar ou armazenar dados.
    const closeAuth = () => {
        authScreen.classList.remove("is-visible");
        authScreen.setAttribute("aria-hidden", "true");
    };

    // Abre a tela quando qualquer botão "Comece agora" é acionado.
    document.querySelectorAll(".auth-trigger").forEach((trigger) => trigger.addEventListener("click", (event) => {
        event.preventDefault();
        setMode("login");
        authScreen.classList.add("is-visible");
        authScreen.setAttribute("aria-hidden", "false");
    }));
    loginTab.addEventListener("click", () => setMode("login"));
    registerTab.addEventListener("click", () => setMode("register"));
    authClose.addEventListener("click", closeAuth);
    passwordToggle.addEventListener("click", () => {
        const isVisible = password.type === "text";
        password.type = isVisible ? "password" : "text";
        passwordToggle.textContent = isVisible ? "Mostrar" : "Ocultar";
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && authScreen.classList.contains("is-visible")) closeAuth();
    });
};

// Cria o contador de atualização mantido pelo projeto.
const init = () => {

    if (document.getElementById("countdown")) return;

    const countdown = document.createElement("div");
    const message = document.createElement("div");

    countdown.id = "countdown";
    message.id = "update-message";

    message.textContent = "O site foi atualizado! Confira as novidades!";

    /* Estilos visuais do contador */

    Object.assign(countdown.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",

        background: "linear-gradient(145deg, rgba(40, 4, 4, 0.98), rgba(18, 2, 2, 0.98))",
        color: "#fff4f4",

        width: "min(90vw, 620px)",
        padding: "28px 34px",
        borderRadius: "20px",

        border: "1px solid rgba(255, 90, 90, 0.45)",
        borderTop: "4px solid #ff5a5a",

        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        fontSize: "clamp(1.1rem, 3vw, 1.7rem)",
        fontWeight: "750",
        lineHeight: "1.4",
        letterSpacing: "0.02em",
        textAlign: "center",

        boxShadow: "0 18px 55px rgba(255, 42, 42, 0.18), 0 0 35px rgba(255, 90, 90, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
        backdropFilter: "blur(12px)",

        zIndex: "1000",

        transition: "transform 0.3s ease, box-shadow 0.3s ease"
    });

    /* Mensagem exibida quando o contador chega ao fim */

    Object.assign(message.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",

        background: "linear-gradient(145deg, rgba(44, 4, 4, 0.98), rgba(18, 2, 2, 0.98))",
        color: "#fff4f4",

        width: "min(90vw, 620px)",
        padding: "32px 38px",
        borderRadius: "20px",

        border: "1px solid rgba(255, 90, 90, 0.5)",
        borderTop: "4px solid #ff5a5a",

        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        fontSize: "clamp(1.1rem, 3vw, 1.55rem)",
        fontWeight: "750",
        lineHeight: "1.4",
        textAlign: "center",

        boxShadow: "0 18px 55px rgba(255, 42, 42, 0.18), 0 0 35px rgba(255, 90, 90, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
        backdropFilter: "blur(12px)",

        zIndex: "1001",

        display: "none"
    });

    document.body.append(countdown, message);


    /* Calcula a próxima atualização semanal para quarta-feira às 20:00 */

    function nextWednesdayAtEight(now = new Date()) {
        const next = new Date(now);
        const currentDay = next.getDay();
        const daysUntilWednesday = (3 - currentDay + 7) % 7;

        next.setDate(next.getDate() + daysUntilWednesday);
        next.setHours(20, 0, 0, 0);

        if (next <= now) {
            next.setDate(next.getDate() + 7);
            next.setHours(20, 0, 0, 0);
        }

        return next;
    }

    // Sempre usa a próxima quarta-feira às 20:00 como prazo do contador.
    function initialUpdateTarget() {
        return nextWednesdayAtEight(new Date());
    }


    let target = initialUpdateTarget();
    let messageTimer;
    let isShowingUpdateMessage = false;
    const updateMessageStorageKey = "gfg-update-message-until-wednesday-20";

    // Exibe a atualização e guarda até quando ela deve continuar visível.
    function showUpdateMessage(until = Date.now() + 60 * 60 * 1000) {
        if (isShowingUpdateMessage) return;

        isShowingUpdateMessage = true;
        localStorage.setItem(updateMessageStorageKey, String(until));
        countdown.textContent = "";
        countdown.style.display = "none";
        message.style.display = "block";
        clearTimeout(messageTimer);

        messageTimer = setTimeout(() => {
            localStorage.removeItem(updateMessageStorageKey);
            message.style.display = "none";
            countdown.style.display = "block";
            isShowingUpdateMessage = false;
            target = nextWednesdayAtEight();
            updateCountdown();
        }, Math.max(0, until - Date.now()));
    }


    /* Atualiza o texto do contador a cada segundo */

    function updateCountdown() {

        const remaining = target - new Date();

        if (remaining <= 0) {
            const updateEndsAt = target.getTime() + 60 * 60 * 1000;
            showUpdateMessage(updateEndsAt);
            return;
        }


        const totalSeconds =
            Math.floor(remaining / 1000);

        const days =
            Math.floor(totalSeconds / 86400);

        const hours =
            Math.floor((totalSeconds % 86400) / 3600);

        const minutes =
            Math.floor((totalSeconds % 3600) / 60);

        const seconds =
            totalSeconds % 60;


        countdown.textContent =
            `Próxima atualização em: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }


    const savedMessageUntil = Number(localStorage.getItem(updateMessageStorageKey));

    if (savedMessageUntil > Date.now()) {
        showUpdateMessage(savedMessageUntil);
    } else {
        localStorage.removeItem(updateMessageStorageKey);
        updateCountdown();
    }

    setInterval(updateCountdown, 1000);
};


if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        () => {
            setupAuthentication();
            init();
        },
        { once: true }
    );

} else {

    setupAuthentication();
    init();

}

})();
