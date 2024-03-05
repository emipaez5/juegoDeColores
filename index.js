const pintar = document.querySelectorAll(".square");
const pickedColor = document.getElementById("colorDisplay");
const mensaje = document.getElementById("message");

const reiniciar = document.getElementById("reset")

const botones = document.querySelectorAll(".boton");

let colors = generateRandomColors(6)

let numberOfSquares = 6

reiniciar.addEventListener("click",reset);


function iniciarJuego(){
  pickedColor.textContent = pickColor(colors)
  pickedColor.style.color = pickColor(colors)
  randomColorDiv()
  seleccionado()
}

function pickColor(colors){
  let colorAleatorio = colors[Math.floor(Math.random()*colors.length)]
  return colorAleatorio
}

function randomColorDiv() {
  for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]];
  }
  colorear()
  
}
// Esta funcion crea un color aleatorio en rgb que se va a utilizar dentro de la funcion siguiente generateRandomColors(length)
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Generando los colores aleatorios de los divs

function generateRandomColors(length) {
  const colors = [];
  for (let i = 0; i < length; i++) {
    colors.push(randomColor());
  }
  return colors;
}

function colorear(){
  for (let i = 0; i < colors.length; i++) {
    const color = colors[i]
    pintar[i].style.backgroundColor = color
    pintar[i].addEventListener('click', function() {
      let clickedColor = this.style.backgroundColor
      if (clickedColor === pickedColor.style.color) {
        for (let j = 0; j < pintar.length; j++) {
          pintar[j].style.backgroundColor = pickedColor.style.color;
          mensaje.innerHTML = '¡Correcto!'
          reiniciar.innerHTML =  "Intentalo Nuevamente"
          botones[0].disabled = true
          botones[1].disabled = true
        }
        
      } else {
        this.style.backgroundColor = document.body.style.backgroundColor;
        mensaje.innerHTML ='Intentalo nuevamente'
        mensaje.classList.add("mensaje")
      }
    });
   }
   seleccionado()
}

//  Esta funcion la uso para que al hacer click en el boton de nuevos colores genere nuevos colores en el arreglo

 function reset(){
    location.reload();
 }

 function seleccionado(){
    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener('click', function() {
    // Eliminá la clase 'selected' de todos los botones
        for (let j = 0; j < botones.length; j++) {
            botones[j].classList.remove('selected');
    }

    // Agregá la clase 'selected' al botón cliqueado
         this.classList.add('selected');

    // Actualizá el valor de numSquare
        if (botones[i].innerHTML === 'EASY') {
      numberOfSquares = 3;
      easyDivs()
      console.log(numberOfSquares)
        } else if (botones[i].innerHTML === 'HARD') {
      numberOfSquares = 6;
      hardDivs()
      console.log(numberOfSquares)
        }
    });
  }
 }

//  Generando solo 3 obsciones para que sea mas facil

 function easyDivs(){
  colors = generateRandomColors(numberOfSquares)
  pickedColor.textContent = pickColor(colors)
  pickedColor.style.color = pickColor(colors)
  for (let i = 0; i < 3; i++) {
    pintar[i].style.backgroundColor = colors[i]
  }
  
  // Asignar el color del fondo a los últimos 3 divs
  for (let i = 3; i < 6; i++) {
    pintar[i].style.display = "none"
  }
 
 }

 function hardDivs(){
    colors = generateRandomColors(numberOfSquares)
    pickedColor.textContent = pickColor(colors)
    pickedColor.style.color = pickColor(colors)
    for (let i = 0; i < colors.length; i++) {
      pintar[i].style.display = "block"
      pintar[i].style.backgroundColor = colors[i]
    }
 
 }

// Esta funcion se usa para que primero cargue todo y luego ejecute la funcion iniciar juego

window.addEventListener("load", iniciarJuego)