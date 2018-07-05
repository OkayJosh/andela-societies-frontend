import React from 'react';
import { mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Category from '../../src/containers/Category';
import storeFixture from '../../src/fixtures/store';

const store = createMockStore(storeFixture);

const mounted = mount.bind(
  null,
  <Provider store={store}>
    <MemoryRouter>
      <Category />
    </MemoryRouter>
  </Provider>,
);

describe('<Category />', () => {
  it('should render without crashing', () => {
    expect(mounted).not.toThrow();
  });
});
