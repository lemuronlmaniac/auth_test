import {
    getAutocompleteInstance,
    getDatePickerInstance,
  } from '../plugins/materialize/materialize';

import RegisterUI from '../config/register.ui.config';
import { removeInputError } from './form';

class RegisterFormUI {
  constructor(autocompleteInstance, datePickerInstance) {
    this.$form = document.forms['registerForm'];
    this.birth_date = datePickerInstance(RegisterUI.inputBirthDate);
    // this.birth_date = RegisterUI.inputBirthDate;
    this.country = RegisterUI.inputCountry;
    this.countryAutocomplete = autocompleteInstance(this.country);
    // console.log(this.countryAutocomplete);
    this.city = RegisterUI.inputCity;
    this.cityAutocomplete = autocompleteInstance(this.city);

    this.email = RegisterUI.inputRegisterEmail;
    this.password = RegisterUI.inputRegisterPassword;
    this.first_name = RegisterUI.inputFirstName;
    this.last_name = RegisterUI.inputLastName;
    this.gender = RegisterUI.inputGender;
    this.nickname = RegisterUI.inputNickName;
    this.phone = RegisterUI.inputPhone;

    const registerInputs = [this.email, this.password, this.first_name, this.last_name, this.gender,  this.nickname, this.phone];
    registerInputs.forEach(el => el.addEventListener('focus', () => removeInputError(el)));
  }

  get form() {
    return this.$form;
  }

  get countryValue() {
    return this.country.value;
  }

  get cityValue() {
      return this.city.value;
    }

  get birthtDateValue() {
    // console.log(this.birth_date.value);
    return this.birth_date.toString();
  }
  
  countrySetAutocompleteData(data) {
    this.countryAutocomplete.updateData(data);
  }

  citySetAutocompleteData(data) {
    this.cityAutocomplete.updateData(data);
  }

  countrySetOnTextChangeMethod(method) {
    this.country.addEventListener('change', method);
  }

  get emailValue() {
    return this.email.value;
  }
  get passwordValue() {
    return this.password.value;
  }
  get firstNameValue() {
    return this.first_name.value;
  }
  get lastNameValue() {
    return this.last_name.value;
  }
  get genderValue() {
    return this.gender.value;
  }
  get nicknameValue() {
    return this.nickname.value;
  }
  get phoneValue() {
    return this.phone.value;
  }

  get birthtDateDayValue() {
    return this.birthtDateValue.substr(8,2);
  }

  get birthtDateMonthValue() {
    return this.birthtDateValue.substr(5,2);
  }

  get birthtDateYearValue() {
    return this.birthtDateValue.substr(0,4);
  }

  get getCountryAutocomplete() {
    return this.countryAutocomplete;
  }
}
  
const registerFormUI = new RegisterFormUI(getAutocompleteInstance, getDatePickerInstance);

export default registerFormUI;