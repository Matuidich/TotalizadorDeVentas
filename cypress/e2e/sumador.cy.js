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
});
