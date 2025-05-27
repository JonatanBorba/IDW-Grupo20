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

/* Defino un array que va a tener salones por defecto */
let salones = [
    {nombre: "El Bosque", capacidad: 50, direccion: "San Juan 425", descripcion: "Salon amplio y luminoso", imagen: "https://drive.google.com/file/d/1H8ePbJVRHMR-u7ziEuqNSNsESM1n-3kU/view?usp=sharing"},
    {nombre: "En Sueños", capacidad: 35, direccion: "Av. Eva Perón 2995", descripcion: "Salon con juegos y espacios blandos", imagen: "https://example.com/salonB.jpg"},
    {nombre: "Bambino Park", capacidad: 80, direccion: "San Lorenzo (O) 677", descripcion: "Salon ideal para eventos de chicos", imagen: "https://example.com/salonC.jpg"},
    {nombre: "Trampolin Park", capacidad: 70, direccion: "San Lorenzo (O) 621", descripcion: "Salon con camas elasticas", imagen: "https://example.com/salonC.jpg"},
    {nombre: "EME Multiespacio", capacidad: 100, direccion: "Salto Uruguayo 1600", descripcion: "Salon para fiestas", imagen: "https://example.com/salonC.jpg"},
    {nombre: "El Quincho", capacidad: 20, direccion: "Av. Eva Perón 2995", descripcion: "Salon con piscina y parrila", imagen: "https://example.com/salonC.jpg"},
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
    salones.forEach((salon) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${salon.nombre}</td>
            <td>${salon.direccion}</td>
            <td>${salon.descripcion}</td>
            <td>${salon.urlimagen}</td>
            `;
        tablaBody.appendChild(fila);
    });
}