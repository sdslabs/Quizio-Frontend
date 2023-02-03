import axiosInstance from '@api/axiosInstance'

export const updateLogs = ({ body }) => axiosInstance.put('/logs', body)
