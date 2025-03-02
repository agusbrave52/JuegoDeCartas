document.addEventListener("DOMContentLoaded", () => {

});

function AgregarCarta(mano) {
    let carta1 = "";
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
                const jsonData = JSON.parse(decodedText);
                console.log(jsonData);
                carta1 = jsonData;

                //crear carta y rellenar con datos
                const nuevaCarta = document.createElement("div");
                nuevaCarta.classList.add("card");
                if(mano == 1){
                    nuevaCarta.classList.add("text-bg-primary");
                }
                else{
                    nuevaCarta.classList.add("text-bg-warning");
                }
                console.log(mano);
                const cuerpoCarta = document.createElement("div");
                cuerpoCarta.classList.add("card-body");
                const tituloCarta = document.createElement("h5");
                tituloCarta.classList.add("card-title");
                tituloCarta.innerHTML = carta1.nombre;
                const statsCarta = document.createElement("p");
                statsCarta.classList.add("card-text");
                if (carta1.energia == 0) {
                    statsCarta.innerHTML = `${carta1.ataque} atk <br>${carta1.defensa} def<br>${carta1.vida} hp</p>`
                }
                else {
                    statsCarta.innerHTML = `${carta1.ataque} atk <br>${carta1.defensa} def<br>${carta1.vida} hp <br> ${carta1.energia} ene</p>`
                }

                //botones de accion
                const botonEliminar = document.createElement("button");
                botonEliminar.textContent = "Eliminar";
                botonEliminar.classList.add("btn");
                botonEliminar.classList.add("btn-danger");
                botonEliminar.addEventListener("click", () => {
                    nuevaCarta.remove();
                });

                //armar carta
                nuevaCarta.appendChild(cuerpoCarta);
                cuerpoCarta.appendChild(tituloCarta);
                cuerpoCarta.appendChild(statsCarta);
                nuevaCarta.appendChild(botonEliminar);


                if(mano == 1){
                    document.getElementById("mano1").appendChild(nuevaCarta);
                }
                else{
                    document.getElementById("mano2").appendChild(nuevaCarta);
                }
            } catch (error) {
                console.error("Error al obtener el JSON:", error);
            }
        },
        (errorMessage) => {
            console.warn("No se detecta QR:", errorMessage);
        }
    ).catch(console.error);
}


