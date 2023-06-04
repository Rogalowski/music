
describe('Audio Player', () => {
    it('plays audio', () => {
        cy.visit("/")

        cy.get("cypress-e2e-test:first").click() //first song will be selected
        cy.get("#cypress-play-btn").click()
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(5000)
        cy.get("#cypress-player-play-btn").click()
    })
})
