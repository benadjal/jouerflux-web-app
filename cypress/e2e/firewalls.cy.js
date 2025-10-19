/// <reference types="cypress" />

describe("Testing firewall", () => {
  beforeEach(() => {
    cy.visit("/firewalls");
  });

  it("should display 'New Firewall' button", () => {
    cy.get("[data-cy=add-firewall]").contains("New Firewall");
  });

  it("should add new firewall through the dialog", () => {
    cy.get("[data-cy=add-firewall]").click();
    cy.get("[data-cy=add-firewall-dialog]").should("exist");

    cy.get("[data-cy=firewall-form-name-input]").type("ab");
    cy.get("[data-cy=firewall-error-min-length]").should("be.visible");
    cy.get("[data-cy=firewall-form-name-input]").clear();

    cy.get("[data-cy=firewall-form-name-input]").type("abcdefghijklmnopqrsstuvwxyzabcdefghijklmnopqrsstuvwxyzabcdefghijklmnopqrsstuvwxyz");
    cy.get("[data-cy=firewall-error-max-length]").should("be.visible");
    cy.get("[data-cy=firewall-form-name-input]").clear();

    cy.get("[data-cy=firewall-error-required]").should("be.visible");
    
    cy.get("[data-cy=firewall-form-submit-button").click();

    cy.get("[data-cy=firewall-form-name-input]").type(
      "New Firewall from cypress",
    );

    cy.get("[data-cy=firewall-form-submit-button").click();
  });

  it("Should find the new firewall in the table", () => {
    cy.get("[data-cy=firewall-search-bar]")
      .should("exist")
      .type("New Firewall from cypress");

    cy.get("table").should("exist");

    cy.contains("tr", "New Firewall from cypress").should("exist");
  });

  it("Should go to firewall's detail page", () => {
    cy.get("[data-cy=firewall-search-bar]")
      .should("exist")
      .type("New Firewall from cypress");

    cy.get("table").should("exist");

    cy.contains("tr", "New Firewall from cypress").should("exist");

    cy.get("[data-cy=firewall-detail-button]").click();

    cy.url().should("include", "/firewall/");

    cy.get("[data-cy=firewall-detail-button]")
      .should("be.visible")
      .and("contain.text", "Nom du firewall");
  });

  it("Should delete the created firewall", () => {
    cy.get("[data-cy=firewall-search-bar]")
      .should("exist")
      .type("New Firewall from cypress");

    cy.contains("tr", "New Firewall from cypress").should("exist");

    cy.get("[data-cy=firewall-delete-button]").click();

    cy.get("div[role='alertdialog']", { timeout: 10000 }).should("be.visible");

    cy.contains("button.p-confirmdialog-accept-button span", "Supprimer")
      .should("be.visible")
      .click();

    cy.contains("tr", "New Firewall from cypress").should("not.exist");
  });
});
