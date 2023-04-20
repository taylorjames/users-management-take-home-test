import isEmail from 'validator/lib/isEmail';

function isFormFieldValid({ inputName, inputValue }) {
  if (inputValue == null) return false;
  const validations = {
    name: inputValue != '',
    username: inputValue != '',
    email: isEmail(inputValue),
  };

  return validations[inputName];
}

export function getUpdatedInvalidFields(
  invalidFields,
  { inputName, inputValue }
) {
  const invalidFieldsCopy = new Set([...invalidFields]);
  if (!isFormFieldValid({ inputName, inputValue })) {
    invalidFieldsCopy.add(inputName);
  } else {
    invalidFieldsCopy.delete(inputName);
  }
  return invalidFieldsCopy;
}

export function isFormValid(formData) {
  const formFields = Object.entries(formData.fields);
  for (const [inputName, inputValue] of formFields) {
    if (inputName == 'id') continue;
    if (!isFormFieldValid({ inputName, inputValue })) {
      return false;
    }
  }
  return true;
}
