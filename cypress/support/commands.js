// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
    cy.visit('/');
    cy.get('#basic_username').type(username);
    cy.get('#basic_password').type(password);
    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('go_to_course_catalog', () => {
    cy.get('[data-cy="courses-menu-tab"]').click();
});

Cypress.Commands.add('create_course', (courseTitle) => {
    cy.get('[data-cy="course-catalog-create-new"]').click();
    cy.get('[data-cy="course-catalog-create-new-name"]').type(courseTitle);
    cy.get('[data-cy="course-catalog-create-new-submit-button"]').click();
});


Cypress.Commands.add('edit_course_description', (course_description) => {
    cy.get('[data-cy="course-details-edit-description-button"]').find('.ant-typography-edit[role="button"]').click();

    cy.get('[data-cy="course-details-edit-description"]').find('textarea').should('be.visible');

    cy.get('[data-cy="course-details-edit-description"]')
        .find('textarea')
        .type(course_description);

    cy.get('body').click()
});


Cypress.Commands.add('hit_save_course', () => {
    cy.get("[data-cy='course-details-edit-save']").click();
});

Cypress.Commands.add('hit_publish_course', () => {
    cy.get("[data-cy='course-details-edit-publish']").click();
});

Cypress.Commands.add('assert_is_on_course_edit_page', () => {
    cy.url().should(
        'match',
        /\/app\/courses\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\/edit/
    );
});


Cypress.Commands.add('assert_is_course_visible_in_course_catalog', (courseTitle, courseDescription = undefined) => {
    cy.get('[data-cy="course-catalog-list"]').should('be.visible');
    cy.get('[data-cy="course-catalog-list-item"]')
        .contains(courseTitle)

    if (courseDescription) {
        cy.get('[data-cy="course-catalog-list-item"]')
            .contains(courseDescription)
    }
});