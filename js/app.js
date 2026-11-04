/*
  Tarea 6 · DWEC · Achraf Akhmoul
  Objetos y arrays.
*/

console.log("app.js cargado");

function comoTexto(lista) {
  return "[" + lista.join(", ") + "]";
}

// ============================================================
// Ejercicio 1 · Ficha de estudiante
// ============================================================

const estudiante = {
  nombre: "Achraf",
  apellidos: "Akhmoul",
  edad: 20,
  curso: "2.º DAW",
  presentarse: function () {
    return "Soy " + this.nombre + " " + this.apellidos + ", tengo " + this.edad + " años y estudio " + this.curso + ".";
  }
};

function verFicha() {
  const salida = document.querySelector("#salida1");
  salida.textContent = "";

  const ul = document.createElement("ul");
  ul.classList.add("list-group", "mb-2");

  const claves = ["nombre", "apellidos", "edad", "curso"];
  claves.forEach(function (clave) {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = clave + ": " + estudiante[clave];
    ul.append(li);
  });
  salida.append(ul);

  const p = document.createElement("p");
  p.classList.add("fw-semibold", "mb-0");
  p.textContent = estudiante.presentarse();
  salida.append(p);

  console.log("Ejercicio 1 (verFicha):", estudiante);
}

function cumplirAnios() {
  estudiante.edad++;
  verFicha();
  console.log("Ejercicio 1 (cumplirAnios): edad actual =", estudiante.edad);
}

function quitarCurso() {
  delete estudiante.curso;
  verFicha();
  console.log("Ejercicio 1 (quitarCurso): curso borrado. Valor actual:", estudiante.curso);
}


// ============================================================
// Ejercicio 2 · Colores
// ============================================================

const colores = ["rojo", "verde", "azul"];

function mostrarColores() {
  const lista = document.querySelector("#listaColores");
  lista.textContent = "";

  colores.forEach(function (color) {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = color;
    lista.append(li);
  });

  document.querySelector("#totalColores").textContent = colores.length;
}

function avisar2(mensaje) {
  const aviso = document.querySelector("#aviso2");
  aviso.textContent = mensaje;
  aviso.classList.remove("d-none");
}

function anadirColor() {
  const casilla = document.querySelector("#color");
  const color = casilla.value.trim();

  if (color === "") {
    avisar2("Escribe un color antes de pulsar «Añadir».");
    return;
  }

  colores.push(color);
  casilla.value = "";
  document.querySelector("#aviso2").classList.add("d-none");
  mostrarColores();
  console.log("Ejercicio 2: push →", comoTexto(colores));
}

function quitarUltimo() {
  if (colores.length === 0) {
    avisar2("La lista de colores ya está vacía.");
    return;
  }
  document.querySelector("#aviso2").classList.add("d-none");
  const colorSacado = colores.pop();
  mostrarColores();
  console.log("Ejercicio 2: pop (último) → sacado:", colorSacado, "| lista:", comoTexto(colores));
}

function quitarPrimero() {
  if (colores.length === 0) {
    avisar2("La lista de colores ya está vacía.");
    return;
  }
  document.querySelector("#aviso2").classList.add("d-none");
  const colorSacado = colores.shift();
  mostrarColores();
  console.log("Ejercicio 2: shift (primero) → sacado:", colorSacado, "| lista:", comoTexto(colores));
}

mostrarColores();


// ============================================================
// Ejercicio 3 · Catálogo de productos
// ============================================================

const productos = [
  { nombre: "Teclado mecánico", precio: 79.9, categoria: "Periféricos" },
  { nombre: "Ratón inalámbrico", precio: 24.5, categoria: "Periféricos" },
  { nombre: "Monitor 27 pulgadas", precio: 189, categoria: "Pantallas" },
  { nombre: "Alfombrilla XL", precio: 12, categoria: "Accesorios" },
  { nombre: "Webcam HD", precio: 49.99, categoria: "Vídeo" },
  { nombre: "Auriculares con micro", precio: 59, categoria: "Audio" }
];

function pintarProductos(lista) {
  const cuerpo = document.querySelector("#tablaProductos");
  cuerpo.textContent = "";

  lista.forEach(function (producto) {
    const fila = document.createElement("tr");

    const nombre = document.createElement("td");
    nombre.textContent = producto.nombre;

    const categoria = document.createElement("td");
    categoria.textContent = producto.categoria;

    const precio = document.createElement("td");
    precio.classList.add("text-end");
    precio.textContent = producto.precio.toFixed(2) + " €";

    fila.append(nombre, categoria, precio);
    cuerpo.append(fila);
  });
}

