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
    {nombre: "Catering Profesional", descripcion: "Nos encargamos de realizar todo el catering de tu evento de forma profesional, para que vos disfrutes.", imagen: "https://drive.google.com/file/d/1H8BDPDrA-R9CwmGveYdpUuz1Sb4YDEo1/view?usp=drive_link"},
    {nombre: "Barra de tragos", descripcion: "Realizamos tragos durante el evento con nuestra barra de tragos. Hacé tu evento inolvidable.", imagen: "https://drive.google.com/file/d/1HyD4IF6PlAwG3KXQaRylVcq86QjYOco1/view?usp=drive_link"},
    {nombre: "Decoración", descripcion: "¿Estás sin tiempo? Nos encargamos de decorar el salón a tu gusto haciendo todavía más especial ese evento.", imagen: "https://drive.google.com/file/d/1HhJ9DMpXPMyle8WXNrkwlgThE5AbTWE5/view?usp=drive_link"},
    {nombre: "Disc Jockey", descripcion: "Reproducción de música durante todo el evento. Animación.", imagen: "https://drive.google.com/file/d/1HXVMyqGujycQ_Fgrj1z0wsli-AesgusI/view?usp=drive_link"},
    {nombre: "Iluminación", descripcion: "Puesta escenográfica. Proyector de video con pantalla retráctil.", imagen: "https://drive.google.com/file/d/1HTWJRPlPovQxcrBKOiYQiJo7BVkI49iP/view?usp=drive_link"},
    {nombre: "Centros de Mesa", descripcion: "Centros de mesa personalizados acordes a la temática del cumpleaños, celebración o evento.", imagen: "https://drive.google.com/file/d/1HMZbl4DoHjeMocBJl2Mejtzyp_9sYf5S/view?usp=drive_link"},
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
            <td><input type="radio" name="rdEliminar${i}"></td>
            <td>${servicio.nombre}</td>
            <td>${servicio.descripcion}</td>
            <td>${servicio.imagen}</td>
        `;
        tablaBody.appendChild(fila);
    }

    // Agrego al final de la tabla un botón para eliminar Servicios
    let divContenedor = document.getElementById("divServicios");
    let boton = document.createElement("button");
    boton.textContent = "Eliminar Sservicio";
    boton.className = "btn btn-secondary";
    boton.id = "btnEliminarServicio";
    
    // Tengo que agregar un evento al botón para eliminar uno o varios Servicios seleccionados
    boton.onclick = function() {
        alert("¡Elimino uno o varios Servicios!");
    };

    const existeboton = document.getElementById('btnEliminarServicio');
    if (existeboton) {
    } else {
        divContenedor.appendChild(boton);
    }
}