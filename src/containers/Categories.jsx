import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CategoryCard from '../components/categories/CategoryCard';
import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import LinearLayout from '../containers/LinearLayout';

import { fetchCategories } from '../actions/categoriesActions';
import { deleteCategory } from '../actions/deleteCategoryActions';
import SnackBar from '../components/notifications/SnackBar';


class Categories extends Component {
  /**
    * @name Categories
    * @type {propTypes}
    * @param {Object} props - React PropTypes`
    */
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    fetchCategories: PropTypes.func.isRequired,
    requesting: PropTypes.bool.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    history: PropTypes.shape({
      location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedCategories: [],
    };
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  handleClick = (categoryId) => {
    this.props.deleteCategory(categoryId);
  }

  /**
   * @name renderLayout
   * @summary renders different layout depending on role
   * @returns {void}
   */
  renderLayout() {
    const {
      selectedCategories,
    } = this.state;
    const { categories } = this.props;
    const page = this.props.history.location.pathname;
    return (
      <LinearLayout
        items={
          categories.map((category) => {
            const {
              id,
              name,
              description,
              value,
            } = category;
            return (<CategoryCard
              id={id}
              name={name}
              description={description}
              value={value}
              page={page}
              handleClick={this.handleClick}
              selectedCategories={selectedCategories}
              handleDeselectCategory={this.handleDeselectCategory}
              wordCount={70}
            />);
          })
        }
      />
    );
  }

  /**
   * @name categories
   * @summary Renders Categories page
   * @return React node that displays the Categories page
   */
  render() {
    const { requesting } = this.props;
    const { message } = this.state;
    let snackBarMessage = '';
    if (message) {
      snackBarMessage = <SnackBar message={message} />;
    }
    const hideFilter = true;
    const categoriesHTML = requesting ?
      <h3 className='loader'>Loading... </h3>
      :
      this.renderLayout();

    return (
      <Page>
        <div className='mainContent'>
          <div className='Categories'>
            <PageHeader
              title='Categories'
              hideFilter={hideFilter}
              handleSelectAllClick={this.handleSelectAllClick}
            />
            <div className='categories'>
              {
                categoriesHTML
              }
            </div>
          </div>
        </div>
        { snackBarMessage }
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  requesting: state.societyActivities.requesting,
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  deleteCategory: categoryId => dispatch(deleteCategory(categoryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
