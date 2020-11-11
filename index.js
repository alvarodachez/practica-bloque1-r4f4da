// CONTENIDO DE LA PRÁCTICA:
// Vamos a añadir elementos en una lista (con la clase "color-list") con javascript a partir del array aportado en este documento, en la constante "colorList" (ver imagen en el proyecto "ejemplo_lista.png").

// Como se puede apreciar en la imagen, cada elemento que esté en una posición par de de la lista tiene que tener la clase "color-item--odd". Esta clase debe añadirse desde javascript, NO haciendo uso del selector css nth-of-type(odd) o similares. NOTA: En este caso vamos a considerar un elemento par pensando en el primer elemento como el 1 no como el 0.

// Cada elemento del listado contendrá:
//    * El nombre del color.
//    * Una muestra en la que se ve el color.
//    * Un botón que modifica el color del siguiente elemento de la lista.
//    * Un botón que modifica el color del fondo de la página.
// La información de cada item la obtendremos de cada objeto del array "colorList"

// La estructura de un item de la lista deberá quedar con de la siguiente forma en el HTML (ejemplo del item para el color "white"):
// <li class="color-item">
// 	<div class="color-name">Color: white</div>
// 	<div class="color-show">Muestra</div>
// 	<button class="color-set">Next item color</button>
// 	<button class="color-set">Page color</button>
// </li>

// En esta práctica hay que añadir 4 funcionalidades:
//    * Al hacer click directamente (no en un item o botón) sobre el fondo de la página (elemento body), debe aparecer un alert en el que aparezca la palabra "body".
//    * Al hacer click directamente sobre uno de los items de la lista (no en uno de sus botones) debe aparecer un "alert" en el que se indique el nombre de su color.
//    * Al hacer click sobre el botón con el texto "Next item color" deberá aplicarse el color de ese item al color de fondo del siguiente item (el último item cambia al primero).
//    * Al hacer click sobre el botón con el texto "Page color" deberá aplicarse el color de ese item al color de fondo de la página (elemento body).

// Buena suerte!
let cuerpo = document.getElementsByTagName("body")[0];
const colorList = [
  {
    colorName: "white",
    hex: "#ffffff"
  },
  {
    colorName: "red",
    hex: "#ff0000"
  },
  {
    colorName: "orange",
    hex: "#ffa500"
  },
  {
    colorName: "yellow",
    hex: "#ffff00"
  },
  {
    colorName: "orchid",
    hex: "#da70d6"
  },
  {
    colorName: "pink",
    hex: "#ffc0cb"
  },
  {
    colorName: "green",
    hex: "#008000"
  },
  {
    colorName: "silver",
    hex: "#c0c0c0"
  }
];

cuerpo.addEventListener("click", evento => {
  evento.stopPropagation();
  alert("body");
});

const createDivEvent = (elemento, color) => {
  elemento.addEventListener("click", evento => {
    evento.stopPropagation();
    alert(color);
  });
};

const changeBodyColor = (elemento, color) => {
  elemento.addEventListener("click", evento => {
    evento.stopPropagation();
    cuerpo.style.backgroundColor = color;
  });
};

const changeNextItemColor = (elemento, color) => {
  elemento.addEventListener("click", evento => {
    evento.stopPropagation();
    elemento.parentNode.nextSibling.style.backgroundColor = color;
  });
};

const changeFirstItemColor = (elemento, color) => {
  elemento.addEventListener("click", evento => {
    evento.stopPropagation();
    elemento.parentNode.parentNode.getElementsByTagName(
      "li"
    )[1].style.backgroundColor = color;
  });
};
const createList = () => {
  let list = document.getElementsByClassName("color-list")[0];
  let cont = 1;
  for (i of colorList) {
    let elementoLi = document.createElement("li");
    if (cont % 2 == 0) {
      elementoLi.setAttribute("class", "color-item color-item--odd");
    } else {
      elementoLi.setAttribute("class", "color-item");
    }
    createDivEvent(elementoLi, i.colorName);

    let nombreColor = document.createElement("div");
    nombreColor.setAttribute("class", "color-name");
    let textoNombreColor = document.createTextNode("Color: " + i.colorName);
    nombreColor.appendChild(textoNombreColor);

    let muestra = document.createElement("div");
    muestra.style.backgroundColor = i.hex;
    muestra.style.borderStyle = "dashed";
    muestra.setAttribute("class", "color-show");
    let textoMuestra = document.createTextNode("Muestra");
    muestra.appendChild(textoMuestra);

    let nextItemButton = document.createElement("button");
    nextItemButton.setAttribute("class", "color-set");
    let textoNextItemButton = document.createTextNode("Next Item Color");
    nextItemButton.appendChild(textoNextItemButton);

    if (cont != 8) {
      changeNextItemColor(nextItemButton, i.hex);
    } else {
      changeFirstItemColor(nextItemButton, i.hex);
    }

    let pageColorButton = document.createElement("button");
    pageColorButton.setAttribute("class", "color-set");
    let textoPageColorButton = document.createTextNode("Page Color");
    pageColorButton.appendChild(textoPageColorButton);

    changeBodyColor(pageColorButton, i.hex);

    elementoLi.appendChild(nombreColor);
    elementoLi.appendChild(muestra);
    elementoLi.appendChild(nextItemButton);
    elementoLi.appendChild(pageColorButton);

    list.appendChild(elementoLi);
    cont++;
  }
};
createList();
