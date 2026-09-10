import calcularPrecioNeto, {
  obtenerPorcentajeDescuento,
  calcularDescuento,
  calcularPrecioConDescuento,
  obtenerTasaImpuesto,
  calcularImpuesto,
  calcularPrecioTotal,
  obtenerAjusteDescuentoCategoria,
  obtenerAjusteImpuestoCategoria,
  calcularCostoEnvioPorUnidad,
  calcularCostoEnvioTotal,
  calcularCostoEnvioConDescuento,
  calcularBeneficioEspecial,
  obtenerPorcentajeDescuentoEnvio,
} from "./totalizador.js";

const form = document.querySelector("#totalizador-form");
const cantidad = document.querySelector("#cantidad");
const precio = document.querySelector("#precio");
const estado = document.querySelector("#estado");
const resultado = document.querySelector("#resultado-div");
const error = document.querySelector("#error-div");
const categoria = document.querySelector("#categoria");
const peso = document.querySelector("#peso-volumetrico");
const tipoCliente = document.querySelector("#tipo-cliente");

form.addEventListener("reset", () => {
  setTimeout(() => { peso.value = "0"; }, 0);
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
    const basePorcentaje = obtenerPorcentajeDescuento(neto);
    const ajusteDescuento = obtenerAjusteDescuentoCategoria(categoria.value);
    const descuentoOriginal = neto * basePorcentaje / 100;
    const descuentoCategoria = neto * ajusteDescuento / 100;
    const descuentosTotales = descuentoOriginal + descuentoCategoria;
    const precioDespues = neto - descuentosTotales;
    const ajusteImpuesto = obtenerAjusteImpuestoCategoria(categoria.value);
    const tasaTotal = tasa + ajusteImpuesto;
    const impuestoTotal = precioDespues * tasaTotal / 100;
    const envioUnidad = calcularCostoEnvioPorUnidad(peso.value);
    const envioBruto = calcularCostoEnvioTotal(cantidad.value, peso.value);
    const envioFinal = calcularCostoEnvioConDescuento(envioBruto, tipoCliente.value);
    const beneficio = calcularBeneficioEspecial(neto, categoria.value, tipoCliente.value);
    const totalFinal = precioDespues + impuestoTotal + envioFinal - beneficio;
    const lineas = [
      "Compra confirmada",
      `Precio neto: ${neto.toFixed(2)}`,
      `Descuento original (${basePorcentaje}%): ${descuentoOriginal.toFixed(2)}`,
      `Descuento (${basePorcentaje}%): ${descuentoOriginal.toFixed(2)}`,
      `Ajuste descuento categoría ${categoria.value} (${ajusteDescuento}%): ${descuentoCategoria.toFixed(2)}`,
      `Descuentos totales: ${descuentosTotales.toFixed(2)}`,
      `Precio despues del descuento: ${precioDespues.toFixed(2)}`,
      `Estado: ${estado.value} (${tasa}%)`,
      `Categoría: ${categoria.value} (descuento adicional ${ajusteDescuento}%, impuesto adicional ${ajusteImpuesto}%)`,
      `Impuesto ${estado.value} (${tasa}%): ${(precioDespues * tasa / 100).toFixed(2)}`,
      `Impuesto total (${tasaTotal}%): ${impuestoTotal.toFixed(2)}`,
      `Peso volumétrico: ${Number(peso.value)}`,
      `Envío por unidad: ${envioUnidad.toFixed(2)}`,
      `Envío bruto: ${envioBruto.toFixed(2)}`,
      `Tipo de cliente: ${tipoCliente.value} (descuento envío ${obtenerPorcentajeDescuentoEnvio(tipoCliente.value)}%)`,
      `Envío final: ${envioFinal.toFixed(2)}`,
      `Beneficio especial: ${beneficio.toFixed(2)}`,
      `Precio total: ${totalFinal.toFixed(2)}`,
      `Total final: ${totalFinal.toFixed(2)}`,
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
