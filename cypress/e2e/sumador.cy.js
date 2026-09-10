describe("Totalizador de venta", () => {
  it("permite ingresar la cantidad", () => {
    cy.visit("/");
    cy.get('label[for="cantidad"]').should("contain", "Cantidad");
    cy.get("#cantidad").type("20").should("have.value", "20");
  });
  it("permite ingresar el precio con decimales", () => {
    cy.visit("/");
    cy.get('label[for="precio"]').should("contain", "Precio");
    cy.get("#precio").type("3.50").should("have.value", "3.50");
  });
  it("permite seleccionar el estado de la compra", () => {
    cy.visit("/");
    cy.get('label[for="estado"]').should("contain", "Estado");
    cy.get("#estado").should("have.value", "CA");
  });
  it("ofrece los cinco estados validos mediante una lista desplegable", () => {
    cy.visit("/");
    cy.get("select#estado").should("have.value", "CA");
    cy.get("#estado option").then((opciones) => {
      expect([...opciones].map((opcion) => opcion.value)).to.deep.equal([
        "UT", "NV", "TX", "AL", "CA",
      ]);
    });
    for (const estado of ["UT", "NV", "TX", "AL", "CA"]) {
      cy.get("#estado").select(estado).should("have.value", estado);
    }
  });
  it("permite seleccionar categoria y usa Varios por defecto", () => {
    cy.visit("/");
    cy.get("#categoria").should("have.value", "Varios");
    cy.get("#categoria option").then((opciones) => {
      expect([...opciones].map((opcion) => opcion.value)).to.deep.equal([
        "Varios", "Alimentos", "Electrónicos",
      ]);
    });
    cy.get("#categoria").select("Alimentos").should("have.value", "Alimentos");
  });
  it("permite seleccionar tipo de cliente y usa Normal por defecto", () => {
    cy.visit("/");
    cy.get("#tipo-cliente").should("have.value", "Normal");
    cy.get("#tipo-cliente option").then((opciones) => {
      expect([...opciones].map((opcion) => opcion.value)).to.deep.equal([
        "Normal", "Recurrente", "Antiguo Recurrente", "Especial",
      ]);
    });
    cy.get("#tipo-cliente").select("Especial").should("have.value", "Especial");
  });
  it("confirma la compra mostrando el desglose o el error de validacion", () => {
    cy.visit("/");
    cy.get("#cantidad").type("20");
    cy.get("#precio").type("50");
    cy.get("#estado").select("TX");
    cy.get("#confirmar-button").should("contain", "Confirmar compra").click();
    cy.get("#resultado-div")
      .should("contain", "Compra confirmada")
      .and("contain", "Precio neto: 1000.00")
      .and("contain", "Descuento (3%): 30.00")
      .and("contain", "Precio despues del descuento: 970.00")
      .and("contain", "Impuesto TX (6.25%): 60.63")
      .and("contain", "Precio total: 1030.63");
    cy.get("#error-div").should("be.empty");

    for (const [cantidad, precio, estado, mensaje] of [
      ["-1", "3", "TX", "La cantidad no puede ser negativa"],
      ["0", "3", "TX", "La cantidad debe ser mayor a cero"],
      ["abc", "3", "TX", "La cantidad debe ser numerica"],
      ["20abc", "3", "TX", "La cantidad debe ser numerica"],
      ["", "3", "TX", "La cantidad debe ser numerica"],
      ["20", "-3", "TX", "El precio no puede ser negativo"],
      ["20", "0", "TX", "El precio debe ser mayor a cero"],
      ["20", "abc", "TX", "El precio debe ser numerico"],
      ["20", "3abc", "TX", "El precio debe ser numerico"],
      ["20", "", "TX", "El precio debe ser numerico"],
    ]) {
      cy.get("#cantidad").clear();
      if (cantidad) cy.get("#cantidad").type(cantidad);
      cy.get("#precio").clear();
      if (precio) cy.get("#precio").type(precio);
      cy.get("#estado").select(estado);
      cy.get("#confirmar-button").click();
      cy.get("#error-div").should("have.text", mensaje);
      cy.get("#resultado-div").should("be.empty");
    }

    cy.get("#precio").clear().type("3.50");
    cy.get("#estado").select("CA");
    cy.get("#confirmar-button").click();
    cy.get("#error-div").should("be.empty");
    cy.get("#resultado-div")
      .should("contain", "Precio neto: 70.00")
      .and("contain", "Descuento (0%): 0.00")
      .and("contain", "Impuesto CA (8.25%): 5.78")
      .and("contain", "Precio total: 75.78");
  });
  it("cancela la compra limpiando los datos, el resultado y los errores", () => {
    cy.visit("/");
    cy.get("#cantidad").type("20");
    cy.get("#precio").type("3");
    cy.get("#estado").select("TX");
    cy.get("#confirmar-button").click();
    cy.get("#resultado-div").should("contain", "Precio total: 63.75");
    cy.get("#cancelar-button").should("contain", "Cancelar compra").click();
    cy.get("#cantidad").should("have.value", "");
    cy.get("#precio").should("have.value", "");
    cy.get("#estado").should("have.value", "CA");
    cy.get("#resultado-div").should("be.empty");
    cy.get("#error-div").should("be.empty");

    cy.get("#cantidad").type("20");
    cy.get("#precio").type("abc");
    cy.get("#estado").select("CA");
    cy.get("#confirmar-button").click();
    cy.get("#error-div").should("have.text", "El precio debe ser numerico");
    cy.get("#cancelar-button").click();
    cy.get("#cantidad").should("have.value", "");
    cy.get("#precio").should("have.value", "");
    cy.get("#estado").should("have.value", "CA");
    cy.get("#resultado-div").should("be.empty");
    cy.get("#error-div").should("be.empty");

    cy.get("#cantidad").type("2");
    cy.get("#precio").type("10");
    cy.get("#estado").select("AL");
    cy.get("#confirmar-button").click();
    cy.get("#resultado-div").should("contain", "Precio total: 20.80");
    cy.get("#error-div").should("be.empty");
  });
  it("confirma y muestra el desglose completo de extensiones", () => {
    cy.visit("/");
    cy.get("#cantidad").type("20");
    cy.get("#precio").type("400");
    cy.get("#estado").select("CA");
    cy.get("#categoria").select("Electrónicos");
    cy.get("#peso-volumetrico").type("21");
    cy.get("#tipo-cliente").select("Especial");
    cy.get("#confirmar-button").click();
    cy.get("#resultado-div")
      .should("contain", "Precio neto: 8000.00")
      .and("contain", "Descuento original (7%): 560.00")
      .and("contain", "Ajuste descuento categoría Electrónicos (1%): 80.00")
      .and("contain", "Descuentos totales: 640.00")
      .and("contain", "Precio despues del descuento: 7360.00")
      .and("contain", "Estado: CA (8.25%)")
      .and("contain", "Categoría: Electrónicos (descuento adicional 1%, impuesto adicional 4%)")
      .and("contain", "Impuesto total (12.25%): 901.60")
      .and("contain", "Peso volumétrico: 21")
      .and("contain", "Envío por unidad: 5.00")
      .and("contain", "Envío bruto: 100.00")
      .and("contain", "Tipo de cliente: Especial (descuento envío 1.5%)")
      .and("contain", "Envío final: 98.50")
      .and("contain", "Beneficio especial: 200.00")
      .and("contain", "Total final: 8160.10");
  });
});
