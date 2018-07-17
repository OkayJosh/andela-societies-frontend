import moxios from 'moxios';

import {
  createCategoryFailure,
  createCategoryRequest,
  createCategorySuccess,
} from '../../src/actions/createCategoryActions';
import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
} from '../../src/types';
import categories from '../../src/fixtures/categories';

describe('Create Category Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should create an action to create a category', () => {
    const expectedAction = {
      type: CREATE_CATEGORY_REQUEST,
    };
    expect(createCategoryRequest()).toEqual(expectedAction);
  });

  it('should create an action to set error when delete request fails', () => {
    const expectedAction = {
      type: CREATE_CATEGORY_FAILURE,
      error: { error: 500 },
    };
    expect(createCategoryFailure({ error: 500 })).toEqual(expectedAction);
  });

  it('should create a success action after successfully creating the category', () => {
    const expectedAction = {
      type: CREATE_CATEGORY_SUCCESS,
      category: categories[0],
    };
    expect(createCategorySuccess(categories[0])).toEqual(expectedAction);
  });
});
