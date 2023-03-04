describe("post view", () => {
  beforeEach(() => {
    cy.intercept("https://dummyapi.io/data/v1/post/60d21b1767d0d8992e610bfb", {
      fixture: "post.json",
    }).as("Post");
    cy.intercept(
      "https://dummyapi.io/data/v1/post/60d21b1767d0d8992e610bfb/comment",
      {
        fixture: "3comments.json",
      }
    ).as("Comments");

    cy.visit("http://localhost:5173/post/60d21b1767d0d8992e610bfb");
  });

  it("renders post view with edit button and wrappers", () => {
    cy.get("[data-cy-button='edit']").should("exist");
    cy.get("[data-cy-wrapper='post']").should("exist");
    cy.get("[ data-cy-wrapper='add-comment']").should("exist");
    cy.get("[ data-cy-wrapper='comments']").should("exist");
  });

  it("renders post card wrapper with full information", () => {
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
    cy.get("[data-cy-post-image]")
      .should("exist")
      .and(
        "have.attr",
        "src",
        "https://img.dummyapi.io/photo-1569095380079-90096b58b1d0.jpg"
      );
    cy.get("[data-cy-post-text]")
      .should("exist")
      .and("have.text", "brown dog sitting on road");
    cy.get("[data-cy-post-tags]").should("exist");
    cy.get("[data-cy-post-tags]").children().eq(0).should("have.text", "dog");
    cy.get("[data-cy-post-tags]")
      .children()
      .eq(1)
      .should("have.text", "animal");
    cy.get("[data-cy-post-tags]")
      .children()
      .eq(2)
      .should("have.text", "airedale");
  });

  it("renders the add a comment section", () => {
    cy.get("[data-cy-wrapper='add-comment']")
      .find("[data-cy-header]")
      .should("exist")
      .and("have.text", "Add a comment");
    cy.get("[data-cy-label='name']").should("exist").and("have.text", "Name*");
    cy.get("[data-cy-label='surname']")
      .should("exist")
      .and("have.text", "Surname*");
    cy.get("[data-cy-label='message']")
      .should("exist")
      .and("have.text", "Message*");
    cy.get("[data-cy-input='name']").should("exist");
    cy.get("[data-cy-input='surname']").should("exist");
    cy.get("[data-cy-input='message']").should("exist");
    cy.get("[class='add-comment-submit']")
      .should("exist")
      .and("include.text", "POST");
  });
});

describe("comments section", () => {
  beforeEach(() => {
    cy.intercept("https://dummyapi.io/data/v1/post/60d21b1767d0d8992e610bfb", {
      fixture: "post.json",
    }).as("Post");

    cy.visit("http://localhost:5173/post/60d21b1767d0d8992e610bfb");
  });

  it("renders correctly when there are no comments to display", () => {
    cy.intercept(
      "https://dummyapi.io/data/v1/post/60d21b1767d0d8992e610bfb/comment",
      {
        fixture: "nocomments.json",
      }
    ).as("No comments");

    cy.get("[data-cy-wrapper='comments']")
      .find("[data-cy-header]")
      .should("exist")
      .and("have.text", "No comments");
  });

  it("renders correctly when there are 3 comments to display", () => {
    cy.intercept(
      "https://dummyapi.io/data/v1/post/60d21b1767d0d8992e610bfb/comment",
      {
        fixture: "3comments.json",
      }
    ).as("3 comments");

    cy.get("[data-cy-wrapper='comments']")
      .find("[data-cy-header]")
      .should("exist")
      .and("have.text", "3 comments");

    cy.get("[data-cy-post-comment]").should("have.length", 3);
  });

  it("renders correctly when there is only 1 comment to display", () => {
    cy.intercept(
      "https://dummyapi.io/data/v1/post/60d21b1767d0d8992e610bfb/comment",
      {
        fixture: "1comment.json",
      }
    ).as("1 comment");

    cy.get("[data-cy-wrapper='comments']")
      .find("[data-cy-header]")
      .should("exist")
      .and("have.text", "1 comment");

    cy.get("[data-cy-post-comment]").should("have.length", 1);
  });

  it("renders information inside a comment correctly", () => {
    cy.intercept(
      "https://dummyapi.io/data/v1/post/60d21b1767d0d8992e610bfb/comment",
      {
        fixture: "1comment.json",
      }
    ).as("1 comment");

    cy.get("[data-cy-comment-owner-image]")
      .should("exist")
      .and(
        "have.attr",
        "src",
        "https://randomuser.me/api/portraits/med/men/22.jpg"
      );
    cy.get("[data-cy-comment-owner-name]")
      .should("exist")
      .and("have.text", "Nikolaj Larsen");
    cy.get("[data-cy-comment-text]")
      .should("exist")
      .and("have.text", "Cute pic");
    cy.get("[data-cy-comment-date]")
      .should("exist")
      .and("have.text", "Nov 23, 2019, 08:50 PM");
  });
});
