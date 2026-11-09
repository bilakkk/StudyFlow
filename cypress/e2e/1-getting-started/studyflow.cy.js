describe('StudyFlow application', () => {
  it('successfully loads the application', () => {
    cy.visit('http://localhost:5175');
    cy.contains('StudyFlow').should('be.visible');
  });
});
