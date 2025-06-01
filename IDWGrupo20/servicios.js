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
            sessionStorage.clear();
            window.location.href = "index.html";
        });
        }
});

/* Defino un array que va a tener Servicios por defecto */
let servicios = [
    {nombre: "Catering Profesional", descripcion: "Nos encargamos de realizar todo el catering de tu evento de forma profesional, para que vos disfrutes.", imagen: "img/servicio-catering.jpg"},
    {nombre: "Barra de tragos", descripcion: "Realizamos tragos durante el evento con nuestra barra de tragos. Hacé tu evento inolvidable.", imagen: "img/servicios-barrat.jpg"},
    {nombre: "Decoración", descripcion: "¿Estás sin tiempo? Nos encargamos de decorar el salón a tu gusto haciendo todavía más especial ese evento.", imagen: "img/servicio-decoracion.jpg"},
    {nombre: "Disc Jockey", descripcion: "Reproducción de música durante todo el evento. Animación.", imagen: "img/servicio-disckjock.jpg"},
    {nombre: "Iluminación", descripcion: "Puesta escenográfica. Proyector de video con pantalla retráctil.", imagen: "img/servicio-iluminacion.jpg"},
    {nombre: "Centros de Mesa", descripcion: "Centros de mesa personalizados acordes a la temática del cumpleaños, celebración o evento.", imagen: "img/servicio-centrom.jpg"},
];


//**************************************************************************************//
//                              ADMINISTRACION DE SERVICIOS                             //
//**************************************************************************************//
//El usuario hizo click en el botón "Guardar"
document.getElementById("guardar_srv").addEventListener("click", function() {
    const nombre = document.getElementById("servicio").value;
    const descripcion = document.getElementById("descripcion_srv").value;
    const urlimagen = document.getElementById("urlimagen_srv").value;
    
    const nuevoServicio = [
    {nombre: nombre, descripcion: descripcion, imagen: urlimagen }];
    
    /*Agrego a los Servicios por defecto, al Servicio agregado por el usuario */
    for (let i = 0; i < servicios.length; i++) {
            nuevoServicio.push({ nombre: servicios[i].nombre, 
                            descripcion: servicios[i].descripcion,
                            imagen: servicios[i].imagen });
        }

    localStorage.setItem("servicios", JSON.stringify(nuevoServicio));
    alert(`Datos del Servicio ${nombre} almacenados correctamente`);
    listarServicios();
});

//El usuario hizo click en el botón "Listar"
document.getElementById("listar_srv").addEventListener("click", function() {
    //Si el usuario solo quiere ver los salones, mostramos los que hay por defecto (si no cargo ningúno).
    listarServicios();
});

/*Función para Listar los Servicios */
function listarServicios(){
    const tablaBody = document.querySelector("#tablaServicios tbody");
    
    tablaBody.innerHTML = "";
    const servicios = JSON.parse(localStorage.getItem("servicios")) || [];
    for (let i = 0; i < servicios.length; i++) {
        const servicio = servicios[i];
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${servicio.nombre}</td>
            <td>${servicio.descripcion}</td>
            <td><img src="${servicio.imagen}" alt="${servicio.nombre}" width="50px"></td>
            <td><button id="btnEliminar${i}" type="button" class="btn btn-sm btn-danger btn-eliminar">
                <i class="fas fa-trash-alt"></i> Eliminar
                </button>
            </td>


        `;
        tablaBody.appendChild(fila);
    }
}

// Event delegation para eliminar la fila al hacer clic en el botón Eliminar
document.getElementById("tablaServiciosBody").addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-eliminar")) {
        event.target.closest("tr").remove(); // Elimino la fila
    }
});