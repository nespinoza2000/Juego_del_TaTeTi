miStorage = window.localStorage;
const RESET_BUTTON = document.getElementById("reboot");

// Crear una matriz de números enteros con 2 filas y 3 columnas
let matriz = [[1, 2, 3], [4, 5, 6]];

// Acceder al elemento en la segunda fila y la tercera columna (índice 1, 2)
console.log(matriz[1][2]); // 6

// Recorrer los elementos de la matriz con dos ciclos for anidados
for (let i = 0; i < matriz.length; i++) {
  for (let j = 0; j < matriz[i].length; j++) {
    console.log(matriz[i][j]);
  }
}

// dentro del script.js
const cells = document.querySelectorAll(".cells");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// al final de nuestro archivo script.js
let currentPlayer = "X";
let gameEnd = false;

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (gameEnd) {
      return;
    }
    if (cell.textContent === "") {
      cell.textContent = currentPlayer;
      
      currentPlayer === "X" ? cell.classList.add("red") : cell.classList.add("blue");

      if (checkWin()) {
        gameEnd = true;

        setTimeout(() => {  // Agregar un retraso de 100 milisegundos antes de mostrar la alerta
          alert(`${currentPlayer} es el ganador!`);
        }, 100);

      } else if (checkTie()) {
        gameEnd = true;

        setTimeout(() => {  // Agregar un retraso de 100 milisegundos antes de mostrar la alerta
          alert("Excelente juego, es un empate!");
        }, 100);

      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  });
});


RESET_BUTTON.addEventListener("click",reboot);


function checkWin() {
//en base a nuestra constante winConditions verificamos si la posición del tablero muestra alguna victoria.
  return winConditions.some(condition => {
    return condition.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

function checkTie() {
//en base a nuestras celdas del tablero verificamos que todas las celdas estén ocupadas por alguna ficha.
  return Array.from(cells).every(cell => {
    return cell.textContent !== "";
  });
}

function reboot() {
  // Reiniciar todas las celdas y eliminar clases de colores
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("red", "blue");
  });

  // Restablecer variables de juego
  currentPlayer = "X";
  gameEnd = false;
}

