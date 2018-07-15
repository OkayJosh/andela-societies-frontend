import React from 'react';
import { mount, shallow } from 'enzyme';
import CategoryCard from '../../../src/components/categories/CategoryCard';
import categories from '../../../src/fixtures/categories';

describe('<CategoryCard />', () => {
  const props = {
    page: '/u/categories',
  };
  const wrapper = mount.bind(
    null,
    <CategoryCard {...categories[0]} />,
  );

  it('should render without crashing', () => {
    expect(wrapper).not.toThrowError();
  });

  let shallowWrapper;

  beforeEach(() => {
    shallowWrapper = shallow(<CategoryCard {...props} {...categories[0]} />);
  });

  it('should render at least a description', () => {
    expect(wrapper().find('.activity__description').length).toBe(1);
  });

  it('should render category details', () => {
    expect(wrapper().find('.category').length).toBe(1);
  });

  it('should render delete button on categories page', () => {
    expect(shallowWrapper.find('.deleteCategory__button').length).toBe(1);
  });

  it('should render check box on categories page cards', () => {
    expect(shallowWrapper.find('.category__checkbox').length).toBe(1);
  });

  it('should change state when a checkbox of a category is clicked', () => {
    shallowWrapper.setState({ isCategoryChecked: true });
    const checkbox = shallowWrapper.find('.category__checkbox');
    checkbox.simulate('change');
    expect(shallowWrapper.state().isCategoryChecked).toBe(false);
  });
});
