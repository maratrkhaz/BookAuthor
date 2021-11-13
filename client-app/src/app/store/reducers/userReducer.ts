import { USER_ACTION_TYPES } from '../actions/userActionTypes';
import {IUser, UserState } from '../../models/userType';
import { Reducer } from 'react';

//var userinlocal :IUser
//const userinlocal: string = localStorage.getItem('user')!;

const initialState : UserState  = {
   user: null,
   token: window.localStorage.getItem('token')
}

export const userReducer: Reducer<UserState, any> = (state: UserState = initialState, action: any) => {
    switch (action.type) {
        case USER_ACTION_TYPES.LOGIN:
            return {
                ...state,
                user: action.payload,
                token: window.localStorage.getItem('token')
            }
        case USER_ACTION_TYPES.LOGOUT:
            return {
                ...state,
                user: action.payload,
                token: null
            }
        case USER_ACTION_TYPES.GET_USER:
            return {
                ...state,
                user: action.payload
            }   

            default:
                return state
        }
    }
