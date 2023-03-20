describe('Login and Logout', () => {
    beforeEach(() => {
      // visit the login page before each test
      cy.visit('http://127.0.0.1:8000')
    })
  
    it('Logs in and out successfully', () => {
      // type in username and password
      cy.get('#basic_username').type('jakubszwajka')
      cy.get('#basic_password').type('adminadmin')
  
      // click on login button
      cy.get('button[type="submit"]').click()
  
      // verify user is redirected to courses page
      cy.url().should('include', '/courses')
  
      // click on the logout button
      cy.contains('Wyloguj').click()
  
      // verify user is redirected to the login page
      cy.url().should('include', '/')
    })
  })
  