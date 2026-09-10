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
});
