/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("Registrationpage tests", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:3000/cadastro");
  });

  it("Should be able to register and redirect to login", () => {
    cy.viewport(1360, 720);

    cy.intercept("POST", "/users", {
      statusCode: 201,
      body: {
        user: {
          id: "string2",
          name: "teste",
          created_at: "16/07/2022",
          updated_at: "16/07/2022",
        },
      },
    }).as("new-user");

    cy.get("input[name=name]").type("teste");
    cy.get("input[name=password]").type("123456");
    cy.get("input[name=confirm_password]").type("123456");

    cy.get("button[type=submit]").click();

    cy.contains("Seja bem vindo(a)!");

    cy.get("input").should("have.length", 2);
    cy.get("button").should("have.length", 1);
  });

  it("Should be able to visit homepage without being loged", () => {
    cy.viewport(1360, 720);

    cy.contains("homepage").click();

    cy.contains("Humanos");
    cy.contains("Aliens");
    cy.contains("Ver favoritos");

    cy.get("li").should("have.length", 20);
  });

  it("Should be able to visit login page", () => {
    cy.viewport(1360, 720);

    cy.contains("login").click();

    cy.contains("Seja bem vindo(a)");
    cy.get("input").should("have.length", 2);
    cy.get("button").should("have.length", 1);
  });
});
