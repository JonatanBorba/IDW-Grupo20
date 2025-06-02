/* Defino un array que va a tener salones por defecto */ 
let salonesDefecto = [
    { nombre: "El Bosque", capacidad: 50, direccion: "San Juan 425", descripcion: "Salón amplio y luminoso", imagen: "img/salon1.jpg" },
    { nombre: "En Sueños", capacidad: 35, direccion: "Av. Eva Perón 2995", descripcion: "Salón con juegos y espacios blandos", imagen: "img/salon2.jpg" },
    { nombre: "Bambino Park", capacidad: 80, direccion: "San Lorenzo (O) 677", descripcion: "Salón ideal para eventos de chicos", imagen: "img/salon3.jpg" },
    { nombre: "Trampolín Park", capacidad: 70, direccion: "San Lorenzo (O) 621", descripcion: "Salón con camas elásticas", imagen: "img/salon4.jpg" },
    { nombre: "EME Multiespacio", capacidad: 100, direccion: "Salto Uruguayo 1600", descripcion: "Salón para fiestas", imagen: "img/salon5.jpg" },
    { nombre: "El Quincho", capacidad: 20, direccion: "Av. Eva Perón 2995", descripcion: "Salón con piscina y parrilla", imagen: "img/salon6.jpg" },
];
// Variables para controlar si se está editando un salón y cuál es su índice en el array
let modoEdicion = false;
let indiceEdicion = -1;

//**************************************************************************************//
//                              ADMINISTRACION DE SALONES                               //
//**************************************************************************************//
document.addEventListener("DOMContentLoaded", () => {
    // Verificación de sesión
    if (!sessionStorage.getItem("usuario")) {
        alert("Usted debe iniciar sesión para acceder a esta página");
        window.location.href = "login.html";
        return;
    }

    // Botón salir
    const salir = document.getElementById("salir");
    if (salir) {
        salir.addEventListener("click", () => {
            sessionStorage.clear();
            localStorage.clear();
            window.location.href = "index.html";
        });
    }

    // Inicializar salones por defecto si no existen
    if (!localStorage.getItem("salones")) {
        localStorage.setItem("salones", JSON.stringify(salonesDefecto));
    }

    // Al cargar la página, muestra los salones en la tabla
    listarSalones();

    // Listeners
    document.getElementById("guardar").addEventListener("click", guardarSalon);
    document.getElementById("listar").addEventListener("click", listarSalones);
});

// Guardar o actualizar salón
function guardarSalon() {
    const nombre = document.getElementById("nombre").value.trim();
    const capacidad = parseInt(document.getElementById("capacidad").value);
    const direccion = document.getElementById("direccion").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const urlimagen = document.getElementById("urlimagen").value.trim();

    if (!nombre || !capacidad || !direccion || !descripcion || !urlimagen) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const nuevoSalon = {
        nombre,
        capacidad,
        direccion,
        descripcion,
        imagen: urlimagen
    };
    // Obtiene los salones actuales del localStorage
    let salones = JSON.parse(localStorage.getItem("salones")) || [];
    // Si estamos editando un salón que ya existe
    if (modoEdicion && indiceEdicion >= 0) {
        salones[indiceEdicion] = nuevoSalon;
        alert(`Salón "${nombre}" actualizado correctamente.`);
        modoEdicion = false;
        indiceEdicion = -1;
        document.getElementById("guardar").textContent = "Guardar";
    } else {
        // Verifica si ya existe un salón igual
        const existe = salones.some(s => s.nombre.toLowerCase() === nombre.toLowerCase());
        if (existe) {
            alert(`Ya existe un salón con el nombre "${nombre}".`);
            return;
        }
        salones.push(nuevoSalon);
        alert(`Salón "${nombre}" agregado correctamente.`);
    }

    localStorage.setItem("salones", JSON.stringify(salones));
    document.getElementById("admSalones").reset();
    listarSalones();
}

// Listar salones
function listarSalones() {
    const tablaBody = document.querySelector("#tablaSalones tbody");
    if (!tablaBody) return; // Si no encuentra la tabla, sale de la función

    tablaBody.innerHTML = "";
    const salones = JSON.parse(localStorage.getItem("salones")) || [];

    salones.forEach((salon, i) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${salon.nombre}</td>
            <td>${salon.direccion}</td>
            <td>${salon.descripcion}</td>
            <td><img src="${salon.imagen}" alt="${salon.nombre}" width="50px"></td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="eliminarSalon(${i})">Eliminar</button>
                <button class="btn btn-sm btn-success" onclick="editarSalon(${i})">Editar</button>
            </td>
        `;
        tablaBody.appendChild(fila);
    });
}

// Eliminar salón
function eliminarSalon(index) {
    let salones = JSON.parse(localStorage.getItem("salones")) || [];
    if (index >= 0 && index < salones.length) {
        salones.splice(index, 1);
        localStorage.setItem("salones", JSON.stringify(salones));
        listarSalones();
    }
}

// Editar salón
function editarSalon(index) {
    let salones = JSON.parse(localStorage.getItem("salones")) || [];
    if (index >= 0 && index < salones.length) {
        const salon = salones[index];
        // Carga los datos del salón
        document.getElementById("nombre").value = salon.nombre;
        document.getElementById("capacidad").value = salon.capacidad;
        document.getElementById("direccion").value = salon.direccion;
        document.getElementById("descripcion").value = salon.descripcion;
        document.getElementById("urlimagen").value = salon.imagen;
        // Activa modo edición
        modoEdicion = true;
        indiceEdicion = index;
        // Cambia el botón para que diga "Actualizar"
        document.getElementById("guardar").textContent = "Actualizar";
    }
}