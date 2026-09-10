import calcularPrecioNeto, {
  obtenerPorcentajeDescuento,
  calcularDescuento,
  calcularPrecioConDescuento,
  obtenerTasaImpuesto,
  calcularImpuesto,
  calcularPrecioTotal,
} from "./totalizador.js";

const form = document.querySelector("#totalizador-form");
const cantidad = document.querySelector("#cantidad");
const precio = document.querySelector("#precio");
const estado = document.querySelector("#estado");
const resultado = document.querySelector("#resultado-div");
const error = document.querySelector("#error-div");

form.addEventListener("reset", () => {
  resultado.replaceChildren();
  error.textContent = "";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  resultado.replaceChildren();
  error.textContent = "";

  try {
    const neto = calcularPrecioNeto(cantidad.value, precio.value);
    const tasa = obtenerTasaImpuesto(estado.value);
    const lineas = [
      "Compra confirmada",
      `Precio neto: ${neto.toFixed(2)}`,
      `Descuento (${obtenerPorcentajeDescuento(neto)}%): ${calcularDescuento(neto).toFixed(2)}`,
      `Precio despues del descuento: ${calcularPrecioConDescuento(neto).toFixed(2)}`,
      `Impuesto ${estado.value} (${tasa}%): ${calcularImpuesto(neto, estado.value).toFixed(2)}`,
      `Precio total: ${calcularPrecioTotal(neto, estado.value).toFixed(2)}`,
    ];
    for (const linea of lineas) {
      const parrafo = document.createElement("p");
      parrafo.textContent = linea;
      resultado.appendChild(parrafo);
    }
  } catch (validationError) {
    error.textContent = validationError.message;
  }
});
