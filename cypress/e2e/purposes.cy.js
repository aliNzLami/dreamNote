describe('purpose', () => {
    it('sections exist', () => {
      cy.visit('https://alinzlami.github.io/dreamNote/')
  
      cy.get('section').should('have.length.at.least', 1)
      cy.get('#purposes').should('exist')
    })
  
    it('purpose title', () => {
      cy.visit('https://alinzlami.github.io/dreamNote/');

      cy.get('#purposes').should('contain', 'For All Purposes')
  
      cy.get('[id="langMenu"]').click();
      cy.get('.dropdown-menu', { timeout: 10000 }).should('exist'); 
      cy.get('.dropdown-menu', { timeout: 10000 }).should('be.visible').should('have.length.at.least', 1)
      cy.get('li.languageBtn').each(($li) => {
        if($li[0].getAttribute("lang") === 'ger') {
          $li.click();
        }
      });
  
      cy.get('#purposes').should('contain', 'Für alle Einsatzzwecke')
    });

    it('purpose items', () => {
        cy.visit('https://alinzlami.github.io/dreamNote/')
    
        cy.get('#purposesItems').find('.col-md-6').should('have.length', 6)
    })
})

