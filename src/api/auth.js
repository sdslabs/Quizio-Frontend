import axiosInstance from './axiosInstance';

export const Login = () => {
  axiosInstance.get('/auth/google', {});
};

export async function ResendLink(email) {
  return axiosInstance.post('/auth/resend', { email });
}

export async function sendMailToResetPassword(email) {
  return axiosInstance.post('/auth/resetPassword/sendMail', { email });
}
export async function sendRequestToResetPassowrd(token, password) {
  return axiosInstance.post('/auth/resetPassword/reset', { token, new_password: password });
}
