// Импортируем токены и утилиты для работы с куками
import tokens from '../fixtures/tokens.json';
import { setCookie, deleteCookie } from '../../src/utils/cookie';
import order from '../fixtures/order.json';

// Добавляем команду Cypress для клика по кнопке
Cypress.Commands.add('clickButton', function (name) {
  cy.get(''.concat(name)).find('button').first().click();
});

// Начинаем описание теста главной страницы
describe('ТЕСТ ГЛАВНОЙ СТРАНИЦЫ', () => {
  // Выполняем действия перед каждым тестом
  beforeEach(() => {
    // Переходим на главную страницу
    cy.visit('/');
    // Перехватываем запрос на получение ингредиентов и подменяем ответ на фикстуру
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    // Ждем завершения перехвата
    cy.wait('@getIngredients');

    // Сохраняем ссылки на элементы ингредиентов для дальнейшего использования
    cy.get(`[data-cy=${'643d69a5c3f7b9001cfa093c'}]`).as('testBun');
    cy.get(`[data-cy=${'643d69a5c3f7b9001cfa093e'}]`).as('testFilling');
    cy.get(`[data-cy=${'643d69a5c3f7b9001cfa0942'}]`).as('testSauce');
  });

  // Тест на добавление ингредиентов в конструктор
  it('добавление ингредиентов в конструктор', () => {
    // Кликаем по булке и проверяем, что она добавлена
    cy.clickButton('@testBun');
    cy.get('[data-cy="constructorItemBun"]')
      .find('span')
      .contains('Краторная булка N-200i')
      .should('exist');

    // Кликаем по начинке и проверяем, что она добавлена
    cy.clickButton('@testFilling');
    cy.get('[data-cy="constructorItemFilling"]')
      .find('span')
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('exist');

    // Кликаем по соусу и проверяем, что он добавлен
    cy.clickButton('@testSauce');
    cy.get('[data-cy="constructorItemFilling"]')
      .find('span')
      .contains('Соус Spicy-X')
      .should('exist');
  });

  // Начинаем тестирование модалки ингредиента
  describe('ТЕСТ МОДАЛКИ ИНГРИДИЕНТА', () => {
    beforeEach(() => {
      // Открываем модалку для булки
      cy.get('@testBun').find('a').click();
      cy.get('[data-cy="modal"]').as('modal');
    });

    // Тест на открытие модалки
    it('открытие модалки', () => {
      cy.get('@modal').should('exist'); // Проверяем, что модалка открыта
    });

    // Тест на закрытие модалки по кнопке "крестик"
    it('закрытие на крестик', () => {
      cy.clickButton('@modal'); // Кликаем по кнопке закрытия
      cy.get('@modal').should('not.exist'); // Проверяем, что модалка закрыта
    });

    // Тест на закрытие модалки по клику на оверлей
    it('закрытие на оверлей', () => {
      cy.get('[data-cy="modalOverlay"]').click({ force: true }); // Кликаем на оверлей
      cy.get('@modal').should('not.exist'); // Проверяем, что модалка закрыта
    });
  });

  // Начинаем тестирование создания заказа
  describe('ТЕСТ СОЗДАНИЯ ЗАКАЗА', () => {
    beforeEach(() => {
      // Переходим на главную страницу и устанавливаем куки
      cy.visit('/');
      setCookie('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      // Перехватываем запрос на получение пользователя
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
        'getUser'
      );
      cy.wait('@getUser');
      // Перехватываем запрос на создание заказа
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
        'getOrder'
      );
    });

    // Очищаем локальное хранилище и куки после каждого теста
    afterEach(() => {
      localStorage.clear();
      deleteCookie('accessToken');
    });

    // Тест на отправку заказа
    it('отправка заказа', () => {
      // Добавляем ингредиенты в заказ
      cy.clickButton('@testBun');
      cy.clickButton('@testFilling');
      cy.clickButton('@testSauce');

      // Проверяем, что кнопка заказа активна и кликаем по ней
      cy.get('[data-cy="orderButton"]').should('be.enabled').click();
      cy.wait('@getOrder'); // Ждем завершения запроса на создание заказа

      // Проверяем, что модалка заказа открыта и содержит номер заказа
      cy.get('[data-cy="modal"]').as('modal');
      cy.get('@modal').should('exist');
      cy.get('@modal').find('h2').contains(order.order.number);

      // Закрываем модалку
      cy.clickButton('@modal');
      cy.get('@modal').should('not.exist');

      // Проверяем, что конструктор очищен
      cy.get('[data-cy="constructorItemNoBun"]').should('exist');
      cy.get('[data-cy="constructorItemNoFillings"]').should('exist');
    });
  });
});
