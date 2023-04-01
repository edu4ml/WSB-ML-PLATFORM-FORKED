
Cypress.Commands.add('go_to_course_catalog', () => {
    cy.get('[data-cy="courses-menu-tab"]').click();
});
Cypress.Commands.add('go_to_course_components_catalog', () => {
    cy.get('[data-cy="course-components-menu-tab"]').click();
});

