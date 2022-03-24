/* eslint-disable import/prefer-default-export */
import axiosInstance from '@api/axiosInstance';

export const updateLogs = ({ userID, body }) => axiosInstance.put(`/logs/${userID}`, body);
