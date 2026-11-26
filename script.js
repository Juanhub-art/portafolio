document.addEventListener("DOMContentLoaded", () => {
    const enlacesNav = document.querySelectorAll("header nav a[href^='#']");

    enlacesNav.forEach((enlace) => {
        enlace.addEventListener("click", (evento) => {
            const idDestino = enlace.getAttribute("href");
            const seccion = document.querySelector(idDestino);

            if (seccion) {
                evento.preventDefault();
                seccion.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    const btnCopiar = document.getElementById("btn-copiar-correo");
    const correoElemento = document.getElementById("correo-texto");
    const estadoCopiado = document.getElementById("estado-copiado");

    if (btnCopiar && correoElemento) {
        btnCopiar.addEventListener("click", async () => {
            const correo = correoElemento.textContent.trim();

            const mostrarConfirmacion = (mensaje) => {
                if (estadoCopiado) {
                    estadoCopiado.textContent = mensaje;
                }
                const textoOriginal = btnCopiar.textContent;
                btnCopiar.textContent = "¡Copiado!";

                setTimeout(() => {
                    btnCopiar.textContent = textoOriginal;
                    if (estadoCopiado) {
                        estadoCopiado.textContent = "";
                    }
                }, 2000);
            };

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(correo);
                } else {
                    const inputTemporal = document.createElement("input");
                    inputTemporal.value = correo;
                    document.body.appendChild(inputTemporal);
                    inputTemporal.select();
                    document.execCommand("copy");
                    document.body.removeChild(inputTemporal);
                }
                mostrarConfirmacion("Correo copiado al portapapeles.");
            } catch (error) {
                if (estadoCopiado) {
                    estadoCopiado.textContent = "No se pudo copiar automáticamente. Copialo manualmente.";
                }
            }
        });
    }
});