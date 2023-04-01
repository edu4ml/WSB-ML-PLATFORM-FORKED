

describe('Courses components catalog page', () => {
    beforeEach(() => {
        cy.login('teacher', 'adminadmin');
    });


    // it('should login, go to the course components catalog and create one exercise', () => {
    //     cy.url().should('include', '/app/courses');


    // });

    it('successfully creates a new course component - type exercise', () => {
        // Go to menu tab
        cy.go_to_course_components_catalog();

        const courseComponentTitle = `Test Course Component - ${Date.now()}`;
        const courseComponentDescription = `Test Course Component Description - ${Date.now()}`;

        cy.create_new_course_component(courseComponentTitle, courseComponentDescription, 'EXERCISE');
        cy.assert_is_course_component_visible_in_the_list(courseComponentTitle)
    });

    it('successfully creates a new course component - type evaluation', () => {
        // Go to menu tab
        cy.go_to_course_components_catalog();

        const courseComponentTitle = `Test Course Component - ${Date.now()}`;
        const courseComponentDescription = `Test Course Component Description - ${Date.now()}`;

        cy.create_new_course_component(courseComponentTitle, courseComponentDescription, 'EVALUATION');
        cy.assert_is_course_component_visible_in_the_list(courseComponentTitle)
    });

});