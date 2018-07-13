import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CategoryCard from '../components/categories/CategoryCard';
import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import LinearLayout from '../containers/LinearLayout';
import Stats from '../components/sidebar/Stats';
import stats from '../fixtures/stats';

import { fetchCategories, deleteCategory } from '../actions/categoriesActions';
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
      categories: [],
      isSelectAllChecked: false,
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
   * @name handleSelectAllClick
   * @summary toggles state when select all is checked and updates it with selected categories
   * @returns {void}
   */
  handleSelectAllClick = () => {
    const { isSelectAllChecked, categories } = this.state;
    const selectedCategories = categories.filter(category =>
      (!isSelectAllChecked && category.id)).map(category => category.id);
    this.setState({ isSelectAllChecked: !isSelectAllChecked, selectedCategories });
  }

  /**
   * @name handleDeselectCategory
   * @summary updates state with categirues deselected using the checkbox
   * @param {string} id - id of the category deselected
   * @returns {void}
   */
  handleDeselectCategory = (id) => {
    const { selectedCategories } = this.state;
    const selected = selectedCategories.filter(categoryId => categoryId !== id);
    this.setState({ selectedCategories: selected });
  }

  /**
   * @name handleDeleteAllClick
   * @summary handles calling the action to delete selected categories
   * @returns void
   */
  handleDeleteAll = () => {
    const { selectedCategories } = this.state;
    if (!selectedCategories.length) {
      this.setState({
        message: ({
          text: 'Please Select a Category to Delete',
          type: 'error',
        }),
      });
    }

    this.props.deleteCategory(selectedCategories);
  };

  /**
   * @name renderLayout
   * @summary renders different layout depending on role
   * @returns {void}
   */
  renderLayout() {
    const {
      isSelectAllChecked,
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
              isSelectAllChecked={isSelectAllChecked}
              selectedCategories={selectedCategories}
              handleDeselectCategory={this.handleDeselectCategory}
              wordCount={50}
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

    return (
      <Page>
        <div className='mainContent'>
          <div className='Categories'>
            <PageHeader
              title='Categories'
              hideFilter={hideFilter}
            />
            <div className='categories'>
              {
                requesting ?
                  <h3 className='loader'>Loading... </h3>
                  :
                  this.renderLayout()
              }
            </div>
          </div>
        </div>
        <aside className='sideContent'>
          <Stats
            stats={stats}
          />
        </aside>
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
  deleteCategory: activityId => dispatch(deleteCategory(activityId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
