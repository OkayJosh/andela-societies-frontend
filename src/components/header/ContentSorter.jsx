import React, { Component, Fragment } from 'react';
import PropType from 'prop-types';

import capitalizeString from '../../helpers/stringFormatter';

/**
 * @name ContentSorter
 * @summary Renders a content sorter
 * @extends React.Component
 */
class ContentSorter extends Component {
  /**
   * @name propTypes
   * @type {PropType}
   * @param {Object} propTypes - React PropTypes
   * @property {Function} sortContentBy - Returns a list of objects sorted by provided param
   */
  static propTypes = {
    sortParam: PropType.string,
  };

  /**
   * @name defaultProps
   * @type {PropType}
   * @property {Function} sortContentBy - function to sort objects by param
  */
  static defaultProps = {
    sortParam: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      sortParam: 'name',
      activeClass: 'filterOptions__option--active',
    };
  }

  renderSortBy = () => {
    const {
      sortParam,
      activeClass,
    } = this.state;
    return (
      <div className='filterOptions'>
        <button
          className={`filterOptions__button ${sortParam ? activeClass : ''}`}
          onClick={this.sortContentBy()}
        >
          {capitalizeString(sortParam)}
        </button>
      </div>
    );
  }

  render() {
    const {
      sortParam,
    } = this.props;
    return (
      <header className='pageHeader'>
        {
          sortParam ?
            this.renderSortBy()
            : null
        }
      </header>
    );
  }
}

export default ContentSorter;
