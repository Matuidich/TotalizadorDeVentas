function calcularPrecioNeto(cantidad, precio) {
  if (String(cantidad).trim() === "" || !Number.isFinite(Number(cantidad))) {
    throw new Error("La cantidad debe ser numerica");
  }
  if (cantidad < 0) {
    throw new Error("La cantidad no puede ser negativa");
  }
  if (Number(cantidad) === 0) {
    throw new Error("La cantidad debe ser mayor a cero");
  }
  if (String(precio).trim() === "" || !Number.isFinite(Number(precio))) {
    throw new Error("El precio debe ser numerico");
  }
  if (precio < 0) {
    throw new Error("El precio no puede ser negativo");
  }
  if (Number(precio) === 0) {
    throw new Error("El precio debe ser mayor a cero");
  }
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
    AL: 4,
    CA: 8.25,
  };
  if (!Object.prototype.hasOwnProperty.call(tasas, estado)) {
    throw new Error("Codigo de estado invalido");
  }
  return tasas[estado];
}

export function calcularImpuesto(precioNeto, estado) {
  return calcularPrecioConDescuento(precioNeto) * obtenerTasaImpuesto(estado) / 100;
}

export function calcularPrecioTotal(precioNeto, estado) {
  return calcularPrecioConDescuento(precioNeto) + calcularImpuesto(precioNeto, estado);
}

export function obtenerAjusteDescuentoCategoria(categoria) {
  if (categoria === "Alimentos") return 2;
  if (categoria === "Electrónicos") return 1;
  return 0;
}

export function obtenerAjusteImpuestoCategoria(categoria) {
  return categoria === "Electrónicos" ? 4 : 0;
}

export default calcularPrecioNeto;
