function calcularPrecioNeto(cantidad, precio) {
  return cantidad * precio;
}

export function obtenerPorcentajeDescuento(precioNeto) {
  if (precioNeto >= 3000) {
    return 5;
  }
  if (precioNeto >= 1000) {
    return 3;
  }
  return 0;
}

export default calcularPrecioNeto;
