// https://docs.cypress.io/api/introduction/api.html

describe('Sanity test, test that should always pass', () => {
  it('visits the app root url', () => {
    cy.visit("/")
    cy.contains("#header a:first-child", "Music")
  })
})
