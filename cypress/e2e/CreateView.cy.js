describe("create view", () => {
  it("renders create view with save button and empty form", () => {
    cy.visit("http://localhost:5173/create");

    cy.get("[data-cy-button='save']").should("exist");
    cy.get("[data-cy-wrapper='create']").should("exist");

    // Post owner
    cy.get("[data-cy-wrapper='create']")
      .find("[data-cy-header]")
      .should("exist")
      .and("have.text", "Create new post");
    cy.get("[data-cy-subheader='owner']")
      .should("exist")
      .and("have.text", "Post owner");
    cy.get("[data-cy-label='name']").should("exist").and("have.text", "Name*");
    cy.get("[data-cy-label='surname']")
      .should("exist")
      .and("have.text", "Surname*");
    cy.get("[data-cy-label='avatar']")
      .should("exist")
      .and("have.text", "Avatar*");
    cy.get("[data-cy-input='name']").should("exist").and("have.value", "");
    cy.get("[data-cy-input='surname']").should("exist").and("have.value", "");
    cy.get("[data-cy-input='avatar']").should("exist").and("have.value", "");

    // Post
    cy.get("[data-cy-subheader='post']")
      .should("exist")
      .and("have.text", "Post");
    cy.get("[data-cy-label='image']")
      .should("exist")
      .and("have.text", "Image*");
    cy.get("[data-cy-label='text']").should("exist").and("have.text", "Text*");
    cy.get("[data-cy-label='tags']").should("exist").and("have.text", "Tags");
    cy.get("[data-cy-input='image']").should("exist").and("have.value", "");
    cy.get("[data-cy-input='text']").should("exist").and("have.value", "");
    cy.get("[data-cy-input='tags']").should("exist").and("have.value", "");
  });
});
