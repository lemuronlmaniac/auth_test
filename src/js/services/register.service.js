import axios from '../plugins/axios';

/**
 * Function registration. Make registration request to API
 * @param {String} email
 * @param {String} password
 * @param {String} nickname
 * @param {String} first_name
 * @param {String} last_name
 * @param {String} phone
 * @param {String} gender_orientation
 * @param {String} city
 * @param {String} country
 * @param {String} date_of_birth_day
 * @param {String} date_of_birth_month
 * @param {String} date_of_birth_year
 */
export async function register(email, password, nickname, first_name, last_name, phone, gender_orientation, city, country, date_of_birth_day, date_of_birth_month, date_of_birth_year) {
  try {
    const response = await axios.post(
      `/auth/signup `,
      JSON.stringify({ email, password, nickname, first_name, last_name, phone, gender_orientation, city, country, date_of_birth_day, date_of_birth_month, date_of_birth_year }),
    );

    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}