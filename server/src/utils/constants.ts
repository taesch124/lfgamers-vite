/* eslint-disable no-magic-numbers */
import { SignOptions } from 'jsonwebtoken';

export const DEFAULT_PORT = 3000;

export const ACCESS_TOKEN_LIFETIME = 1000 * 60 * 1; // 1 minute
export const ACCESS_TOKEN_LIFETIME_STRING: SignOptions['expiresIn'] = '1m';

export const REFRES_TOKEN_LIFETIME = 1000 * 60 * 5; // 5 minutes
export const REFRES_TOKEN_LIFETIME_STRING: SignOptions['expiresIn'] = '5m'; 

// TEMP: export const REFRES_TOKEN_LIFETIME = 1000 * 60 * 60 * 24; // 1 day
// TEMP: export const REFRES_TOKEN_LIFETIME_STRING = '1d'; 