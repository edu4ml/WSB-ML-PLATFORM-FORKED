
Cypress.Commands.add('add_step_to_course', (stepTitle) => {
    cy.get('[data-cy="course-details-add-steps-dropdown"]').click();

    // Wait for the dropdown menu to be visible
    cy.get('.ant-dropdown-menu').should('be.visible');

    // Click on the specific dropdown item based on its label or key
    // Replace 'Item 1' with the label you're looking for or use the data-key attribute
    cy.get('.ant-dropdown-menu-item').contains(stepTitle).click();
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

