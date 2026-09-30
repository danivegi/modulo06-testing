/// <reference types="cypress" />

describe('Login scene', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show the login form', () => {
    // Assert
    cy.get('input[name="user"]').should('be.visible');
    cy.get('input[name="password"]')
      .should('be.visible')
      .and('have.attr', 'type', 'password');
    cy.contains('button', 'Login').should('be.visible');
  });

  it('should show required errors when submitting an empty form', () => {
    // Act
    cy.contains('button', 'Login').click();

    // Assert
    cy.get('.MuiFormHelperText-root')
      .should('have.length', 2)
      .each($helper => {
        cy.wrap($helper).should('have.text', 'Debe informar el campo');
      });
  });

  it('should show an error message and stay on login with invalid credentials', () => {
    // Act
    cy.get('input[name="user"]').type('admin');
    cy.get('input[name="password"]').type('wrong password');
    cy.contains('button', 'Login').click();

    // Assert
    cy.contains('Usuario y/o password no válidos').should('be.visible');
    cy.url().should('not.include', 'submodule-list');
  });

  it('should navigate to submodule list with valid credentials', () => {
    // Act
    cy.get('input[name="user"]').type('admin');
    cy.get('input[name="password"]').type('test');
    cy.contains('button', 'Login').click();

    // Assert
    cy.url().should('include', '#/submodule-list');
    cy.contains('Proyectos').should('be.visible');
    cy.contains('Empleados').should('be.visible');
  });

  it('should redirect to login when visiting submodule list without session', () => {
    // Act
    cy.visit('/#/submodule-list');

    // Assert
    cy.url().should('include', '#/login');
    cy.get('input[name="user"]').should('be.visible');
  });
});