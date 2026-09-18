(() => {

const init = () => {

    if (document.getElementById("countdown")) return;

    const countdown = document.createElement("div");
    const message = document.createElement("div");

    countdown.id = "countdown";
    message.id = "update-message";

    message.textContent = "O site foi atualizado! Confira as novidades!";

    /* Contador */

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

    /* Mensagem */

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


    /* Próximo horário de 20:00 */

    function nextTwentyPM() {

        const now = new Date();
        const next = new Date(now);

        next.setHours(20, 0, 0, 0);

        if (next <= now) {
            next.setDate(next.getDate() + 1);
            next.setHours(20, 0, 0, 0);
        }

        return next;
    }


    let target = nextTwentyPM();
    let messageTimer;


    /* Atualiza o contador */

    function updateCountdown() {

        const remaining = target - new Date();

        if (remaining <= 0) {

            countdown.textContent = "";

            message.style.display = "block";

            clearTimeout(messageTimer);

            messageTimer = setTimeout(() => {

                message.style.display = "none";

                target = nextTwentyPM();

                updateCountdown();

            }, 5000);

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


    updateCountdown();

    setInterval(updateCountdown, 1000);
};


if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        init,
        { once: true }
    );

} else {

    init();

}

})();
