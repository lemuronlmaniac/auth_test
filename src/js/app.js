import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';
import './plugins/axios';
import './plugins/materialize';
// login
import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showInputError, removeInputError } from './views/form';
import { login } from './services/auth.service';
import { notify } from './views/notifications';
import { getNews } from './services/news.service';
// register
import API_ENV from './config/api.config';
import { register } from './services/register.service';
import locations from './store/locations';
import registerFormUI from './views/register_form';

const { form, inputEmail, inputPassword } = UI;
const inputs = [inputEmail, inputPassword];
const registerInputs = [
  registerFormUI.country,
  registerFormUI.city,
  registerFormUI.email,
  registerFormUI.password,
  registerFormUI.first_name,
  registerFormUI.last_name,
  registerFormUI.gender,
  registerFormUI.nickname,
  registerFormUI.phone
]
// const {registerForm, registerCountry, registerCity, registerEmail, registerPassword, registerFirstName, registerLastName, registerGender, registerNickname, registerPhone} = registerInputsEls;
const countryAutocomplete = registerFormUI.getCountryAutocomplete;

document.addEventListener('DOMContentLoaded', e => {
  initApp();
  const down_up_btns = document.querySelectorAll('.tabs__down');
  down_up_btns.forEach((btn) => {
    btn.addEventListener('click', toggleUserCard, true);
  });
});
// Events
async function initApp() {
  // Login
  form.addEventListener('submit_', e => {
    e.preventDefault();
    onSubmit();
  });
  inputs.forEach(el => el.addEventListener('focus', () => removeInputError(el)));
  // Register
  await login(API_ENV.email, API_ENV.pass);
  await locations.init();
  registerFormUI.countrySetAutocompleteData(locations.shortCountries);
  registerFormUI.form.addEventListener('submit', e => {
    e.preventDefault();
    onRegisterSubmit();
  });
  registerFormUI.countrySetOnTextChangeMethod(onCountryTextChanged);
}

// Handlers
async function onSubmit() {
  const isValidForm = inputs.every(el => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    await login(inputEmail.value, inputPassword.value);
    await getNews();
    form.reset();
    notify({ msg: 'Login success', className: 'alert-success' });
  } catch (err) {
    notify({ msg: 'Login faild', className: 'alert-danger' });
  }
}

async function onRegisterSubmit() { 
  const isValidForm = registerInputs.every(el => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });
  
  if (!isValidForm) return;

  try {
    const email = registerFormUI.emailValue;
    const pass = registerFormUI.passwordValue;
    const firstName = registerFormUI.firstNameValue;
    const lastName = registerFormUI.lastNameValue;
    const nickname = registerFormUI.nicknameValue;
    const gender = registerFormUI.genderValue;
    const phone = registerFormUI.phoneValue;
    const country = registerFormUI.countryValue;
    const city = registerFormUI.cityValue;
    const date_of_birth_day = registerFormUI.birthtDateDayValue;
    const date_of_birth_month = registerFormUI.birthtDateMonthValue;
    const date_of_birth_year = registerFormUI.birthtDateYearValue;

    const response = await register(email, pass, nickname, firstName, lastName, phone, gender, city, country, date_of_birth_day, date_of_birth_month, date_of_birth_year);
    const {error, message} = response;
    // console.log(error);
    if(!error) {
      registerForm.reset();
      notify({ msg: 'Register success. ' + message, className: 'alert-success' });
    }
    else {
      // console.log(message);
      notify({ msg: 'Register faild. Reason: ' + message, className: 'alert-danger' });
    }
  } catch (err) {
    console.log(err);
    notify({ msg: 'Register faild', className: 'alert-danger' });
  }
}

// Controls use
// реакция на нажатие на карточку - развернуть/скрыть информацию
function toggleUserCard(e) 
{
    let target = e.currentTarget.closest('.tabs__item');
    // console.log(target);
    target.classList.toggle('tabs__item_active');
    // target.classList.remove('tabs__item');
    let iButton = target.querySelector('i');
    // console.log(iButton);
    if(iButton.classList.contains('fa-chevron-down'))
    {
        iButton.classList.remove('fa-chevron-down');
        iButton.classList.add('fa-chevron-up');
    }
    else
    {
        iButton.classList.remove('fa-chevron-up');
        iButton.classList.add('fa-chevron-down');
    }
};

// добавим обработчик на ввод валидной/невалидной страны в автокомплите
async function onCountryTextChanged(event){
  let countryText = event.target.value;
  let hasValInCountries = Object.keys(countryAutocomplete.options.data).some(el => el === countryText);
  let cityInputControl = document.getElementById('autocomplete-city');
  let cityControl = cityInputControl.closest('.input-field')
  // console.log(hasValInCountries);
  if(!hasValInCountries)
  {
    if(!cityControl.classList.contains('disabled_input'))
    {
      // console.log('disable');
      cityControl.classList.add('disabled_input');
    }
  }
  else
  {
    // console.log(cityControl.classList);
    if(cityControl.classList.contains('disabled_input'))
    {
      // console.log('enable');
      await initCities(countryText);
      cityControl.classList.remove('disabled_input');
    }
  }
}

async function initCities(countryText) {
  await locations.initCities(countryText);
  registerFormUI.citySetAutocompleteData(locations.shortCities);
}

// Домашнее задание к проекту Login
// Login and Password существующего пользователя
// Login: denis.m.pcspace@gmail.com
// Password: dmgame12345
// Домашнее задание к проекту Login.
//   Реализовать регистрацию.
// Метод запроса: POST.
// Роут для запроса: /auth/signup
// Пример передаваемых данных (ключи в объекте обязательно должны быть такими же как в примере):
//     email: "denis.m.pcspace@gmail.com",
//     password: "dmgame12345",
//     nickname: "dmgame",
//     first_name: "Denis",
//     last_name: "Mescheryakov",
//     phone: "0631234567",
//     gender_orientation: "male", // or "female"
//     city: "Kharkiv",
//     country: "Ukrane",
//     date_of_birth_day: 01,
//     date_of_birth_month: 03,
//     date_of_birth_year: 1989,
// В ответе от сервера прейдет:
//     {
//     	error: false, 
//     	message: "User created success. On your email sended link. Please verify your email."
//     }
// Для регистрации используйте обязательно настоящий email так как вам туда придет ссылка для активации аккаунта.
// Форму с регистрацией разместите на странице логина в виде табов т.е форма логина отдельный таб, форма регистрации отдельный таб.
//   Реализовать autocomplete в форме регистрации в полях countries и cities
// Метод запроса: GET,
// Роут для запроса: /location/get-countries
// Вам прийдет массив стран, при выборе страны берете индекс из массива на котором была страна и делаете GET запрос на адрес location/get-cities/{COUNTRY_INDEX}
// вместо COUNTRY_INDEX подставляете свой ранее полученный индекс страны индекс
// В ответ вам прейдет список городов по этой стране, который вы должны вывести в селект.
// Изначально поля для ввода города должно быть disabled.
// В качестве самих эелементов можете использовать нативные элементы из html
// Или можете взять из jQuery UI элемент Autocomplete


// {error: false, message: "User created success. On your email sended link. Please verify your email."}
// error: false
// message: "User created success. On your email sended link. Please verify your email."
// __proto__: Object