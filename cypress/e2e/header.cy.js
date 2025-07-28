describe('header', () => {
  it('nav links exist', () => {
    cy.visit('https://alinzlami.github.io/dreamNote/')

    cy.get('li.nav-items').each(($li) => {
      cy.wrap($li).children('a').should('have.length.at.least', 1);
    });
  })

  it('Selects German and verifies the language switch', () => {
    cy.visit('https://alinzlami.github.io/dreamNote/');

    cy.get('[id="langMenu"]').click();
    cy.get('.dropdown-menu', { timeout: 10000 }).should('exist'); 
    cy.get('.dropdown-menu', { timeout: 10000 }).should('be.visible').should('have.length.at.least', 1)

    cy.get('li.languageBtn').each(($li) => {
      if($li[0].getAttribute("lang") === 'ger') {
        $li.click();
      }
    });

    cy.get('li.nav-items')
    .should('contain', 'Kontakt')
    .should('contain', 'Über Uns')
  });
})