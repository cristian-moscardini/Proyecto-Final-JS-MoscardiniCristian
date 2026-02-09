const NUMERO_MAXIMO = 10;
let numeroSecreto = Math.floor(Math.random() * NUMERO_MAXIMO) + 1;

let intentos = JSON.parse(localStorage.getItem("intentos")) || [];

const inputNumero = document.getElementById("numeroUsuario");
const btnAdivinar = document.getElementById("btnAdivinar");
const btnReiniciar = document.getElementById("btnReiniciar");
const mensaje = document.getElementById("mensaje");
const listaIntentos = document.getElementById("listaIntentos");

// MOSTRAR LOS INTENTOS GUARDADOS EN LOCALSTORAGE
const guardarIntentos = () => {
    localStorage.setItem("intentos", JSON.stringify(intentos));
};

// MOSTRAR INTENTOS EN LA PÁGINA
const mostrarIntentos = () => {
    listaIntentos.innerHTML = "";
    intentos.map((intento, index) => {
        const li = document.createElement("li");
        li.textContent = `Intento ${index + 1}: ${intento}`;
        listaIntentos.appendChild(li);
    });
};


// ACTUALIZAR IMAGEN DEL GATITO SEGÚN EL ESTADO
const actualizarImagenGatito = async (estado) => {
    const imgElement = document.getElementById("imgGatito");
    const url = `https://api.thecatapi.com/v1/images/search?limit=1`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        const nuevaImagen = datos[0].url;

        imgElement.src = nuevaImagen;
        imgElement.style.display = "block";
        
        imgElement.style.filter = (estado === 'triste') ? 'grayscale(100%)' : 'none';
    } catch (error) {
        console.error("Error al traer el gatito:", error);
    }
};


// EVENTO DEL BOTÓN ADIVINAR
btnAdivinar.addEventListener("click", () => {
    const numero = Number(inputNumero.value);

    if (numero < 1 || numero > NUMERO_MAXIMO) {
        mensaje.textContent = "Número inválido";
        return;
    }

    intentos.push(numero);
    guardarIntentos();
    mostrarIntentos();

    if (numero === numeroSecreto) {
        actualizarImagenGatito('feliz');
        document.body.style.background = "radial-gradient(circle, #004d40 0%, #000000 100%)";

        Swal.fire({
            title: '¡Felicidades!',
            text: `Adivinaste el número secreto en ${intentos.length} intentos.`,
            icon: 'success',
            confirmButtonText: '¡Genial!',
            confirmButtonColor: '#764ba2',
        });

        mensaje.textContent = `🎉 Ganaste en ${intentos.length} intentos`;

    } else {
        actualizarImagenGatito('triste');
        if (numero < numeroSecreto) {
            mensaje.textContent = "El número es mayor ⬆️";
        } else {
            mensaje.textContent = "El número es menor ⬇️";
        }
    }

    inputNumero.value = "";
});


//EVENTO DEL BOTÓN REINICIAR
btnReiniciar.addEventListener("click", () => {
    localStorage.clear();
    intentos = [];
    numeroSecreto = Math.floor(Math.random() * NUMERO_MAXIMO) + 1;
    mensaje.textContent = "Juego reiniciado";
    document.body.style.background = "radial-gradient(circle, #240b36 0%, #000000 100%)";
    actualizarImagenGatito('normal');
    mostrarIntentos();
});

// MOSTRAR INTENTOS AL CARGAR LA PÁGINA
mostrarIntentos();
