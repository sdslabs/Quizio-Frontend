import axiosInstance from './axiosInstance';

export async function signUp(firstName, middleName, lastName, email, password, oauthToken = '') {
  if (oauthToken) {
    return axiosInstance.post('/auth/signUp/oauth', {
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      email,
      password,
      token: oauthToken,
    });
  }
  return axiosInstance.post('/auth/signUp', {
    first_name: firstName, middle_name: middleName, last_name: lastName, email, password,
  });
}
export async function signIn(email, password) {
  return axiosInstance.post('/auth/signIn', { email, password });
}

export async function ResendLink(email) {
  return axiosInstance.post('/auth/resend', { email });
}

export async function sendMailToResetPassword(email) {
  return axiosInstance.post('/auth/resetPassword/sendMail', { email });
}
export async function sendRequestToResetPassowrd(token, password) {
  return axiosInstance.post('/auth/resetPassword/reset', { token, new_password: password });
}
