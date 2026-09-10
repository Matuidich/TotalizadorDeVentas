function calcularPrecioNeto(cantidad, precio) {
  return cantidad * precio;
}

export function obtenerPorcentajeDescuento(precioNeto) {
  if (precioNeto >= 1000) {
    return 3;
  }
  return 0;
}

export default calcularPrecioNeto;
