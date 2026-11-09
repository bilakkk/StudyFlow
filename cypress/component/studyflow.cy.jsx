import { mount } from 'cypress/react';
import App from '../../src/App';

describe('StudyFlow Component', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('displays the login page when the user is not logged in', () => {
    mount(<App />);

    cy.contains('h1', 'З поверненням!').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
  });
});
