import axiosInstance from './axiosInstance';

export const Login = async (username) => {
  try {
    const user = await axiosInstance.get(`/users/${username}`);
    if (user.status === 200) {
      return user.data.data.user;
    }
  } catch (e) {
    // console.error(e);
    return null;
  }
  return null;
};

export const t = 1;
