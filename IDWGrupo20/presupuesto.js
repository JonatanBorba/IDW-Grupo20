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
    
    let total = 0;
    let importeServicios = 0;

    cbSeleccionados.forEach(checkbox => {
            const servicio = servicios.find(s => s.nombre === checkbox.value);
            if (servicio) importeServicios += parseInt(servicio.importe);
        });

    total = importeSalon + importeServicios;
    muestroResultados(salonSeleccionado, cbSeleccionados, total);
};

function muestroResultados(salon, servicios, importePresupuesto){
// Mostrar el presupuesto
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const fecha = document.getElementById('fecha').value;
    console.log(servicios);    
    alert(salon);

    const resultado = document.getElementById('resultadoPresupuesto');
    resultado.innerHTML = `
      <div class="mt-4">
        <h4>Resumen del Presupuesto</h4>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Fecha de reserva:</strong> ${fecha}</p>
        <p><strong>Salón elegido:</strong> ${salon}</p>
        <h5>Servicios seleccionados:</h5>
        <ul>
          ${servicios.map(s => `<li>${s.nombre}</li>`).join('')}
        </ul>
        <p><strong>Total estimado:</strong> $${importePresupuesto.toLocaleString()}</p>
      </div>
    `;
};

cargarSalonesSelect();
cargarServicios();

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("calcularPresupuesto").addEventListener("click", calcularPresupuesto);
});