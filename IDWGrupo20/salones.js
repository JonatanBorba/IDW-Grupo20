//Seccion del Loguin
document.addEventListener("DOMContentLoaded",() => {

    if(!sessionStorage.getItem("usuario")){
                alert("Usted debe iniciar sesión para acceder a esta página")
                window.location.href = "login.html"; 
                return    
            } 

    const salir = document.getElementById("salir"); 

    if(salir){
        salir.addEventListener("click", ()=>{
            sessionStorage.clear();
            localStorage.clear();
            window.location.href = "index.html";
        });
        }

});

/* Defino un array que va a tener salones por defecto */
let salones = [
    {nombre: "El Bosque", capacidad: 50, direccion: "San Juan 425", descripcion: "Salon amplio y luminoso", imagen: "img/salon1.jpg"},
    {nombre: "En Sueños", capacidad: 35, direccion: "Av. Eva Perón 2995", descripcion: "Salon con juegos y espacios blandos", imagen: "img/salon2.jpg"},
    {nombre: "Bambino Park", capacidad: 80, direccion: "San Lorenzo (O) 677", descripcion: "Salon ideal para eventos de chicos", imagen: "img/salon3.jpg"},
    {nombre: "Trampolin Park", capacidad: 70, direccion: "San Lorenzo (O) 621", descripcion: "Salon con camas elasticas", imagen: "img/salon4.jpg"},
    {nombre: "EME Multiespacio", capacidad: 100, direccion: "Salto Uruguayo 1600", descripcion: "Salon para fiestas", imagen: "img/salon5.jpg"},
    {nombre: "El Quincho", capacidad: 20, direccion: "Av. Eva Perón 2995", descripcion: "Salon con piscina y parrila", imagen: "img/salon6.jpg"},
];

//**************************************************************************************//
//                              ADMINISTRACION DE SALONES                               //
//**************************************************************************************//
//El usuario hizo click en el botón "Guardar"
document.getElementById("guardar").addEventListener("click", function() {
    const nombre = document.getElementById("nombre").value;
    const capacidad = document.getElementById("capacidad").value;
    const direccion = document.getElementById("direccion").value;
    const descripcion = document.getElementById("descripcion").value;
    const urlimagen = document.getElementById("urlimagen").value;
    
    const nuevosalon = [
    {nombre: nombre, capacidad: capacidad, direccion: direccion, descripcion: descripcion, imagen: urlimagen }];
    
    /*Agrego a los salones por defecto, el salon agregado por el usuario */
    for (let i = 0; i < salones.length; i++) {
            nuevosalon.push({ nombre: salones[i].nombre, 
                            capacidad: salones[i].capacidad,
                            direccion: salones[i].direccion,
                            descripcion: salones[i].descripcion,
                            imagen: salones[i].imagen });
        }
    localStorage.setItem("salones", JSON.stringify(nuevosalon));
    alert(`Datos del salon ${nombre} almacenados correctamente`);
    listarSalones();
});

//El usuario hizo click en el botón "Listar"
document.getElementById("listar").addEventListener("click", function() {
    //Si el usuario solo quiere ver los salones, mostramos los que hay por defecto (si no cargo ningúno).
    listarSalones();
});

/*Función para Listar los salones */
function listarSalones(){
    const tablaBody = document.querySelector("#tablaSalones tbody");
    
    tablaBody.innerHTML = "";
    const salones = JSON.parse(localStorage.getItem("salones")) || [];
    for (let i = 0; i < salones.length; i++) {
        const salon = salones[i];
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${salon.nombre}</td>
            <td>${salon.direccion}</td>
            <td>${salon.descripcion}</td>
            <td><img src="${salon.imagen}" alt="${salon.nombre}" width="50px"></td>
            <td><button id="btnEliminar${i}" type="button" class="btn btn-sm btn-danger btn-eliminar">
                <i class="fas fa-trash-alt"></i> Eliminar
                </button>
            </td>
        `;
        tablaBody.appendChild(fila);
    }
}

// Event delegation para eliminar la fila al hacer clic en el botón Eliminar
document.getElementById("tablaSalonesBody").addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-eliminar")) {
        event.target.closest("tr").remove(); // Elimino la fila
    }
});