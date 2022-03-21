import axiosInstance from '@api/axiosInstance';

export const getResponse = ({ queryKey }) => axiosInstance.get(`/responses/${queryKey[1]}/${queryKey[2]}`);
export const getResponseStatus = ({ queryKey }) => axiosInstance.get(`/responses/status/${queryKey[1]}/${queryKey[2]}`);
export const updateResponse = ({ body }) => axiosInstance.put('/responses', body);
