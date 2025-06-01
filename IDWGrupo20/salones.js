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
let salonesDefecto = [
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

    //Validamos que los campos no estén vacíos
    if (nombre === "" || capacidad === "" || direccion === "" || descripcion === "" || urlimagen === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    let nuevosalon = [
    {nombre: nombre, capacidad: capacidad, direccion: direccion, descripcion: descripcion, imagen: urlimagen }];
    
    const salones_local = localStorage.getItem("salones");
    const salones = JSON.parse(salones_local);
    if (salones) {
        //Si hay salones en el localStorage, les cargamos los salones por defecto
        nuevosalon = salones.concat(nuevosalon);
    }

    localStorage.setItem("salones", JSON.stringify(nuevosalon));
    alert(`Datos del salon ${nombre} almacenados correctamente`);

    //Limpiamos los campos del formulario
    document.getElementById("nombre").value = "";
    document.getElementById("capacidad").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("urlimagen").value = "";

    //Llamamos a la función para listar los salones
    listarSalones();
});

//El usuario hizo click en el botón "Listar"
document.getElementById("listar").addEventListener("click", function() {
    //Si el usuario solo quiere ver los salones, mostramos los que hay por defecto (si no cargo ningúno).
    let nuevosalon = [];

    const salones_local = localStorage.getItem("salones");
    const salones = JSON.parse(salones_local);
    if (salones) {
        //Si hay salones en el localStorage, les cargamos los salones por defecto
        nuevosalon = salones.concat(salonesDefecto);
    } else {
        //Si no hay salones en el localStorage, los cargamos con los salones por defecto
        nuevosalon = salonesDefecto;
    }

    //Eliminamos los salones que tienen el mismo nombre
    let salonesSinRepetidos = nuevosalon.filter((obj, indice, self) =>
    indice === self.findIndex((el) => el.nombre === obj.nombre) );

    //Guardamos los salones en el localStorage
    localStorage.setItem("salones", JSON.stringify(salonesSinRepetidos));

    //Llamamos a la función para listar los salones
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
            <td>
                <img src="${salon.imagen}" alt="${salon.nombre}" width="50px"></td>
            <td>
                <button class="btn btn-sm btn-danger btn-eliminar" onclick="eliminarSalon(${i})">
                Eliminar </button>
                <button class="btn btn-sm btn-primary btn-success" onclick="editarSalon(${i})">
                Editar </button>
            </td>
        `;
        tablaBody.appendChild(fila);
    }
}

// Funcion para eliminar la fila al hacer clic en el botón Eliminar
function eliminarSalon(index) {
    const salones = JSON.parse(localStorage.getItem("salones")) || [];
    if (index >= 0 && index < salones.length) {
        salones.splice(index, 1); // Elimina el salón en la posición indicada
        localStorage.setItem("salones", JSON.stringify(salones)); // Actualiza el localStorage
        listarSalones(); // Vuelve a listar los salones actualizados
    }
}

// Función para editar un salón
function editarSalon(index) {
    const salones = JSON.parse(localStorage.getItem("salones")) || [];
    if (index >= 0 && index < salones.length) {
        const salon = salones[index];
        document.getElementById("nombre").value = salon.nombre;
        document.getElementById("capacidad").value = salon.capacidad;
        document.getElementById("direccion").value = salon.direccion;
        document.getElementById("descripcion").value = salon.descripcion;
        document.getElementById("urlimagen").value = salon.imagen;

        // Cambiamos el botón Guardar por un botón Actualizar
        const guardarBtn = document.getElementById("guardar");
        guardarBtn.textContent = "Actualizar";
        guardarBtn.onclick = function() {
            // Actualizamos los datos del salón
            salon.nombre = document.getElementById("nombre").value;
            salon.capacidad = document.getElementById("capacidad").value;
            salon.direccion = document.getElementById("direccion").value;
            salon.descripcion = document.getElementById("descripcion").value;
            salon.imagen = document.getElementById("urlimagen").value;

            // Guardamos los cambios en el localStorage
            salones[index] = salon; // Reemplazamos el salón editado
            localStorage.setItem("salones", JSON.stringify(salones));

            // Limpiamos los campos del formulario
            document.getElementById("nombre").value = "";
            document.getElementById("capacidad").value = "";
            document.getElementById("direccion").value = "";
            document.getElementById("descripcion").value = "";
            document.getElementById("urlimagen").value = "";

            // Volvemos a listar los salones
            listarSalones();

            // Restauramos el texto del botón a "Guardar"
            guardarBtn.textContent = "Guardar";
        };
    }
}