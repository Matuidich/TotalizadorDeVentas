describe("Totalizador de venta", () => {
  it("permite ingresar la cantidad", () => {
    cy.visit("/");
    cy.get('label[for="cantidad"]').should("contain", "Cantidad");
    cy.get("#cantidad").type("20").should("have.value", "20");
  });
});
