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

describe("Homepage tests", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:3000/");
  });

  it("Should not be able to access login when logged", () => {
    localStorage.setItem("@desafio/token", "test token");
    cy.viewport(1360, 720);

    cy.url("/login");

    cy.contains("Humanos");
    cy.contains("Aliens");
    cy.contains("Ver favoritos");

    cy.get("li").should("have.length", 20);
  });

  it("Should not be able to access register page when logged", () => {
    localStorage.setItem("@desafio/token", "test token");
    cy.viewport(1360, 720);

    cy.url("/cadastro");

    cy.contains("Humanos");
    cy.contains("Aliens");
    cy.contains("Ver favoritos");

    cy.get("li").should("have.length", 20);
  });

  it("Should not be able to access favorites page when logged", () => {
    localStorage.setItem("@desafio/token", "test token");
    cy.viewport(1360, 720);

    cy.contains("Ver favoritos").click();

    cy.contains(
      "Ops... Você não possui nenhum personagem favorito! Volte à página inicial e faça a sua coleção!!!"
    );
    cy.get("button").should("have.length", 2);
  });

  it("Should be able to logout", () => {
    localStorage.setItem("@desafio/token", "test token");
    cy.viewport(1360, 720);

    cy.contains("Logout").click();

    cy.contains("Seja bem vindo(a)");

    cy.get("input").should("have.length", 2);
    cy.get("button").should("have.length", 1);
    cy.get("a").should("have.length", 2);
  });

  it("Should be able to access login when not logged", () => {
    cy.viewport(1360, 720);

    cy.contains("Login").click();

    cy.contains("Seja bem vindo(a)");

    cy.get("input").should("have.length", 2);
    cy.get("button").should("have.length", 1);
    cy.get("a").should("have.length", 2);
  });

  it("Should not be able to able to access favorites chars when not logged", () => {
    cy.viewport(1360, 720);

    cy.contains("Ver favoritos").click();

    cy.contains("Humanos");
    cy.contains("Aliens");
    cy.contains("Ver favoritos");

    cy.get("li").should("have.length", 20);
  });

  it("Should be able to open char modal when clicking infos button", () => {
    cy.viewport(1360, 720);

    cy.contains("Infos").click();

    cy.contains("Status");
    cy.contains("Episódios");
    cy.contains("Casa");
    cy.contains("Espécie");
    cy.contains("Origem");
    cy.contains("Criado em");

    cy.get("#close").click();

    cy.get("li").should("have.length", 20);
  });

  it("Should not be able to add a char when not logged", () => {
    cy.viewport(1360, 720);

    cy.get("#add-char").click();

    cy.contains(
      "Ops, para adicionar personagens à sua lista você deve estar logado"
    );
  });

  it("Should not be able to add a char when not logged in modal", () => {
    cy.viewport(1360, 720);

    cy.contains("Infos").click();

    cy.contains("Status");
    cy.contains("Episódios");
    cy.contains("Casa");
    cy.contains("Espécie");
    cy.contains("Origem");
    cy.contains("Criado em");

    cy.get("#add-char").click({ force: true });

    cy.contains(
      "Ops, para adicionar personagens à sua lista você deve estar logado"
    );
  });
});
