document.addEventListener("DOMContentLoaded",() => {

    if(!sessionStorage.getItem("usuario")){
                alert("Usted debe iniciar sesión para acceder a esta página")
                window.location.href = "login.html"; 
                return    
            } 
    // const salir = document.getElementById("logout");
    // if(salir){
    //     salir.addEventListener("click", ()=>{
    //         sessionStorage.clear();
    //         window.location.href = "index.html";
    //     })
    // } 
    const salir = document.querySelector(".btn-danger");

    if(salir){
        salir.addEventListener("click", ()=>{
            sessionStorage.clear();
            window.location.href = "index.html";
        });
        }

/*   const form = document.getElementById("formularioDeAlta");
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const capacidad = document.getElementById("capacidad").value;
        const direccion = document.getElementById("direccion").value;
        const descripcion = document.getElementById("descripcion").value;
        const urlimagen = document.getElementById("urlimagen").value;

        alert(`Usted agregó el salon ${nombre}
            con capacidad para ${capacidad} personas, 
            descrición ${descripcion} 
            ubicado en ${direccion}
            con la Url de la imagen ${urlimagen}`);

        this.reset(); 
    });
*/
});

/* Defino un array que va a tener salones por defecto */
let salones = [
    {nombre: "El Bosque", capacidad: 50, direccion: "San Juan 425", descripcion: "Salon amplio y luminoso", imagen: "https://example.com/salonA.jpg"},
    {nombre: "En Sueños", capacidad: 35, direccion: "Av. Eva Perón 2995", descripcion: "Salon con juegos y espacios blandos", imagen: "https://example.com/salonB.jpg"},
    {nombre: "Bambino Park", capacidad: 80, direccion: "San Lorenzo (O) 677", descripcion: "Salon ideal para eventos de chicos", imagen: "https://example.com/salonC.jpg"},
    {nombre: "Trampolin Park", capacidad: 70, direccion: "San Lorenzo (O) 621", descripcion: "Salon con camas elasticas", imagen: "https://example.com/salonC.jpg"},
    {nombre: "EME Multiespacio", capacidad: 100, direccion: "Salto Uruguayo 1600", descripcion: "Salon para fiestas", imagen: "https://example.com/salonC.jpg"},
    {nombre: "El Quincho", capacidad: 20, direccion: "Av. Eva Perón 2995", descripcion: "Salon con piscina y parrila", imagen: "https://example.com/salonC.jpg"},
];

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

    localStorage.setItem("nuevosalon", JSON.stringify(nuevosalon));
    alert(`Datos del salon ${nombre} almacenados correctamente`);
});