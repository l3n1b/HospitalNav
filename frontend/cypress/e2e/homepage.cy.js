describe('Visit homepage', () => {
  
  it('Should visit the homepage and be redirected to start selector', () => {
    cy.visit('localhost:3000/')

    cy.url().should('be.equal', 'localhost:3000/')
    
  })

  it('Should visit the homepage with a start and be redirected to end selector', () => {
    cy.visit('localhost:3000/')

    cy.url().should('be.equal', 'localhost:3000/')
    
  })

  it('Should visit the homepage with a start and an end', () => {
    cy.visit('localhost:3000/')

    cy.url().should('be.equal', 'localhost:3000/')

    // check that the frontend makes a request to the backend for images
    cy.intercept('/users*', { hostname: 'localhost' }, (req) => {
      /* do something with request and/or response */
    })
    
  })
})