function mostrarProductos() {
  pintarProductos(productos);
  document.querySelector("#mensaje3").textContent = "Mostrando el catálogo completo: " + productos.length + " productos.";
  console.log("Ejercicio 3: mostrar todos los productos");
}

function ordenarPorPrecio() {
  const copia = [...productos];
  copia.sort(function (a, b) {
    return a.precio - b.precio;
  });
  pintarProductos(copia);
  document.querySelector("#mensaje3").textContent = "Catálogo ordenado de más barato a más caro (sobre una copia).";
  console.log("Ejercicio 3: ordenarPorPrecio (copia) →", copia);
}

function filtrarCaros() {
  const filtrados = productos.filter(function (p) {
    return p.precio > 50;
  });
  pintarProductos(filtrados);
  document.querySelector("#mensaje3").textContent = "Productos con precio superior a 50 €: " + filtrados.length + " encontrados.";
  console.log("Ejercicio 3: filtrarCaros (>50€) →", filtrados);
}

function buscarProducto() {
  const texto = document.querySelector("#buscarProducto").value.trim().toLowerCase();
  const mensaje = document.querySelector("#mensaje3");

  if (texto === "") {
    mensaje.textContent = "Escribe un nombre para buscar.";
    return;
  }

  const encontrado = productos.find(function (p) {
    return p.nombre.toLowerCase().includes(texto);
  });

  if (encontrado === undefined) {
    mensaje.textContent = "No se ha encontrado ningún producto que contenga «" + texto + "».";
    document.querySelector("#tablaProductos").textContent = "";
    console.log("Ejercicio 3: buscarProducto («" + texto + "») -> No encontrado");
  } else {
    mensaje.textContent = "Producto encontrado: " + encontrado.nombre;
    pintarProductos([encontrado]);
    console.log("Ejercicio 3: buscarProducto («" + texto + "») ->", encontrado);
  }
}

mostrarProductos();


// ============================================================
// Ejercicio 4 · Notas
// ============================================================

const alumno = {
  nombre: "Achraf",
  notas: [],
  anadirNota: function (nota) {
    if (Number.isNaN(nota) || nota < 0 || nota > 10) {
      return false;
    }
    this.notas.push(nota);
    return true;
  },
  media: function () {
    if (this.notas.length === 0) {
      return 0;
    }
    const suma = this.notas.reduce(function (acumulador, actual) {
      return acumulador + actual;
    }, 0);
    return suma / this.notas.length;
  }
};

function mostrarNotas() {
  const contenedor = document.querySelector("#notas");
  contenedor.textContent = "";

  alumno.notas.forEach(function (nota) {
    const badge = document.createElement("span");
    badge.classList.add("badge", "me-1", "fs-6");
    if (nota >= 5) {
      badge.classList.add("text-bg-success");
    } else {
      badge.classList.add("text-bg-danger");
    }
    badge.textContent = nota;
    contenedor.append(badge);
  });

  const pMedia = document.querySelector("#media");
  if (alumno.notas.length === 0) {
    pMedia.textContent = "Todavía no hay notas.";
  } else {
    pMedia.textContent = "Media de " + alumno.notas.length + " notas: " + alumno.media().toFixed(2);
  }
}

function anadirNota() {
  const casilla = document.querySelector("#nota");
  const error = document.querySelector("#error4");
  const valorTexto = casilla.value;

  if (valorTexto === "") {
    error.textContent = "La casilla no puede estar vacía.";
    error.classList.remove("d-none");
    return;
  }

  const numero = Number(valorTexto);
  const exito = alumno.anadirNota(numero);

  if (!exito) {
    error.textContent = "Nota no válida. Debe ser un número entre 0 y 10.";
    error.classList.remove("d-none");
  } else {
    error.classList.add("d-none");
    casilla.value = "";
    mostrarNotas();
    console.log("Ejercicio 4: nota añadida:", numero, "| notas:", comoTexto(alumno.notas));
  }
}

function borrarNotas() {
  alumno.notas = [];
  document.querySelector("#error4").classList.add("d-none");
  mostrarNotas();
  console.log("Ejercicio 4: notas borradas");
}

mostrarNotas();


