describe('Courses page', () => {
    beforeEach(() => {
        cy.login('teacher', 'adminadmin');
    });

    it('should login, navigate to the courses URL and logout', () => {
        // redirected to courses after login
        cy.url().should('include', '/courses');

        // click on the logout button
        cy.contains('Wyloguj').click();

        // verify user is redirected to the login page
        cy.url().should('include', '/');
    });

    it('should verify that the teacher has necessary permissions to view list of courses', () => {
        // redirected to courses after login
        cy.url().should('include', '/courses');

        // Check if the teacher can see the list of courses
        cy.get('[data-cy="course-catalog-list"]').should('be.visible');

        // Assuming you have added the 'custom-list-item' class to each List.Item in your Ant Design List component
        // Count the number of courses in the list
        cy.get('[data-cy="course-catalog-list-item"]')
            .its('length')
            .then((numOfCourses) => {
                // You can use numOfCourses in your assertions or log it for debugging
                // For example, you can check if there are at least 1 course in the list
                expect(numOfCourses).to.be.at.least(1);

                // Log the number of courses
                cy.log(`Number of courses: ${numOfCourses}`);
            });
    });

    it('should verify that the teacher can create new course and it is visible in the list', () => {
        // redirected to courses after login
        cy.url().should('include', '/courses');

        const courseTitle = `Test Course - ${Date.now()}`;

        cy.create_course(courseTitle);

        // Check if the user was redirected to the course edit page with a valid UUID
        cy.url().should(
            'match',
            /\/courses\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\/edit/
        );

        // Go to the course list page
        cy.visit('/courses');

        // Check if the new course appears in the list of courses
        cy.get('[data-cy="course-catalog-list"]').should('be.visible');
        cy.get('[data-cy="course-catalog-list-item"]')
            .contains(courseTitle)
            .should('be.visible');
    });

    it('should verify that the teacher can edit not published course and save it', () => {
        // redirected to courses after login
        cy.url().should('include', '/courses');

        const courseTitle = `Test Course - ${Date.now()}`;

        cy.create_course(courseTitle);
        cy.url().should(
            'match',
            /\/courses\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\/edit/
        );

        cy.get('[data-cy="course-details-edit-description"]').click();
        cy.get('[data-cy="course-details-edit-description"]').type(
            `Course test description - ${Date.now()}`
        );
    });
});
