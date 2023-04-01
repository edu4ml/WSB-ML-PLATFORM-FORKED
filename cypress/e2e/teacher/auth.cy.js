


describe('Authorization', () => {
    beforeEach(() => {
        cy.login('teacher', 'adminadmin');
    });

    it('should login, navigate to the courses catalog and logout', () => {
        // redirected to courses after login
        cy.url().should('include', '/app/courses');

        // click on the logout button
        cy.get('[data-cy="top-right-avatar"]').click();
        cy.contains('Wyloguj').click();

        // verify user is redirected to the login page
        cy.url().should('include', '/');
    });
})  