import { isProduction } from '@config/config';

// eslint-disable-next-line
const log = (msg, data) => console.log(`[LOG]: ${typeof msg === 'string' ? msg : ''}`, typeof msg === 'string' ? data || '' : msg);

export default isProduction ? () => { } : log;
