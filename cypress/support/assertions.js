
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

Cypress.Commands.add('assert_is_course_visible_and_can_enroll', (courseTitle) => {
    cy.contains('[data-cy="course-catalog-list-item"]', courseTitle).within(() => {
        // Check if there is a Publish button within the list item
        cy.get('[data-cy="course-catalog-list-item-enroll-button"]').should('be.visible');
    });
});


Cypress.Commands.add('assert_is_course_component_visible_in_the_list', (title) => {
    // Assert that the new component is visible in the list
    cy.get('[data-cy="course-components-list"]').contains(title).should('be.visible');
});