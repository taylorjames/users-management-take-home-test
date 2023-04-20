import React, { useEffect, useState } from 'react';
import { USER_FORM_MODE } from '../constants';
import { getUpdatedInvalidFields, isFormValid } from '../formValidations';
import PropTypes from 'prop-types';

const UserForm = ({ user, formMode, onSubmit, onCancel, isLoading }) => {
  const [formState, setFormState] = useState({
    fields: user,
    updated: false,
    invalidFields: new Set(),
  });

  useEffect(() => {
    setFormState({
      fields: user,
      updated: false,
      invalidFields: new Set(),
    });
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      fields: {
        ...prevState.fields,
        [name]: value,
      },
      updated: true,
    }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const updatedInvalidFields = getUpdatedInvalidFields(
      formState.invalidFields,
      {
        inputName: name,
        inputValue: value,
      }
    );
    setFormState((prevState) => ({
      ...prevState,
      invalidFields: updatedInvalidFields,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formState);
  };

  const isSubmitDisabled =
    formState.invalidFields.size > 0 ||
    !formState.updated ||
    !isFormValid(formState) ||
    isLoading;

  return (
    <section>
      <header>
        <h2>{formMode == USER_FORM_MODE.CREATE ? 'Add User' : 'Edit User'}</h2>
      </header>
      <form className="UserForm">
        <fieldset>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formState.fields.name}
          ></input>
          {formState.invalidFields.has('name') && (
            <span
              id="name-error"
              className="invalid-field"
              aria-live="assertive"
            >
              Name is required.
            </span>
          )}
        </fieldset>
        <fieldset>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formState.fields.username}
          ></input>
          {formState.invalidFields.has('username') && (
            <span
              id="username-error"
              className="invalid-field"
              aria-live="assertive"
            >
              Username is required.
            </span>
          )}
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formState.fields.email}
          ></input>
          {formState.invalidFields.has('email') && (
            <span
              id="email-error"
              className="invalid-field"
              aria-live="assertive"
            >
              Email is required.
            </span>
          )}
        </fieldset>
        <div className="form-buttons">
          <button
            className="submit-button"
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            Submit
          </button>
          <button className="cancel-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

UserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  formMode: PropTypes.oneOf(['create', 'edit']).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default UserForm;
