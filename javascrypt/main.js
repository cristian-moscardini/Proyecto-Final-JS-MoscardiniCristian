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
        mensaje.textContent = `🎉 Ganaste en ${intentos.length} intentos`;
    } else if (numero < numeroSecreto) {
        mensaje.textContent = "El número es mayor";
    } else {
        mensaje.textContent = "El número es menor";
    }

    inputNumero.value = "";
});

btnReiniciar.addEventListener("click", () => {
    localStorage.clear();
    intentos = [];
    numeroSecreto = Math.floor(Math.random() * NUMERO_MAXIMO) + 1;
    mensaje.textContent = "Juego reiniciado";
    mostrarIntentos();
});

// MOSTRAR INTENTOS AL CARGAR LA PÁGINA
mostrarIntentos();
