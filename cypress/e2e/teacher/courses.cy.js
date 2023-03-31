describe('Courses catalog page', () => {
    beforeEach(() => {
        cy.login('teacher', 'adminadmin');
    });

    it('should login, navigate to the courses URL and logout', () => {
        // redirected to courses after login
        cy.url().should('include', '/app/courses');

        // click on the logout button
        cy.get('[data-cy="top-right-avatar"]').click();
        cy.contains('Wyloguj').click();

        // verify user is redirected to the login page
        cy.url().should('include', '/');
    });

    it('should verify that the teacher has necessary permissions to view list of courses', () => {
        // redirected to courses after login
        cy.url().should('include', '/app/courses');

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
        cy.url().should('include', '/app/courses');

        const courseTitle = `Test Course - ${Date.now()}`;

        cy.create_course(courseTitle);
        cy.assert_is_on_course_edit_page()
        cy.go_to_course_catalog()
        cy.assert_is_course_visible_in_course_catalog(courseTitle)
    });

    it('should verify that the teacher can edit not published course and save it', () => {
        // redirected to courses after login
        cy.url().should('include', '/app/courses');

        const courseTitle = `Test Course - ${Date.now()}`;
        const courseDescription = `Test Course Description - ${Date.now()}`;

        cy.create_course(courseTitle);
        cy.assert_is_on_course_edit_page()

        cy.edit_course_description(courseDescription);
        cy.hit_save_course();

        cy.contains(courseTitle).should('be.visible');
        cy.contains(courseDescription).should('be.visible');

    });

});
