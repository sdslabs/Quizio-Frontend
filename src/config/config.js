// export const baseURL = 'https://quizio-sdslabs.herokuapp.com/api/v2';
export const baseURL = process.env.REACT_APP_BASE_URL;
export const timerURL = process.env.REACT_APP_TIMER_URL;
export const isProduction = process.env.NODE_ENV === 'production';
