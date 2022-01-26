import axiosInstance from '@api/axiosInstance';

export const verifyToken = (jwtToken) => axiosInstance.get(`/auth/login?jwtToken=${jwtToken}`);

export const logout = () => axiosInstance.get('/auth/logout');
