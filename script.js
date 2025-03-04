let cartasMano1 = [];
let cartasMano2 = [];
let cartasPantalla = [];
let cantidad = 0;
document.addEventListener("DOMContentLoaded", () => {

});

function ObtenerCarta(mano){
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
                

                //crear carta y rellenar con datos

                if(mano == 1){
                    cantidad += 1;
                    jsonData.id = cantidad;
                    cartasMano1.push(jsonData);
                    AgregarCartaPantalla(1, jsonData)
                }
                else{
                    cantidad += 1;
                    jsonData.id = cantidad;
                    cartasMano2.push(jsonData);
                    AgregarCartaPantalla(2, jsonData)
                }
                console.log(jsonData);
                // MostrarCartas();
            } catch (error) {
                console.error("Error al obtener el JSON:", error);
            }
        },
        (errorMessage) => {
            console.warn("No se detecta QR:", errorMessage);
        }
    ).catch(console.error);
}

function AgregarCartaPantalla(mano, carta){

    const nuevaCarta = document.createElement("div");
    nuevaCarta.classList.add("card", "d-flex");
    nuevaCarta.setAttribute("value", carta.id);
    if(mano == 1){
        nuevaCarta.classList.add("text-bg-primary");
    }
    else{
        nuevaCarta.classList.add("text-bg-warning");
    }
    const cuerpoCarta = document.createElement("div");
    cuerpoCarta.classList.add("card-body");
    const tituloCarta = document.createElement("h5");
    tituloCarta.classList.add("card-title", "text-center");
    tituloCarta.innerHTML = carta.nombre;
    const statsCarta = document.createElement("p");
    statsCarta.classList.add("card-text");
    if (carta.energia == 0) {
        statsCarta.innerHTML = `${carta.ataque} - Ataque<br>${carta.defensa} - Defensa<br>${carta.vida} - Vida</p>`
    }
    else {
        statsCarta.innerHTML = `${carta.ataque} - Ataque<br>${carta.defensa} - Defensa<br>${carta.vida} - Vida<br> ${carta.energia} - Energia</p>`
    }

    const footer = document.createElement("div");
    footer.classList.add("card-footer");

    //botones de accion
    //eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("btn" , "btn-danger");
    botonEliminar.addEventListener("click", () => {
        nuevaCarta.remove();
    });

    //atacar
    const botonAtacar = document.createElement("button");
    botonAtacar.textContent = "Atacar";
    botonAtacar.classList.add("btn", "btn-secondary");
    botonAtacar.addEventListener("click", () => {
        console.log("atacaaaaaa");
    });

    //armar carta
    nuevaCarta.appendChild(cuerpoCarta);
    cuerpoCarta.appendChild(tituloCarta);
    cuerpoCarta.appendChild(statsCarta);
    nuevaCarta.appendChild(footer);
    footer.appendChild(botonEliminar);
    footer.appendChild(botonAtacar);

    cartasPantalla.push(nuevaCarta);
    MostrarCartas();
}

function MostrarCartas(){

    for(let i = 0; i < cartasPantalla.length; i++){
        if(cartasPantalla[i].classList.contains("text-bg-primary")){
            document.getElementById("mano1").appendChild(cartasPantalla[i]);
        }
        else{
            document.getElementById("mano2").appendChild(cartasPantalla[i]);
        }
    }
}
function AtacarCarta(carta){
    
}


