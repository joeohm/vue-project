describe("edit view", () => {
  beforeEach(() => {
    cy.intercept("https://dummyapi.io/data/v1/post/60d21bbc67d0d8992e610dde", {
      fixture: "post.json",
    }).as("Post");

    cy.visit("http://localhost:5173/60d21bbc67d0d8992e610dde/edit");
  });

  it("renders edit view with save button and form with data from api", () => {
    cy.get("[data-cy-button='save']").should("exist");
    cy.get("[data-cy-wrapper='edit']").should("exist");

    cy.get("[data-cy-wrapper='edit']")
      .find("[data-cy-header]")
      .should("exist")
      .and("have.text", "Edit post");

    cy.get("[data-cy-poster-image]")
      .should("exist")
      .and(
        "have.attr",
        "src",
        "https://randomuser.me/api/portraits/med/men/56.jpg"
      );
    cy.get("[data-cy-poster-name]")
      .should("exist")
      .and("have.text", "Vaino Sakala");
    cy.get("[data-cy-post-date]")
      .should("exist")
      .and("have.text", "Feb 24, 2020, 04:58 AM");

    cy.get("[data-cy-label='image']")
      .should("exist")
      .and("have.text", "Image*");
    cy.get("[data-cy-label='text']").should("exist").and("have.text", "Text*");
    cy.get("[data-cy-label='tags']").should("exist").and("have.text", "Tags");
    cy.get("[data-cy-input='image']")
      .should("exist")
      .and(
        "have.value",
        "https://img.dummyapi.io/photo-1569095380079-90096b58b1d0.jpg"
      );
    cy.get("[data-cy-input='text']")
      .should("exist")
      .and("have.value", "brown dog sitting on road");
    cy.get("[data-cy-input='tags']")
      .should("exist")
      .and("have.value", "dog, animal, airedale");
  });
});
