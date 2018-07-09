import React from 'react';
import { mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Categories from '../../src/containers/Categories';
import storeFixture from '../../src/fixtures/store';

const store = createMockStore(storeFixture);
const history = { push: () => { }, location: { pathname: '' } };

describe('<Categories />', () => {
  it('should render without crashing', () => {
    const wrapper = mount.bind(
      null,
      <Provider store={store}>
        <MemoryRouter>
          <Categories.WrappedComponent
            history={history}
            requesting={false}
          />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).not.toThrow();
  });
});
