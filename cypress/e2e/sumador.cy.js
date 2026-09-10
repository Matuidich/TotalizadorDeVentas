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
    cy.get("#estado").select("TX").should("have.value", "TX");
  });
  it("ofrece los cinco estados validos mediante una lista desplegable", () => {
    cy.visit("/");
    cy.get("select#estado").should("have.value", "");
    cy.get("#estado option").then((opciones) => {
      expect([...opciones].map((opcion) => opcion.value)).to.deep.equal([
        "", "UT", "NV", "TX", "AL", "CA",
      ]);
    });
    for (const estado of ["UT", "NV", "TX", "AL", "CA"]) {
      cy.get("#estado").select(estado).should("have.value", estado);
    }
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
      ["20", "3", "", "Codigo de estado invalido"],
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
});
