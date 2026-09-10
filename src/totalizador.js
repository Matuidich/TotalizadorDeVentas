function calcularPrecioNeto(cantidad, precio) {
  return cantidad * precio;
}

export function obtenerPorcentajeDescuento(precioNeto) {
  if (precioNeto >= 30000) {
    return 15;
  }
  if (precioNeto >= 10000) {
    return 10;
  }
  if (precioNeto >= 7000) {
    return 7;
  }
  if (precioNeto >= 3000) {
    return 5;
  }
  if (precioNeto >= 1000) {
    return 3;
  }
  return 0;
}

export function calcularDescuento(precioNeto) {
  return precioNeto * obtenerPorcentajeDescuento(precioNeto) / 100;
}

export function calcularPrecioConDescuento(precioNeto) {
  return precioNeto - calcularDescuento(precioNeto);
}

export function obtenerTasaImpuesto(estado) {
  const tasas = {
    UT: 6.65,
    NV: 8,
    TX: 6.25,
  };
  return tasas[estado];
}

export default calcularPrecioNeto;
