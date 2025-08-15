// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// Creamos un Array vacio llamado listaAmigos que guardara los nombres que los usuarios ingresen
const listaAmigos = [];

// Referencias a elementos del DOM
const inputNombre = document.getElementById("amigo");
const listaHTML = document.getElementById("listaAmigos");
const resultadoHTML = document.getElementById("resultado");

// Función para agregar un amigo
function agregarAmigo() {
  const nombre = inputNombre.value.trim();

  if (nombre === "") {
    alert("Por favor, ingresa un nombre");
    return;
  }

  if (listaAmigos.includes(nombre)) {
    alert("Este nombre ya fue agregado");
    return;
  }

  listaAmigos.push(nombre);
  inputNombre.value = ""; // Limpiar el input
  mostrarLista();
}

// Función para mostrar la lista en pantalla
function mostrarLista() {
  listaHTML.innerHTML = ""; // Limpiar la lista antes de mostrar
  listaAmigos.forEach((nombre, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${nombre}`;
    listaHTML.appendChild(li);
  });
}

// Función para sortear un amigo secreto sin autoregalos
function sortearAmigo() {
  if (listaAmigos.length < 2) {
    alert("Necesitas al menos 2 amigos para sortear");
    return;
  }

  const nombresRestantes = [...listaAmigos];
  const resultados = [];

  listaAmigos.forEach((amigo, index) => {
    let indice;
    let intentos = 0;

    do {
      indice = Math.floor(Math.random() * nombresRestantes.length);
      intentos++;
      // Evita autoregalo, pero permite en última vuelta si es imposible
    } while (nombresRestantes[indice] === amigo && intentos < 10);

    // Si en el último caso queda autoregalo, rehacemos todo el sorteo
    if (nombresRestantes[indice] === amigo && nombresRestantes.length === 1) {
      return sortearAmigo(); // vuelve a empezar el sorteo
    }

    resultados.push(`${amigo} → ${nombresRestantes[indice]}`);
    nombresRestantes.splice(indice, 1);
  });


  // Mostrar resultados en pantalla
  resultadoHTML.innerHTML = "";
  resultados.forEach((r) => {
    const li = document.createElement("li");
    li.textContent = r;
    resultadoHTML.appendChild(li);
  });
}
