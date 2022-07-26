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

describe("Login page tests", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:3000/login");
  });

  it("Should be able to login and redirect to homepage", () => {
    cy.viewport(1360, 720);

    cy.intercept("POST", "/login", {
      statusCode: 201,
      body: {
        token: "string",
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

    cy.get("button[type=submit]").click();

    cy.contains("Humanos");
  });

  it("Should be not be able to login with wrong credentials", () => {
    cy.viewport(1360, 720);

    cy.intercept("POST", "/login", {
      statusCode: 400,
      body: {
        message: "Plase check your credentials",
      },
    }).as("new-user");

    cy.get("input[name=name]").type("wrong");
    cy.get("input[name=password]").type("123456");

    cy.get("button[type=submit]").click();

    cy.contains("Algo deu errado, cheque suas credenciais");
  });

  it("Should be able to access the home page", () => {
    cy.viewport(1360, 720);

    cy.contains("Ir para a homepage").click();

    cy.contains("Humanos");
    cy.get("li").should("have.length", 20);
  });

  it("Should be able to acess the registration page", () => {
    cy.viewport(1360, 720);

    cy.contains("Cadastre-se").click();

    cy.contains("Seja bem vindo");

    cy.get("input").should("have.length", 3);
  });
});
