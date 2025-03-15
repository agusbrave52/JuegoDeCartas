let cartasMano1 = [];
let cartasMano2 = [];
let cartasPantallaMano1 = [];
let cartasPantallaMano2 = [];
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
            qrbox: { width: 500, height: 500 } // Área del QR
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
    nuevaCarta.setAttribute("name", carta.id);
    if(mano == 1){
        nuevaCarta.classList.add("text-bg-primary");
    }
    else{
        nuevaCarta.classList.add("text-bg-warning");
    }
    nuevaCarta.id = "carta-" + carta.id;
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
        EliminarCarta(carta.id, mano);
    });

    //atacar
    const botonAtacar = document.createElement("button");
    botonAtacar.textContent = "Atacar";
    botonAtacar.classList.add("btn", "btn-secondary");
    botonAtacar.addEventListener("click", () => {
        console.log("atacaaaaaa");
        AtacarClick(mano, carta.id);
    });

    //armar carta
    nuevaCarta.appendChild(cuerpoCarta);
    cuerpoCarta.appendChild(tituloCarta);
    cuerpoCarta.appendChild(statsCarta);
    nuevaCarta.appendChild(footer);
    footer.appendChild(botonEliminar);
    footer.appendChild(botonAtacar);

    if(mano == 1){
        cartasPantallaMano1.push(nuevaCarta);
    }
    else{
        cartasPantallaMano2.push(nuevaCarta);
    }
    MostrarCartas();
}

function MostrarCartas(){

    for(let i = 0; i < cartasPantallaMano1.length; i++){
        document.getElementById("mano1").appendChild(cartasPantallaMano1[i]);
    }
    for(let i = 0; i < cartasPantallaMano2.length; i++){
        document.getElementById("mano2").appendChild(cartasPantallaMano2[i]);
    }
}

function AtacarClick(mano, carta){
    
    if(mano == 1){
        // let cartas = document.getElementsByClassName("text-bg-warning");
        for(let i = 0; i < cartasPantallaMano2.length; i++){
            cartasPantallaMano2[i].style = "border: solid 4px; border-color: rgb(255, 0, 0)";
            //lo pongo en la carta
            let botonSeleccionar = document.createElement("button");
            botonSeleccionar.textContent = "Seleccionar"
            botonSeleccionar.classList.add("btn", "btn-light", "seleccionar2");
            botonSeleccionar.addEventListener("click", () =>{Atacar(cartasMano2[i])});

            let boton = cartasPantallaMano2[i]?.querySelector(".seleccionar2");
            
             // true si hay al menos un botón con la clase "seleccionar1"
            if(!boton){
                cartasPantallaMano2[i].appendChild(botonSeleccionar);
            }
        }
        let botonesMano1 = document.getElementsByClassName("seleccionar1");
        if(botonesMano1.length != 0){
            const cantBotones = botonesMano1.length;
            for(let i = cantBotones-1; i >= 0; i--){
                botonesMano1[i].remove();
                cartasPantallaMano1[i].style = "";
            }
        }
        localStorage.setItem("cartaAtacante", carta);
    }
    else{
        // let cartas = document.getElementsByClassName("text-bg-primary");
        for(let i = 0; i < cartasPantallaMano1.length; i++){
            cartasPantallaMano1[i].style = "border: solid 4px; border-color: rgb(255, 0, 0)";
            //lo pongo en la carta
            let botonSeleccionar = document.createElement("button");
            botonSeleccionar.textContent = "Seleccionar"
            botonSeleccionar.classList.add("btn", "btn-light", "seleccionar1");
            botonSeleccionar.addEventListener("click", () =>{Atacar(cartasMano1[i])});

            let boton = cartasPantallaMano1[i]?.querySelector(".seleccionar1");
            
            
             // true si hay al menos un botón con la clase "seleccionar1"
            if(!boton){
                cartasPantallaMano1[i].appendChild(botonSeleccionar);
            }
        }
        let botonesMano2 = document.getElementsByClassName("seleccionar2");
        if(botonesMano2.length != 0){
            const cantBotones = botonesMano2.length;
            for(let i = cantBotones -1; i >= 0; i--){
                botonesMano2[i].remove();
                cartasPantallaMano2[i].style = "";
            }
        }
    }
    //crear boton para cancelar
    if(!document.getElementById("cancelar")){
        const botonCancelar = document.createElement("button");
        botonCancelar.textContent = "Cancelar";
        botonCancelar.classList.add("btn", "btn-secondary");
        botonCancelar.id = "cancelar";
        botonCancelar.addEventListener("click", () => {CancelarBoton()});
        document.getElementById("primeraLinea").appendChild(botonCancelar);
    }
}

function EliminarCarta(cartaI, mano){
/*     console.log("cartas antes de eliminar");
    console.log(cartasMano2);
    console.log(cartasMano1);
    console.log(cartasPantallaMano1);
    console.log(cartasPantallaMano2); */
    if(mano == 1){
        const i = cartasMano1.findIndex(cart => cart.id === cartaI);
        if(0 !== -1){
            cartasMano1.splice(i, 1);
        }
        cartasPantallaMano1.splice(i,1);
    }
    else{
        const i = cartasMano2.findIndex(cart => cart.id === cartaI);
        if(0 !== -1){
            cartasMano2.splice(i, 1);
        }
        cartasPantallaMano2.splice(i,1);
    }
}

function CancelarBoton(){
    let botonesMano1 = document.getElementsByClassName("seleccionar1");
    if(botonesMano1.length != 0){
        const cantBotones = botonesMano1.length;
        for(let i = cantBotones-1; i >= 0; i--){
            botonesMano1[i].remove();
            cartasPantallaMano1[i].style = "";
        }
    }
    let botonesMano2 = document.getElementsByClassName("seleccionar2");
    if(botonesMano2.length != 0){
        const cantBotones = botonesMano2.length;
        for(let i = cantBotones -1; i >= 0; i--){
            botonesMano2[i].remove();
            cartasPantallaMano2[i].style = "";
        }
    }
    document.getElementById("cancelar").remove();
}

function Atacar(carta){
    
}


