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

        alert(`Usted agregó el salon ${nombre} descrición ${descripcion} ubicado en ${direccion}`);

        this.reset(); 
    });
});