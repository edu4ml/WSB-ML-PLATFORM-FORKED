describe('Login and Logout', () => {
    beforeEach(() => {
        // visit the login page before each test
        cy.visit('/');
    });

    it('Logs in and out successfully', () => {
        // type in username and password
        cy.get('#basic_username').type('admin');
        cy.get('#basic_password').type('adminadmin');

        // click on login button
        cy.get('[data-cy="login-button"]').click();

        // verify user is redirected to courses page
        cy.url().should('include', '/courses');

        // click on the logout button
        cy.get('[data-cy="top-right-avatar"]').click();
        cy.contains('Wyloguj').click();

        // verify user is redirected to the login page
        cy.url().should('include', '/app');
    });
});
