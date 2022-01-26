import axiosInstance from './axiosInstance';

export const checkAuth = async (jwtToken) => {
  try {
    const res = await axiosInstance.get(`/auth/login?jwtToken=${jwtToken}`);
    return res.data;
  } catch (e) {
    return e.response.data;
  }
};

export const loginWithJwtToken = async (jwtToken) => {
  try {
    const res = await axiosInstance.get(`/auth/login?jwtToken=${jwtToken}`);
    return res.data;
  } catch (e) {
    return e.response.data;
  }
};

export const Logout = async () => {
  try {
    const res = await axiosInstance.get('/auth/logout');
    return res.data;
  } catch (e) {
    return e.response.data;
  }
};
