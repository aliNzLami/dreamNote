describe('gallery', () => {
    it('gallery exist', () => {
      cy.visit('https://alinzlami.github.io/dreamNote/')
  
      cy.get('#ourGallery').should('exist')
    })
  
    it('gallery title', () => {
      cy.visit('https://alinzlami.github.io/dreamNote/');

      cy.get('#ourGallery').should('contain', 'Our Gallery')
  
      cy.get('[id="langMenu"]').click();
      cy.get('.dropdown-menu', { timeout: 10000 }).should('exist'); 
      cy.get('.dropdown-menu', { timeout: 10000 }).should('be.visible').should('have.length.at.least', 1)
      cy.get('li.languageBtn').each(($li) => {
        if($li[0].getAttribute("lang") === 'ger') {
          $li.click();
        }
      });
  
      cy.get('#ourGallery').should('contain', 'Unsere Galerie')
    });

    it('gallery items', () => {
        cy.visit('https://alinzlami.github.io/dreamNote/')
    
        cy.get('#ourGalleryList', { timeout: 20000 })
        .children('.gallery-img-height')
        .children('.gallery-img')
        .children('img')
        .should('have.length', 6)
        .should('have.attr', 'src')
        .and('not.be.empty')  
    })
})

