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


    const form = document.getElementById("formularioDeAlta");
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const direccion = document.getElementById("direccion").value;
        const descripcion = document.getElementById("descripcion").value;
           
        const salon = {nombre, direccion, descripcion};
        const salones = JSON.parse(localStorage.getItem("salones")) || [];
        salones.push(salon);
        localStorage.setItem("salones", JSON.stringify(salones));

        alert(`Usted agregó el salon: ${nombre} descripción: ${descripcion} ubicado en: ${direccion}`);

        this.reset();
        mostrarSalones(); 
    });
     mostrarSalones(); 
}); 

function mostrarSalones(){
    const tablaBody = document.querySelector("#tablaSalones tbody");
    
    tablaBody.innerHTML = "";
    const salones = JSON.parse(localStorage.getItem("salones")) || [];
    salones.forEach((salon) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${salon.nombre}</td>
            <td>${salon.direccion}</td>
            <td>${salon.descripcion}</td>
        `;
        tablaBody.appendChild(fila);
    });

}