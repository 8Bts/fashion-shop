import configureMockStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';
import nock from 'nock';
import * as Action from '../../redux/actions/index';

const middlewares = [promise];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates FETCH_ALL_ITEMS when fetching items has been done', () => {
    nock('https://fashion-shop-api.herokuapp.com')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/items')
      .reply(200, []);

    return store.dispatch(Action.fetchAllItems())
      .then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });

  it('creates FETCH_SINGLE_ITEM_FULFILLED when fetching single item has been done', () => {
    nock('https://fashion-shop-api.herokuapp.com')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/items/1')
      .reply(200, []);

    return store.dispatch(Action.fetchItem(1))
      .then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });

  it('creates FETCH_ALL_CATEGORIES_FULFILLED when fetching all categories has been done', () => {
    nock('https://fashion-shop-api.herokuapp.com')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/categories')
      .reply(200, []);

    return store.dispatch(Action.fetchAllCategories())
      .then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });

  it('creates FETCH_CATEGORY_FULFILLED when fetching single category has been done', () => {
    nock('https://fashion-shop-api.herokuapp.com')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/categories/1')
      .reply(200, []);

    return store.dispatch(Action.fetchCategory(1))
      .then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
  });
});
