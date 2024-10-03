

// Definimos las cartas y los valores en un array de objetos
const baraja = [
  { nombre: 'A', valor: 11 }, { nombre: '2', valor: 2 }, { nombre: '3', valor: 3 },
  { nombre: '4', valor: 4 }, { nombre: '5', valor: 5 }, { nombre: '6', valor: 6 },
  { nombre: '7', valor: 7 }, { nombre: '8', valor: 8 }, { nombre: '9', valor: 9 },
  { nombre: '10', valor: 10 }, { nombre: 'J', valor: 10 }, { nombre: 'Q', valor: 10 },
  { nombre: 'K', valor: 10 }
];

// Función para obtener una carta aleatoria
function obtenerCartaAleatoria() {
  return baraja[Math.floor(Math.random() * baraja.length)];
}

// Función para sumar el valor de las cartas
function sumarCartas(mano) {
  let suma = 0;
  let ases = 0;

  for (let carta of mano) {
    suma += carta.valor;
    if (carta.nombre === 'A') ases++; // Contar ases
  }

  // Si hay ases y la suma es mayor que 21, convertimos el valor de un as de 11 a 1
  while (ases > 0 && suma > 21) {
    suma -= 10;
    ases--;
  }

  return suma;
}

// Función para mostrar la mano actual
function mostrarMano(mano, jugador) {
  let manoTexto = mano.map(carta => carta.nombre).join(", ");
  console.log(`${jugador} tiene: ${manoTexto} (Total: ${sumarCartas(mano)})`);
}

// Simulación de una partida de Blackjack
function jugarBlackjack() {
  // Inicialización de manos
  let manoJugador = [obtenerCartaAleatoria(), obtenerCartaAleatoria()];
  let manoDealer = [obtenerCartaAleatoria(), obtenerCartaAleatoria()];

  let juegoTerminado = false;

  // Turno del jugador
  while (!juegoTerminado) {
    mostrarMano(manoJugador, "Jugador");
    let sumaJugador = sumarCartas(manoJugador);

    if (sumaJugador === 21) {
      console.log("¡Blackjack! El jugador gana.");
      juegoTerminado = true;
    } else if (sumaJugador > 21) {
      console.log("El jugador se pasó de 21. El dealer gana.");
      juegoTerminado = true;
    } else {
      let accion = prompt("¿Quieres 'pedir' otra carta o 'plantar'? (escribe 'pedir' o 'plantar')")
     
      if (accion.toLocaleLowerCase() === 'pedir' ) {
        manoJugador.push(obtenerCartaAleatoria());
      } else if (accion.toLocaleLowerCase() === 'plantar') {
        juegoTerminado = true;
      } else {
        console.log("p");
      }
    }
  }

  // Turno del dealer (si el jugador no ha perdido)
  if (sumarCartas(manoJugador) <= 21) {
    while (sumarCartas(manoDealer) < 17) {
      manoDealer.push(obtenerCartaAleatoria());
    }

    mostrarMano(manoDealer, "Dealer");
    let sumaDealer = sumarCartas(manoDealer);
    let sumaJugador = sumarCartas(manoJugador);

    // Comparación de resultados
    if (sumaDealer > 21) {
      console.log("El dealer se pasó de 21. El jugador gana.");
    } else if (sumaDealer > sumaJugador) {
      console.log("El dealer gana.");
    } else if (sumaDealer < sumaJugador) {
      console.log("El jugador gana.");
    } else {
      console.log("Es un empate.");
    }
  }
}

// Iniciar el juego
jugarBlackjack();