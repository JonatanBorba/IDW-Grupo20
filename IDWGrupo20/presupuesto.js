let servicios = [];
let salones = [];

const serviciosDefecto = [
  { nombre: "Catering Profesional", descripcion: "Catering completo para tu evento.", imagen: "img/servicio-catering.jpg", precio: 3800 },
  { nombre: "Barra de tragos", descripcion: "Tragos personalizados durante el evento.", imagen: "img/servicios-barrat.jpg", precio: 2600 },
  { nombre: "Decoración", descripcion: "Decoración temática a tu gusto.", imagen: "img/servicio-decoracion.jpg", precio: 450000 },
  { nombre: "Disc Jockey", descripcion: "DJ profesional con animación.", imagen: "img/servicio-disckjock.jpg", precio: 200000 },
  { nombre: "Iluminación", descripcion: "Luces LED y proyector.", imagen: "img/servicio-iluminacion.jpg", precio: 150000 },
  { nombre: "Centros de Mesa", descripcion: "Centros personalizados.", imagen: "img/servicio-centrom.jpg", precio: 80000 }
];

const salonesDefecto = [
  { nombre: "El Bosque", capacidad: 50, direccion: "San Juan 425", descripcion: "Salón amplio y luminoso", imagen: "img/salon1.jpg", precio: 350000 },
  { nombre: "En Sueños", capacidad: 35, direccion: "Av. Eva Perón 2995", descripcion: "Con juegos y espacios blandos", imagen: "img/salon2.jpg", precio: 250000 },
  { nombre: "Bambino Park", capacidad: 80, direccion: "San Lorenzo 677", descripcion: "Ideal para eventos infantiles", imagen: "img/salon3.jpg", precio: 480000 },
  { nombre: "Trampolín Park", capacidad: 70, direccion: "San Lorenzo 621", descripcion: "Con camas elásticas", imagen: "img/salon4.jpg", precio: 400000 },
  { nombre: "EME Multiespacio", capacidad: 100, direccion: "Salto Uruguayo 1600", descripcion: "Salón para fiestas", imagen: "img/salon5.jpg", precio: 600000 },
  { nombre: "El Quincho", capacidad: 20, direccion: "Av. Eva Perón 2995", descripcion: "Con piscina y parrilla", imagen: "img/salon6.jpg", precio: 150000 }
];

function cargarDatos() {
  servicios = JSON.parse(localStorage.getItem("servicios")) || serviciosDefecto;
  salones = JSON.parse(localStorage.getItem("salones")) || salonesDefecto;
  localStorage.setItem("servicios", JSON.stringify(servicios));
  localStorage.setItem("salones", JSON.stringify(salones));
}

function renderSalones(cantidad) {
  const contenedor = document.getElementById("contenedorSalones");
  contenedor.innerHTML = "";

  salones.forEach((salon, i) => {
    const esInadecuado = salon.capacidad < cantidad;
    const precio = parseFloat(salon.precio);

    const card = document.createElement("div");
    card.className = "col-md-4";

    card.innerHTML = `
      <div class="card card-servicio h-100 ${esInadecuado ? 'opacity-50' : ''}">
        <img src="${salon.imagen}" class="card-img-top" alt="${salon.nombre}">
        <div class="card-body">
          <h5 class="card-title">${salon.nombre}</h5>
          <p class="card-text">${salon.descripcion}</p>
          <p class="card-text">Capacidad: ${salon.capacidad}</p>
          <p class="card-text fw-bold">$${precio.toLocaleString()}</p>
          <div class="form-check">
            <input class="form-check-input checkbox-salon" type="checkbox" id="salon${i}" data-precio="${precio}" data-nombre="${salon.nombre}" ${esInadecuado ? 'disabled' : ''}>
            <label class="form-check-label" for="salon${i}">
              Incluir en presupuesto
            </label>
          </div>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });

  const salonCheckboxes = document.querySelectorAll(".checkbox-salon");
  salonCheckboxes.forEach((cb) => {
    cb.addEventListener("change", () => {
      if (cb.checked) {
        salonCheckboxes.forEach((other) => {
          if (other !== cb) other.checked = false;
        });
      }
    });
  });
}

function renderServicios(cantidad) {
  const contenedor = document.getElementById("contenedorServicios");
  contenedor.innerHTML = "";

  const esPorPersona = ["Catering Profesional", "Barra de tragos"];

  servicios.forEach((servicio, i) => {
    let precio = parseFloat(servicio.precio);
    let textoPrecio = `$${precio.toLocaleString()}`;
    if (!isNaN(cantidad) && esPorPersona.includes(servicio.nombre)) {
      precio *= cantidad;
      textoPrecio = `$${precio.toLocaleString()} para ${cantidad} personas`;
    }

    const card = document.createElement("div");
    card.className = "col-md-4";

    card.innerHTML = `
      <div class="card card-servicio h-100">
        <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.nombre}">
        <div class="card-body">
          <h5 class="card-title">${servicio.nombre}</h5>
          <p class="card-text">${servicio.descripcion}</p>
          <p class="card-text fw-bold">${textoPrecio}</p>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="servicio${i}" data-precio="${precio}" data-nombre="${servicio.nombre}">
            <label class="form-check-label" for="servicio${i}">
              Incluir en presupuesto
            </label>
          </div>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarDatos();

  document.getElementById("cantidadPersonas").addEventListener("input", (e) => {
    const cantidad = parseInt(e.target.value);
    if (!isNaN(cantidad)) {
      renderSalones(cantidad);
      renderServicios(cantidad);
    }
  });

  document.getElementById("calcularPresupuesto").addEventListener("click", () => {
    const salonSeleccionado = document.querySelector(".checkbox-salon:checked");
    if (!salonSeleccionado) {
      alert("Por favor, seleccioná un salón antes de calcular el presupuesto.");
      return;
    }

    const checkboxes = document.querySelectorAll(".form-check-input:checked");
    let total = 0;
    let nombreSalon = "";
    let serviciosSeleccionados = [];

    checkboxes.forEach((cb) => {
      const precio = parseFloat(cb.dataset.precio);
      total += precio;

      if (cb.classList.contains("checkbox-salon")) {
        nombreSalon = cb.dataset.nombre;
      } else {
        serviciosSeleccionados.push(cb.dataset.nombre);
      }
    });

    let resumen = "<ul>";
    resumen += `<li><strong>Salón:</strong> ${nombreSalon}</li>`;
    if (serviciosSeleccionados.length > 0) {
      resumen += `<li><strong>Servicios:</strong> ${serviciosSeleccionados.join(", ")}</li>`;
    }
    resumen += `</ul><hr><strong>Total: $${total.toLocaleString()}</strong>`;

    document.getElementById("resumenPresupuesto").innerHTML = resumen;

    const modal = new bootstrap.Modal(document.getElementById("modalPresupuesto"));
    modal.show();
  });
});