//Tomamos los salones del LocalStorage
let salones_lcl = JSON.parse(localStorage.getItem("salones")) || [];

// Obtengo los servicios actuales del localStorage
let servicios = JSON.parse(localStorage.getItem("servicios")) || [];

function cargarSalonesSelect() {
    const salonesSelect = document.getElementById("salonPresupuesto");
    salonesSelect.innerHTML = "";
    //Cargamos los salones en OPtion del Select de la pagina presupuesto    
    for (let i = 0; i < salones_lcl.length; i++) {
        const salon = salones_lcl[i];
        const salonSel = document.createElement("option");
        salonSel.innerHTML = `
                <option class="form-control" value="${salon.nombre}">${salon.nombre}</option>
        `;
        salonesSelect.appendChild(salonSel);
    };
};

function cargarServicios(){
    const divServicios = document.getElementById("serviciosPresupuesto");
    divServicios.innerHTML="";
   //Cargamos los servicios en varios checkbox dentro de presupuesto    
    servicios.forEach((servicio, i) => {
        const divServicio = document.createElement("div");
        divServicio.className="form-check";
        divServicio.innerHTML = `
                <label class="form-check-label" for="${servicio.nombre}">${servicio.nombre}</label>
                <input type="checkbox" class="form-check-input" id="${servicio.nombre}" value="${servicio.nombre}">
       `;
        divServicios.appendChild(divServicio);
    });
};


function calcularPresupuesto() {
    const salonSeleccionado = document.getElementById("salonPresupuesto").value;
    let importeSalon = parseInt(salones_lcl.find(salon => salon.nombre === salonSeleccionado)["importe"]);

    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const cbSeleccionados = Array.from(checkboxes);
    
    let total;
    let importeServicios;

    for (let i = 0; i < cbSeleccionados.length; i++) {
        for (let x = 0; x < servicios.length; x++) {
            if (servicios[x].nombre === cbSeleccionados[i].value) {
                importeServicios += parseInt(servicios[x].importe);
                alert(parseInt(servicios[x].importe));
                alert(parseInt(importeServicios));
            }
        }
    }        
    total = importeSalon + importeServicios;
    alert("importe salon = " + importeSalon);
    alert("Total Servicio = " +  importeServicios);
//    alert(total);

    document.getElementById("resultadoPresupuesto").innerText = `Total estimado: $${importeSalon}`;
}


cargarSalonesSelect();
cargarServicios();