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
  obtenerPorcentajeDescuentoEnvio,
  calcularCostoEnvioConDescuento,
} from "./totalizador.js";

describe("Totalizador de venta", () => {
  it("deberia calcular el precio neto de la compra", () => {
    expect(calcularPrecioNeto(20, 3)).toEqual(60);
  });

  it("deberia aplicar cero por ciento de descuento a compras menores a 1000", () => {
    expect(obtenerPorcentajeDescuento(999.99)).toEqual(0);
  });

  it("deberia aplicar tres por ciento de descuento desde 1000", () => {
    expect(obtenerPorcentajeDescuento(1000)).toEqual(3);
    expect(obtenerPorcentajeDescuento(2999.99)).toEqual(3);
  });

  it("deberia aplicar cinco por ciento de descuento desde 3000", () => {
    expect(obtenerPorcentajeDescuento(3000)).toEqual(5);
    expect(obtenerPorcentajeDescuento(6999.99)).toEqual(5);
  });

  it("deberia aplicar siete por ciento de descuento desde 7000", () => {
    expect(obtenerPorcentajeDescuento(7000)).toEqual(7);
    expect(obtenerPorcentajeDescuento(9999.99)).toEqual(7);
  });

  it("deberia aplicar diez por ciento de descuento desde 10000", () => {
    expect(obtenerPorcentajeDescuento(10000)).toEqual(10);
    expect(obtenerPorcentajeDescuento(29999.99)).toEqual(10);
  });

  it("deberia aplicar quince por ciento de descuento desde 30000", () => {
    expect(obtenerPorcentajeDescuento(30000)).toEqual(15);
    expect(obtenerPorcentajeDescuento(60000)).toEqual(15);
  });

  it("deberia calcular el monto del descuento sobre el precio neto", () => {
    expect(calcularDescuento(60)).toEqual(0);
    expect(calcularDescuento(1000)).toEqual(30);
  });

  it("deberia restar el descuento al precio neto", () => {
    expect(calcularPrecioConDescuento(60)).toEqual(60);
    expect(calcularPrecioConDescuento(1000)).toEqual(970);
  });

  it("deberia obtener la tasa de impuesto de UT de 6.65 por ciento", () => {
    expect(obtenerTasaImpuesto("UT")).toEqual(6.65);
  });

  it("deberia obtener la tasa de impuesto de NV de 8 por ciento", () => {
    expect(obtenerTasaImpuesto("NV")).toEqual(8);
  });

  it("deberia obtener la tasa de impuesto de TX de 6.25 por ciento", () => {
    expect(obtenerTasaImpuesto("TX")).toEqual(6.25);
  });

  it("deberia obtener la tasa de impuesto de AL de 4 por ciento", () => {
    expect(obtenerTasaImpuesto("AL")).toEqual(4);
  });

  it("deberia obtener la tasa de impuesto de CA de 8.25 por ciento", () => {
    expect(obtenerTasaImpuesto("CA")).toEqual(8.25);
  });

  it("deberia calcular el impuesto sobre el precio despues del descuento", () => {
    expect(calcularImpuesto(60, "UT")).toBeCloseTo(3.99);
    expect(calcularImpuesto(60, "NV")).toBeCloseTo(4.8);
    expect(calcularImpuesto(60, "TX")).toBeCloseTo(3.75);
    expect(calcularImpuesto(60, "AL")).toBeCloseTo(2.4);
    expect(calcularImpuesto(60, "CA")).toBeCloseTo(4.95);
    expect(calcularImpuesto(1000, "TX")).toBeCloseTo(60.625, 5);
  });

  it("deberia sumar el impuesto al precio despues del descuento", () => {
    expect(calcularPrecioTotal(calcularPrecioNeto(20, 3), "TX")).toEqual(63.75);
    expect(calcularPrecioTotal(calcularPrecioNeto(20, 50), "TX")).toBeCloseTo(1030.625, 5);
  });

  it("deberia informar cuando el codigo de estado es invalido", () => {
    expect(() => obtenerTasaImpuesto("ZZ")).toThrow("Codigo de estado invalido");
    expect(() => obtenerTasaImpuesto("toString")).toThrow("Codigo de estado invalido");
  });

  it("deberia informar cuando la cantidad es negativa", () => {
    expect(() => calcularPrecioNeto(-1, 3)).toThrow("La cantidad no puede ser negativa");
  });

  it("deberia informar cuando la cantidad es cero", () => {
    expect(() => calcularPrecioNeto(0, 3)).toThrow("La cantidad debe ser mayor a cero");
  });

  it("deberia informar cuando el precio es negativo", () => {
    expect(() => calcularPrecioNeto(20, -3)).toThrow("El precio no puede ser negativo");
  });

  it("deberia informar cuando el precio es cero", () => {
    expect(() => calcularPrecioNeto(20, 0)).toThrow("El precio debe ser mayor a cero");
  });

  it("deberia informar cuando la cantidad no es numerica", () => {
    for (const cantidad of ["abc", "20abc", "", " ", NaN, Infinity]) {
      expect(() => calcularPrecioNeto(cantidad, 3)).toThrow("La cantidad debe ser numerica");
    }
  });

  it("deberia informar cuando el precio no es numerico", () => {
    for (const precio of ["abc", "3abc", "", " ", NaN, Infinity]) {
      expect(() => calcularPrecioNeto(20, precio)).toThrow("El precio debe ser numerico");
    }
  });

  it("deberia aplicar dos por ciento adicional de descuento a Alimentos", () => {
    expect(obtenerAjusteDescuentoCategoria("Alimentos")).toEqual(2);
    expect(obtenerAjusteDescuentoCategoria("Varios")).toEqual(0);
  });

  it("deberia aplicar a Electronicos uno por ciento de descuento y cuatro de impuesto", () => {
    expect(obtenerAjusteDescuentoCategoria("Electrónicos")).toEqual(1);
    expect(obtenerAjusteImpuestoCategoria("Electrónicos")).toEqual(4);
    expect(obtenerAjusteImpuestoCategoria("Varios")).toEqual(0);
  });

  it("deberia calcular envio por unidad segun peso volumetrico y validar el peso", () => {
    expect(calcularCostoEnvioPorUnidad(10)).toEqual(0);
    expect(calcularCostoEnvioPorUnidad(11)).toEqual(3.5);
    expect(calcularCostoEnvioPorUnidad(20)).toEqual(3.5);
    expect(calcularCostoEnvioPorUnidad(21)).toEqual(5);
    expect(calcularCostoEnvioPorUnidad(40)).toEqual(5);
    expect(calcularCostoEnvioPorUnidad(41)).toEqual(6);
    expect(calcularCostoEnvioPorUnidad(80)).toEqual(6);
    expect(calcularCostoEnvioPorUnidad(81)).toEqual(6.5);
    expect(calcularCostoEnvioPorUnidad(100)).toEqual(6.5);
    expect(calcularCostoEnvioPorUnidad(101)).toEqual(8);
    expect(calcularCostoEnvioPorUnidad(200)).toEqual(8);
    expect(calcularCostoEnvioPorUnidad(201)).toEqual(9);
    expect(() => calcularCostoEnvioPorUnidad(-1)).toThrow("El peso volumetrico no puede ser negativo");
    expect(() => calcularCostoEnvioPorUnidad("abc")).toThrow("El peso volumetrico debe ser numerico");
  });

  it("deberia calcular el costo total de envio multiplicando por la cantidad", () => {
    expect(calcularCostoEnvioTotal(20, 11)).toEqual(70);
    expect(calcularCostoEnvioTotal(3, 201)).toEqual(27);
  });

  it("deberia descontar el envio segun el tipo de cliente", () => {
    expect(obtenerPorcentajeDescuentoEnvio("Normal")).toEqual(0);
    expect(obtenerPorcentajeDescuentoEnvio("Recurrente")).toEqual(0.5);
    expect(obtenerPorcentajeDescuentoEnvio("Antiguo Recurrente")).toEqual(1);
    expect(obtenerPorcentajeDescuentoEnvio("Especial")).toEqual(1.5);
    expect(calcularCostoEnvioConDescuento(100, "Especial")).toEqual(98.5);
  });
});
