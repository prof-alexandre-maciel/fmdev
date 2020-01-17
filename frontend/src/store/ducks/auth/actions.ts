import { action } from 'typesafe-actions';
import { AuthTypes } from './types';

export const signInRequest = (email: string, password: string) => action(AuthTypes.SIGN_IN_REQUEST, { email, password });

export const signInSuccess = (token: string) => action(AuthTypes.SIGN_IN_SUCCESS, { token });