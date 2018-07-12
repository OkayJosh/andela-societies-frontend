import React from 'react';
import { mount } from 'enzyme';
import CategoryCard from '../../../src/components/categories/CategoryCard';
import categories from '../../../src/fixtures/categories';

describe('<CategoryCard />', () => {
  const wrapper = mount.bind(
    null,
    <CategoryCard {...categories} />,
  );

  it('should render without crashing', () => {
    expect(wrapper).not.toThrowError();
  });
});
