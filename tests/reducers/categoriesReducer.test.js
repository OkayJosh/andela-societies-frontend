import categoriesReducer from '../../src/reducers/categoriesReducer';
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
} from '../../src/types';
import categories from '../../src/fixtures/categories';
import store from '../../src/fixtures/store';

describe('categoriesReducer', () => {
  const initialState = store.categories;

  it('should set default initial state', () => {
    expect(categoriesReducer(undefined, {})).toEqual(initialState);
  });

  it('should return initial state when action is not defined', () => {
    expect(categoriesReducer(initialState, { type: 'DOES_NOT_EXIST' })).toEqual(initialState);
  });

  it('should handle FETCH_CATEGORIES_REQUEST', () => {
    expect(categoriesReducer(initialState, {
      type: FETCH_CATEGORIES_REQUEST,
    })).toEqual({
      requesting: true,
      categories: store.categories.categories,
      error: {},
      message: null,
    });
  });

  it('should handle FETCH_CATEGORIES_FAILURE', () => {
    expect(categoriesReducer(initialState, {
      type: FETCH_CATEGORIES_FAILURE,
      error: { error: 404 },
    })).toEqual({
      requesting: false,
      error: { error: 404 },
      categories: [],
      message: null,
    });
  });

  it('should handle FETCH_SOCIETY_INFO_SUCCESS', () => {
    expect(categoriesReducer(initialState, {
      type: FETCH_CATEGORIES_SUCCESS,
      categories,
    })).toEqual({
      requesting: false,
      error: {},
      categories,
      message: null,
    });
  });

  it('should handle DELETE_CATEGORY_REQUEST', () => {
    expect(categoriesReducer(initialState, {
      type: DELETE_CATEGORY_REQUEST,
    })).toEqual({
      updating: true,
      error: {},
      categories: initialState.categories,
      message: null,
      requesting: false,
    });
  });

  it('should handle DELETE_CATEGORY_FAILURE', () => {
    expect(categoriesReducer(initialState, {
      type: DELETE_CATEGORY_FAILURE,
      error: { error: 404 },
    })).toEqual({
      requesting: false,
      updating: false,
      error: { error: 404 },
      categories: initialState.categories,
      message: null,
    });
  });

  it('should handle DELETE_CATEGORY_SUCCESS', () => {
    initialState.categories = categories;
    const updatedCategories = initialState.categories.filter(category => (
      category.id !== categories[0].id
    ));
    expect(categoriesReducer(initialState, {
      type: DELETE_CATEGORY_SUCCESS,
      id: categories[0].id,
    })).toEqual({
      requesting: false,
      updating: false,
      error: {},
      categories: updatedCategories,
      message: null,
    });
  });

  it('should handle CREATE_CATEGORY_REQUEST', () => {
    expect(categoriesReducer(initialState, {
      type: CREATE_CATEGORY_REQUEST,
    })).toEqual({
      error: {},
      categories: initialState.categories,
      message: {
        type: 'info',
        text: 'Sending ...',
      },
      requesting: false,
    });
  });

  it('should handle CREATE_CATEGORY_FAILURE', () => {
    expect(categoriesReducer(initialState, {
      type: CREATE_CATEGORY_FAILURE,
      error: { error: 404 },
    })).toEqual({
      requesting: false,
      error: { error: 404 },
      categories: initialState.categories,
      message: {
        type: 'error',
        text: 'An error has occurred',
      },
    });
  });

  it('should handle CREATE_CATEGORY_SUCCESS', () => {
    initialState.categories = [];
    expect(categoriesReducer(initialState, {
      type: CREATE_CATEGORY_SUCCESS,
      category: categories[0],
    })).toEqual({
      requesting: false,
      error: {},
      categories: [categories[0]],
      message: {
        type: 'success',
        text: 'Category Created Successfully',
      },
    });
  });
});
