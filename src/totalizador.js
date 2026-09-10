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

export function calcularCostoEnvioPorUnidad(peso) {
  if (String(peso).trim() === "" || !Number.isFinite(Number(peso))) {
    throw new Error("El peso volumetrico debe ser numerico");
  }
  const valor = Number(peso);
  if (valor < 0) throw new Error("El peso volumetrico no puede ser negativo");
  if (valor <= 10) return 0;
  if (valor <= 20) return 3.5;
  if (valor <= 40) return 5;
  if (valor <= 80) return 6;
  if (valor <= 100) return 6.5;
  if (valor <= 200) return 8;
  return 9;
}

export function calcularCostoEnvioTotal(cantidad, peso) {
  return Number(cantidad) * calcularCostoEnvioPorUnidad(peso);
}

export function obtenerPorcentajeDescuentoEnvio(tipoCliente) {
  return { Normal: 0, Recurrente: 0.5, "Antiguo Recurrente": 1, Especial: 1.5 }[tipoCliente] ?? 0;
}

export function calcularCostoEnvioConDescuento(costoEnvio, tipoCliente) {
  return costoEnvio * (1 - obtenerPorcentajeDescuentoEnvio(tipoCliente) / 100);
}

export function calcularBeneficioEspecial(precioNeto, categoria, tipoCliente) {
  if (tipoCliente === "Recurrente" && categoria === "Alimentos" && precioNeto > 3000) return 100;
  if (tipoCliente === "Especial" && categoria === "Electrónicos" && precioNeto > 7000) return 200;
  return 0;
}

export default calcularPrecioNeto;
