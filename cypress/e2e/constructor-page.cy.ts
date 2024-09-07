import tokens from '../fixtures/tokens.json';
import { setCookie, deleteCookie } from '../../src/utils/cookie';
import order from '../fixtures/order.json';

Cypress.Commands.add('clickButton', function (name) {
  cy.get(''.concat(name)).find('button').first().click();
});

describe('ТЕСТ ГЛАВНОЙ СТРАНИЦЫ', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.wait('@getIngredients');

    cy.get(`[data-cy=${'643d69a5c3f7b9001cfa093c'}]`).as('testBun');
    cy.get(`[data-cy=${'643d69a5c3f7b9001cfa093e'}]`).as('testFilling');
    cy.get(`[data-cy=${'643d69a5c3f7b9001cfa0942'}]`).as('testSauce');
  });

  it('добавление булки в конструктор', () => {
    cy.get('[data-cy="constructorItemBun"]').should('not.exist');

    cy.clickButton('@testBun');

    cy.get('[data-cy="constructorItemBun"]')
      .find('span')
      .contains('Краторная булка N-200i')
      .should('exist');
  });

  it('добавление начинки в конструктор', () => {
    cy.get('[data-cy="constructorItemFilling"]').should('not.exist');

    cy.clickButton('@testFilling');

    cy.get('[data-cy="constructorItemFilling"]')
      .find('span')
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('exist');
  });

  it('добавление соуса в конструктор', () => {
    cy.get('[data-cy="constructorItemFilling"]').should('not.exist');

    cy.clickButton('@testSauce');

    cy.get('[data-cy="constructorItemFilling"]')
      .find('span')
      .contains('Соус Spicy-X')
      .should('exist');
  });

  describe('ТЕСТ МОДАЛКИ ИНГРИДИЕНТА', () => {
    beforeEach(() => {
      cy.get('[data-cy="modal"]').should('not.exist');
      cy.get('@testBun').find('a').click();
      cy.get('[data-cy="modal"]').as('modal');
    });

    it('открытие модалки', () => {
      cy.get('@modal').should('exist');
      cy.get('@modal').find('h3').should('exist');
    });

    it('закрытие на крестик', () => {
      cy.clickButton('@modal');
      cy.get('@modal').should('not.exist');
    });

    it('закрытие на оверлей', () => {
      cy.get('[data-cy="modalOverlay"]').click({ force: true });
      cy.get('@modal').should('not.exist');
    });
  });

  describe('ТЕСТ СОЗДАНИЯ ЗАКАЗА', () => {
    beforeEach(() => {
      cy.visit('/');
      setCookie('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
        'getUser'
      );
      cy.wait('@getUser');
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
        'getOrder'
      );
    });

    afterEach(() => {
      localStorage.clear();
      deleteCookie('accessToken');
    });

    it('отправка заказа', () => {
      cy.clickButton('@testBun');
      cy.clickButton('@testFilling');
      cy.clickButton('@testSauce');

      cy.get('[data-cy="orderButton"]').should('be.enabled').click();
      cy.wait('@getOrder');

      cy.get('[data-cy="modal"]').as('modal');
      cy.get('@modal').should('exist');
      cy.get('@modal').find('h2').contains(order.order.number);

      cy.clickButton('@modal');
      cy.get('@modal').should('not.exist');

      cy.get('[data-cy="constructorItemNoBun"]').should('exist');
      cy.get('[data-cy="constructorItemNoFillings"]').should('exist');
    });
  });
});
