document.addEventListener("DOMContentLoaded", () => {

    let carta1 = "";
    document.getElementById("scanButton").addEventListener("click", function () {
        const qrReader = document.getElementById("qr-reader");
        qrReader.style.display = "block"; // Mostrar el escáner

        const html5QrCode = new Html5Qrcode("qr-reader");

        html5QrCode.start(
            { facingMode: "environment" }, // Usa la cámara trasera
            {
                fps: 30, // Cuadros por segundo
                qrbox: { width: 250, height: 250 } // Área del QR
            },
            async (decodedText) => {
                console.log("QR detectado:", decodedText);

                // Detener el escaneo
                html5QrCode.stop().then(() => {
                    qrReader.style.display = "none"; // Ocultar el escáner
                }).catch(console.error);

                // Obtener y mostrar el JSON
                try {
                    // const response = await fetch(decodedText);
                    // console.log(response);
                    // const jsonData = await response.json();
                    const jsonData = JSON.parse(decodedText);
                    console.log(jsonData);
                    carta1 = jsonData;
                    let stringi = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${carta1.nombre}</h5>
                            <p class="card-text">${carta1.ataque} atk <br>${carta1.defensa} def<br>${carta1.vida} hp <br> ${carta1.energia} ene</p>
                            <button>eliminar carta</button>
                        </div>
                    </div>`
                    console.log(stringi);
                    document.getElementById("mano1").innerHTML += stringi;

                } catch (error) {
                    console.error("Error al obtener el JSON:", error);
                }
            },
            (errorMessage) => {
                console.warn("No se detecta QR:", errorMessage);
            }
        ).catch(console.error);
    });

});



