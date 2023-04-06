describe('Visit homepage', () => {
  it('passes', () => {
    cy.visit('localhost:3000/')
    
    // set up an intercept for image grab
    cy.intercept(
      {
        method: 'GET',
        url: '/data/*',
      },
      // This is where we put what we want the response to look like
      []
    ).as('getData') // and assign an alias
  })
})