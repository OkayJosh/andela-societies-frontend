import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SnackBar from '../../components/notifications/SnackBar';
import SingleInput from '../../common/SingleInput';
import Button from '../../common/Button';
import TextArea from '../../common/TextArea';
import FormError from '../../components/formErrors/FormError';
import { createCategory } from '../../actions/createCategoryActions';
import validateFormFields from '../../helpers/validate';
import capitalizeString from '../../helpers/stringFormatter';

/**
   * @name CreateCategoryForm
   * @summary Returns Form
   * @returns Returns a form
   */
class CreateCategoryForm extends Component {
  /**
   * @name propTypes
   * @type {PropType}
  */
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    createCategory: PropTypes.func.isRequired,
  };

  /**
   * CreateCategoryForm component class constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      name: '',
      description: '',
      errors: [],
      message: null,
    };
  }

  static getDerivedStateFromProps = (nextProps) => {
    // clear form fields if category was created successfully
    if (nextProps.message && nextProps.message.type === 'success') {
      return {
        value: '',
        name: '',
        description: '',
        errors: [],
        message: nextProps.message,
      };
    }
    return {
      message: nextProps.message,
    };
  };
  /**
   * @memberOf CreateCategoryForm
   * change event handler
   * @param {Event} event - change event on select input
   */
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    // if input value is not empty remove it from error list
    if (!this.state[event.target.name]) {
      const errors = this.state.errors.filter(error => !error.includes(event.target.name));
      this.setState({ errors });
    }
  }

  handleAddEvent = (event) => {
    event.preventDefault();
    const {
      name,
      description,
      value,
      errors,
    } = this.state;
    const category = {
      name,
      description,
      value,
    };
    this.setState({
      errors: validateFormFields(category),
    }, () => {
      if (errors.length === 0) {
        this.props.createCategory(category);
      }
    });
  }

  /**
   * @name resetState
   * @summary resets state to clear form fields and error messages
   */
  resetState = () => {
    this.setState({
      name: '',
      value: '',
      description: '',
      errors: [],
      message: null,
    });
  }

  /**
   * @name cancelModal
   * @summary reset state and close modal
   */
  cancelModal = (event) => {
    event.preventDefault();
    this.resetState();
    this.props.closeModal();
  }

  renderValidationError = (field, replaceWord) => {
    if (this.state.errors.indexOf(field) >= 0) {
      return `${capitalizeString(replaceWord || field)} is required`;
    }
    return '';
  }

  render() {
    const { message } = this.state;

    return (
      <form>
        <div className='titleForm'>Create a Category</div>
        <SingleInput
          type='text'
          name='name'
          title='Name'
          value={this.state.name}
          handleChange={this.handleChange}
        />
        <span className='validate__errors'>
          {this.renderValidationError('name')}
        </span>
        <SingleInput
          type='number'
          name='value'
          value={this.state.value}
          title='Number of points'
          handleChange={this.handleChange}
        />
        <span className='validate__errors'>
          {this.renderValidationError('value')}
        </span>
        <FormError errors={this.state.errors} fieldName='points' />
        <TextArea
          title='Description'
          rows={5}
          resize={false}
          name='description'
          placeholder='keep it brief'
          handleChange={this.handleChange}
          value={this.state.description}
        />
        <span className='validate__errors'>
          {this.renderValidationError('description')}
        </span>
        <div>
          <Button
            name='fellowButtonSubmit'
            value='Create'
            className={`submitButton ${message && message.type === 'info' ? 'submitButton--disabled' : ''}`}
            onClick={this.handleAddEvent}
          />
          <Button
            name='fellowButtonCancel'
            value='Cancel'
            className='cancelButton'
            onClick={this.cancelModal}
          />
        </div>
        {
          message && <SnackBar message={message} />
        }
      </form>
    );
  }
}

const mapStateToProps = state => ({
  message: state.categories.message,
});

const mapDispatchToProps = dispatch => ({
  createCategory: category => dispatch(createCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategoryForm);
