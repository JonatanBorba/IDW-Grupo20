
//Seccion del Loguin
document.addEventListener("DOMContentLoaded",() => {

    if(!sessionStorage.getItem("usuario")){
                alert("Usted debe iniciar sesión para acceder a esta página")
                window.location.href = "login.html"; 
                return    
            } 

    const salir = document.querySelector(".btn-danger");

    if(salir){
        salir.addEventListener("click", ()=>{
            //sessionStorage.clear();
            //localStorage.clear();
            window.location.href = "index.html";
        });
        }
});

/* Defino un array que va a tener Servicios por defecto */
const serviciosDefecto = [
  { nombre: "Catering Profesional", descripcion: "Catering completo para tu evento.", imagen: "img/servicio-catering.jpg", precio: 3800 },
  { nombre: "Barra de tragos", descripcion: "Tragos personalizados durante el evento.", imagen: "img/servicios-barrat.jpg", precio: 2600 },
  { nombre: "Decoración", descripcion: "Decoración temática a tu gusto.", imagen: "img/servicio-decoracion.jpg", precio: 450000 },
  { nombre: "Disc Jockey", descripcion: "DJ profesional con animación.", imagen: "img/servicio-disckjock.jpg", precio: 200000 },
  { nombre: "Iluminación", descripcion: "Luces LED y proyector.", imagen: "img/servicio-iluminacion.jpg", precio: 150000 },
  { nombre: "Centros de Mesa", descripcion: "Centros personalizados.", imagen: "img/servicio-centrom.jpg", precio: 80000 }
];


// Variables para controlar si se está editando un salón y cuál es su índice en el array
let modoEdicion = false;
let indiceEdicion = -1;
let servicios = [];

//**************************************************************************************//
//                              ADMINISTRACION DE SERVICIOS                             //
//**************************************************************************************//
 // Inicializar servicios por defecto si no existen
    if (!localStorage.getItem("servicios")) {
        localStorage.setItem("servicios", JSON.stringify(serviciosDefecto));
    }

    // Al cargar la página, muestra los servicios en la tabla
    listarServicios();

    // Listeners
    document.getElementById("guardar_srv").addEventListener("click", guardarServicio);
    document.getElementById("listar_srv").addEventListener("click", listarServicios);

// Guardar o actualizar servicio
function guardarServicio() {
    const nombre = document.getElementById("servicio").value.trim();
    const descripcion = document.getElementById("descripcion_srv").value.trim();
    const urlimagen = document.getElementById("urlimagen_srv").value.trim();
    const precio = Number(document.getElementById("precio_srv").value); 

    if (!nombre || !descripcion || !urlimagen|| isNaN(precio)) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const nuevoServicio = {
        nombre,
        descripcion,
        imagen: urlimagen,
        precio
    };
    // Obtiene los servicios actuales del localStorage
    let servicios = JSON.parse(localStorage.getItem("servicios")) || [];
    
    // Si estamos editando un servicio que ya existe
    if (modoEdicion && indiceEdicion >= 0) {
        servicios[indiceEdicion] = nuevoServicio;
        alert(`Servicio "${nombre}" actualizado correctamente.`);
        modoEdicion = false;
        indiceEdicion = -1;
        document.getElementById("guardar_srv").textContent = "Guardar";
    } else {
        // Verifica si ya existe un servicio igual
        const existe = servicios.some(s => s.nombre.toLowerCase() === nombre.toLowerCase());
        if (existe) {
            alert(`Ya existe un servicio con el nombre "${nombre}".`);
            return;
        }
        servicios.push(nuevoServicio);
        alert(`Servicio "${nombre}" agregado correctamente.`);
    }

    localStorage.setItem("servicios", JSON.stringify(servicios));
    document.getElementById("admServicios").reset();

    listarServicios();
}


// Listar servicios
function listarServicios() {
    const tablaBody = document.querySelector("#tablaServicios tbody");
    if (!tablaBody) return; // Si no encuentra la tabla, sale de la función

    if (!tablaBody) return; // Si no encuentra la tabla, sale de la función

    tablaBody.innerHTML = "";
    const servicios = JSON.parse(localStorage.getItem("servicios")) || [];

    servicios.forEach((servicio, i) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${servicio.nombre}</td>
            <td>${servicio.descripcion}</td>
            <td><img src="${servicio.imagen}" alt="${servicio.nombre}" width="50px"></td>
            <td style="display:flex; gap:5px";>
                <button class="btn btn-sm btn-danger" onclick="eliminarServicio(${i})">Eliminar</button>
                <button class="btn btn-sm btn-success" onclick="editarServicio(${i})">Editar</button>
            </td>
        `;
        tablaBody.appendChild(fila);
    });
    
}

// Eliminar servicios
function eliminarServicio(index) {
    let servicios = JSON.parse(localStorage.getItem("servicios")) || [];
    if (index >= 0 && index < servicios.length) {
        servicios.splice(index, 1);
        localStorage.setItem("servicios", JSON.stringify(servicios));
        listarServicios();
    }
}

// Editar servicios
function editarServicio(index) {
    let servicios = JSON.parse(localStorage.getItem("servicios")) || [];
    if (index >= 0 && index < servicios.length) {
        const servicio = servicios[index];
        // Carga los datos del salón
        document.getElementById("servicio").value = servicio.nombre;
        document.getElementById("descripcion_srv").value = servicio.descripcion;
        document.getElementById("urlimagen_srv").value = servicio.imagen;
        document.getElementById("precio_srv").value = servicio.precio;        

        // Activa modo edición
        modoEdicion = true;
        indiceEdicion = index;
        // Cambia el botón para que diga "Actualizar"
        document.getElementById("guardar_srv").textContent = "Actualizar";
    }
}