import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dateFormatter } from '../helpers';
import ActivityCard from '../components/activities/ActivityCard';
import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import LinearLayout from '../containers/LinearLayout';
import Stats from '../components/sidebar/Stats';
import stats from '../fixtures/stats';


class Categories extends Component {
  /**
    * @name Categories
    * @type {propTypes}
    * @param {Object} props - React PropTypes`
    */
  static propTypes = {
    requesting: PropTypes.bool.isRequired,
    history: PropTypes.shape({
      location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  /**
   * @name renderLayout
   * @summary renders different layout depending on role
   * @returns {void}
   */
  renderLayout() {
    const {
      categories,
    } = this.state;
    const page = this.props.history.location.pathname;
    return (
      <LinearLayout
        items={
          categories.map((activity) => {
            const {
              id,
              category,
              date,
              description,
              points,
              status,
            } = activity;
            return (<ActivityCard
              id={id}
              category={category}
              date={dateFormatter(date)}
              description={description || 'There is no description for this activity'}
              points={points}
              status={status}
              page={page}
              handleClick={this.handleClick}
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
    const hideFilter = true;

    return (
      <Page>
        <div className='mainContent'>
          <div className='Categories'>
            <PageHeader
              title='Categories'
              hideFilter={hideFilter}
            />
            <div className='activities'>
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
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  requesting: state.societyActivities.requesting,
  roles: state.userProfile.info.roles,
});

export default connect(mapStateToProps, null)(Categories);