// ============================================================
// Ejercicio 5 · map, filter y reduce
// ============================================================

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function verDobles() {
  const dobles = numeros.map(function (n) {
    return n * 2;
  });
  const salida = document.querySelector("#salida5");
  salida.textContent = "1. map (dobles): " + comoTexto(dobles) + "\nOriginal: " + comoTexto(numeros);
  console.log("Ejercicio 5 - map:", dobles);
}

function verPares() {
  const pares = numeros.filter(function (n) {
    return n % 2 === 0;
  });
  const salida = document.querySelector("#salida5");
  salida.textContent = "1. filter (pares): " + comoTexto(pares) + "\nOriginal: " + comoTexto(numeros);
  console.log("Ejercicio 5 - filter:", pares);
}

function verSuma() {
  const suma = numeros.reduce(function (acc, n) {
    return acc + n;
  }, 0);
  const salida = document.querySelector("#salida5");
  salida.textContent = "1. reduce (suma): " + suma + "\nOriginal: " + comoTexto(numeros);
  console.log("Ejercicio 5 - reduce:", suma);
}

function verCadena() {
  const pares = numeros.filter(function (n) {
    return n % 2 === 0;
  });
  const dobles = pares.map(function (n) {
    return n * 2;
  });
  const sumaDobles = dobles.reduce(function (acc, n) {
    return acc + n;
  }, 0);

  const salida = document.querySelector("#salida5");
  salida.textContent = 
    "1. Pares: " + comoTexto(pares) + "\n" +
    "2. Dobles: " + comoTexto(dobles) + "\n" +
    "3. Suma: " + sumaDobles;
  console.log("Ejercicio 5 - Cadena completada. Resultado final:", sumaDobles);
}


// ============================================================
// Ejercicio 6 · Ciudades
// ============================================================

const ciudadesOriginal = ["Granada", "Sevilla", "Málaga", "Córdoba", "Jaén", "Almería", "Cádiz", "Huelva"];
let ciudades = [...ciudadesOriginal];

function mostrarCiudades() {
  const contenedor = document.querySelector("#ciudades");
  contenedor.textContent = "";

  ciudades.forEach(function (ciudad, posicion) {
    const badge = document.createElement("span");
    badge.classList.add("badge", "text-bg-primary", "me-1", "mb-1");
    badge.textContent = posicion + " · " + ciudad;
    contenedor.append(badge);
  });
}

function verSlice() {
  const trozo = ciudades.slice(2, 5);
  const salida = document.querySelector("#salida6");
  salida.textContent = "slice(2, 5) devuelve: " + comoTexto(trozo) + ". Siguen en el array: " + ciudades.length + " ciudades.";
  console.log("Ejercicio 6 - slice(2, 5):", trozo, "| Array original intacto:", comoTexto(ciudades));
}

function hacerSplice() {
  const salida = document.querySelector("#salida6");
  if (ciudades.length < 3) {
    salida.textContent = "¡Quedan menos de 3 ciudades! Debes pulsar «Restaurar» antes de volver a hacer splice.";
    return;
  }
  const eliminadas = ciudades.splice(2, 2);
  mostrarCiudades();
  salida.textContent = "splice(2, 2) ha quitado: " + comoTexto(eliminadas) + ". Quedan " + ciudades.length + " ciudades.";
  console.log("Ejercicio 6 - splice(2, 2) eliminadas:", eliminadas, "| Array modificado:", comoTexto(ciudades));
}

function restaurarCiudades() {
  ciudades = [...ciudadesOriginal];
  mostrarCiudades();
  document.querySelector("#salida6").textContent = "Ciudades restauradas a su estado original (" + ciudades.length + " ciudades).";
  console.log("Ejercicio 6 - Restaurar:", comoTexto(ciudades));
}

function buscarCiudad() {
  const nombre = document.querySelector("#buscarCiudad").value.trim();
  const salida = document.querySelector("#salida6");

  if (nombre === "") {
    salida.textContent = "Escribe el nombre de una ciudad para buscar.";
    return;
  }

  const esta = ciudades.includes(nombre);
  const posicion = ciudades.indexOf(nombre);

  salida.textContent = "includes(\"" + nombre + "\") -> " + esta + " | indexOf(\"" + nombre + "\") -> " + posicion;
  console.log("Ejercicio 6 - Búsqueda de «" + nombre + "»: includes =", esta, ", indexOf =", posicion);
}

mostrarCiudades();