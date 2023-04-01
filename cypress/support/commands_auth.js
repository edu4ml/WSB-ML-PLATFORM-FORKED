
Cypress.Commands.add('login', (username, password) => {
    cy.visit('/');
    cy.get('#basic_username').type(username);
    cy.get('#basic_password').type(password);
    cy.get('button[type="submit"]').click();
});