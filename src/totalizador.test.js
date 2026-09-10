import calcularPrecioNeto, {
  obtenerPorcentajeDescuento,
  calcularDescuento,
  calcularPrecioConDescuento,
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
});
