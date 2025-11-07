const NUMERO_MAXIMO = 10;

let numeroSecreto = Math.floor(Math.random() * NUMERO_MAXIMO) + 1;

let numeroElegido;

let intentos = 0;


function adivinarNumero() {
    let entrada = prompt(`Adivina el número secreto (entre 1 y ' + ${NUMERO_MAXIMO}):`);
    return parseInt(entrada);
}

alert ("Comencemos a jugar!!");
console.log("Adivina el número secreto para ganar el premio, entre 1 y", NUMERO_MAXIMO);


while (true) {
    numeroElegido = adivinarNumero();
    intentos++;

    if (isNaN(numeroElegido) || numeroElegido < 1 || numeroElegido > NUMERO_MAXIMO) {
        alert("Por favor, ingresa un número válido entre 1 y " + NUMERO_MAXIMO + ".");
        continue;}


    if (numeroElegido === numeroSecreto) {
        alert(`¡Felicidades! Has adivinado el número secreto ${numeroSecreto} en ${intentos} intentos.`);
        console.log(`¡Felicidades! Has adivinado el número secreto ${numeroSecreto} en ${intentos} intentos.`);
        break;
    } else if (numeroElegido < numeroSecreto) {
        alert("El número secreto es mayor. Intenta de nuevo.");
        console.log("El número secreto es mayor. Intenta de nuevo.");
    } else {
        alert("El número secreto es menor. Intenta de nuevo.");
        console.log("El número secreto es menor. Intenta de nuevo.");
    }   
}

console.log("Mostramos los intentos del 1 al " + intentos);
for (let i = 1; i <= intentos; i++) {
    console.log("Intento número: " + i);
}   


let jugarDeNuevo;
do {
    jugarDeNuevo = prompt("¿Quieres jugar de nuevo? (SI/NO):").toUpperCase();
    if (jugarDeNuevo === "SI"){
        location.reload();
    } else if (jugarDeNuevo !== "NO"){
        alert("Por favor, responde con 'SI' o 'NO'.");
    }
} while (jugarDeNuevo !== "SI" && jugarDeNuevo !== "NO");

alert("Gracias por jugar. ¡Hasta la próxima!");
console.log("Gracias por jugar. ¡Hasta la próxima!");
