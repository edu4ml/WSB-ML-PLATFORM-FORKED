


Cypress.Commands.add('create_new_course_component', (title, description, type) => {
    cy.get('[data-cy="course-component-create-new"]').click();

    // Fill the title field
    cy.get('[data-cy="course-component-create-new-title"]').type(title);

    // Fill the description field
    cy.get('[data-cy="course-component-create-new-description"]').type(description);

    // Click on the dropdown to select the exercise type
    cy.get('[data-cy="course-component-create-new-type"]').click();

    // Select the exercise type from the dropdown
    cy.get(`[data-cy="course-component-create-new-type-${type}"]`).click();

    // Click the save button
    cy.get('[data-cy="course-component-create-new-submit-button"]').click();
});

