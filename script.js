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

        backgroundColor: "#151515",
        color: "#ffffff",

        padding: "30px 45px",
        borderRadius: "12px",

        border: "1px solid #333",
        borderTop: "4px solid #e32626",

        fontSize: "28px",
        fontWeight: "bold",
        textAlign: "center",

        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.6)",

        zIndex: "1000",

        transition: "0.3s"
    });

    /* Mensagem */

    Object.assign(message.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",

        backgroundColor: "#151515",
        color: "#ffffff",

        padding: "35px 50px",
        borderRadius: "12px",

        border: "1px solid #333",
        borderTop: "4px solid #e32626",

        fontSize: "25px",
        fontWeight: "bold",
        textAlign: "center",

        boxShadow: "0 10px 35px rgba(0, 0, 0, 0.7)",

        zIndex: "1001",

        display: "none"
    });

    document.body.append(countdown, message);


    /* Próximo sábado */

    function nextSaturdayMidnight() {

        const now = new Date();
        const next = new Date(now);

        const daysUntilSaturday =
            (6 - now.getDay() + 7) % 7;

        next.setDate(
            now.getDate() + daysUntilSaturday
        );

        next.setHours(0, 0, 0, 0);

        if (next <= now) {
            next.setDate(
                next.getDate() + 7
            );
        }

        return next;
    }


    let target = nextSaturdayMidnight();
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

                target = nextSaturdayMidnight();

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
