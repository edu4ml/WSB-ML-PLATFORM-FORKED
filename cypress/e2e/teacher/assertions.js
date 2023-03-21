// Verify the display of a list of courses
cy.get('.courses-list').should('be.visible');
cy.get('.course-item').should('have.length.greaterThan', 0);

// Verify the display of course information (title, description, etc.)
cy.get('.course-item').each(($course) => {
    cy.wrap($course).find('.course-title').should('be.visible');
    cy.wrap($course).find('.course-description').should('be.visible');
    // Add other relevant information checks here
});

// Verify the consistent order of courses (by date created, alphabetical order, etc.)
// Here, we check for alphabetical order as an example
cy.get('.course-item .course-title').then(($titles) => {
    const titlesText = $titles.map((_, title) => Cypress.$(title).text()).get();
    const sortedTitles = [...titlesText].sort();
    expect(titlesText).to.deep.equal(sortedTitles);
});

// Verify the ability to filter or search courses by criteria (title, description, etc.)
cy.get('.search-input').type('search keyword');
cy.get('.course-item').each(($course) => {
    cy.wrap($course)
        .find('.course-title')
        .should('contain.text', 'search keyword');
    // Add other criteria checks here
});

// Verify the ability to navigate to other pages of the courses list
cy.get('.pagination').should('be.visible');
cy.get('.pagination .next-page').click();
cy.get('.courses-list').should('be.visible');

// Verify the ability to click on a course and manage its content and details
cy.get('.course-item:first').click();
cy.get('.course-details').should('be.visible');
// Add assertions for managing course content and details

// Verify the ability to create a new course via a button or link
cy.get('.create-course-btn').click();
cy.get('.create-course-form').should('be.visible');
// Add assertions for filling out the form and submitting it

// Verify the ability to edit or delete an existing course via appropriate buttons or links
// Edit course
cy.get('.course-item:first .edit-course-btn').click();
cy.get('.edit-course-form').should('be.visible');
// Add assertions for editing the course and submitting the changes

// Delete course
cy.get('.course-item:first .delete-course-btn').click();
// Add assertions for confirming the deletion (e.g., modal, alert, etc.)
// Verify that the course has been removed from the list
cy.get('.course-item:first .course-title').should(
    'not.contain.text',
    'course title to delete'
);
