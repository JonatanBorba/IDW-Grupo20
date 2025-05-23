/*---------------------------------------------------------------------------- 
    Verifico si LocalStorage ya tiene datos y, si no, lo inicialízo.
----------------------------------------------------------------------------*/
import { salonesIniciales } from "./data.js";

if (!localStorage.getItem("salones")) {
    localStorage.setItem("salones", JSON.stringify(salonesIniciales));
}


/*---------------------------------------------------------------------------- 
    Funciones CRUD (Crear, Leer, Actualizar, Eliminar)
----------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------- 
Listo los salones en una tabla HTML.
        Creo una función para obtener los datos y mostrarlos
----------------------------------------------------------------------------*/
function mostrarSalones() {
    const salones = JSON.parse(localStorage.getItem("salones")) || [];
    const tabla = document.querySelector("#tablaSalones tbody");
    tabla.innerHTML = ""; 

    salones.forEach((salon) => {
        const fila = `<tr>
            <td>${salon.id}</td>
            <td>${salon.nombre}</td>
            <td>${salon.capacidad}</td>
            <td>${salon.ubicacion}</td>
            <td>
                <button onclick="editarSalon(${salon.id})">✏️</button>
                <button onclick="eliminarSalon(${salon.id})">❌</button>
            </td>
        </tr>`;
        tabla.innerHTML += fila;
    });
}

document.addEventListener("DOMContentLoaded", mostrarSalones);


/*---------------------------------------------------------------------------- 
        Agregar un nuevo salón Desde un formulario
----------------------------------------------------------------------------*/
function agregarSalon(event) {
    event.preventDefault();
    const nombre = document.querySelector("#nombre").value;
    const capacidad = document.querySelector("#capacidad").value;
    const ubicacion = document.querySelector("#ubicacion").value;

    let salones = JSON.parse(localStorage.getItem("salones")) || [];
    const nuevoSalon = {
        id: salones.length + 1,
        nombre,
        capacidad: Number(capacidad),
        ubicacion
    };

    salones.push(nuevoSalon);
    localStorage.setItem("salones", JSON.stringify(salones));
    mostrarSalones();
}
document.querySelector("#formSalon").addEventListener("submit", agregarSalon);


/*---------------------------------------------------------------------------- 
Edito un salón. Muestro los datos en el formulario y guardo la modificación.
----------------------------------------------------------------------------*/
function editarSalon(id) {
    let salones = JSON.parse(localStorage.getItem("salones")) || [];
    const salon = salones.find(s => s.id === id);

    document.querySelector("#nombre").value = salon.nombre;
    document.querySelector("#capacidad").value = salon.capacidad;
    document.querySelector("#ubicacion").value = salon.ubicacion;

    document.querySelector("#guardarCambios").onclick = function () {
        salon.nombre = document.querySelector("#nombre").value;
        salon.capacidad = Number(document.querySelector("#capacidad").value);
        salon.ubicacion = document.querySelector("#ubicacion").value;

        localStorage.setItem("salones", JSON.stringify(salones));
        mostrarSalones();
    };
}


/*---------------------------------------------------------------------------- 
        Elimino un salón
----------------------------------------------------------------------------*/
function eliminarSalon(id) {
    let salones = JSON.parse(localStorage.getItem("salones")) || [];
    salones = salones.filter(s => s.id !== id);
    localStorage.setItem("salones", JSON.stringify(salones));
    mostrarSalones();
}