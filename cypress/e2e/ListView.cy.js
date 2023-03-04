describe("list view", () => {
  beforeEach(() => {
    cy.intercept("https://dummyapi.io/data/v1/post?page=1&limit=20", {
      fixture: "list.json",
    });

    cy.visit("http://localhost:5173/");
  });

  it("renders list view wrapper with 20 posts in it", () => {
    cy.get("[data-cy-post]").should("exist").and("have.length", 20);

    cy.get("[data-cy-button='create']").should("exist");
  });

  it("renders post cards with full information", () => {
    cy.get("[data-cy-post]").each((post) => {
      cy.wrap(post).find("[data-cy-post-image]").should("exist");
      cy.wrap(post).find("[data-cy-post-name]").should("exist");
      cy.wrap(post).find("[data-cy-post-text]").should("exist");
      cy.wrap(post).find("[data-cy-post-tags]").should("exist");
      cy.wrap(post)
        .find("[data-cy-post-tags]")
        .children()
        .should("have.length", 3);
      cy.wrap(post).find("[data-cy-post-date]").should("exist");
    });
  });

  it("renders a post card with specific information", () => {
    cy.get("[data-cy-post = '60d21b1767d0d8992e610bfb']")
      .find("[data-cy-post-image]")
      .should("exist")
      .and(
        "have.attr",
        "src",
        "https://img.dummyapi.io/photo-1569095380079-90096b58b1d0.jpg"
      );
    cy.get("[data-cy-post = '60d21b1767d0d8992e610bfb']")
      .find("[data-cy-post-name]")
      .should("have.text", "Vaino Sakala");
    cy.get("[data-cy-post = '60d21b1767d0d8992e610bfb']")
      .find("[data-cy-post-text]")
      .should("have.text", "brown dog sitting on road");
    cy.get("[data-cy-post = '60d21b1767d0d8992e610bfb']")
      .find("[data-cy-post-tags]")
      .children()
      .eq(0)
      .should("have.text", "dog");
    cy.get("[data-cy-post = '60d21b1767d0d8992e610bfb']")
      .find("[data-cy-post-tags]")
      .children()
      .eq(1)
      .should("have.text", "animal");
    cy.get("[data-cy-post = '60d21b1767d0d8992e610bfb']")
      .find("[data-cy-post-tags]")
      .children()
      .eq(2)
      .should("have.text", "airedale");
    cy.get("[data-cy-post = '60d21b1767d0d8992e610bfb']")
      .find("[data-cy-post-date]")
      .should("have.text", "Feb 24, 2020, 04:58 AM");
  });
});
