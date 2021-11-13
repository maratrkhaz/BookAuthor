import { Dispatch } from 'redux';
import agent from './../../api/agent';
import { IUserFormValues } from '../../models/userType';
import { USER_ACTION_TYPES } from './userActionTypes';
import {history} from '../../../index';
import { MODAL_ACTION_TYPES } from './modalActionType';

export function Login (data: IUserFormValues ) {
    return (dispatch: Dispatch) => {
    agent.UserAccount.login(data)
        .then(res => {
            if (res.token) {
                window.localStorage.setItem('token', res.token)
                dispatch({
                    type: USER_ACTION_TYPES.LOGIN,
                    payload: res
                })
            } else {
                console.log('log error')
            }
        })
        .then(() => {
            history.push('/books')
        })
        .then(()=>dispatch({
            type: MODAL_ACTION_TYPES.CLOSE_MODAL,
            payload: null
        }))
        .catch(err => console.log(err))
    }
}

export function Logout ( ) {
    return (dispatch: Dispatch) => {
        window.localStorage.removeItem('token')
        dispatch({
            type: USER_ACTION_TYPES.LOGOUT,
            payload: null
        })
        history.push('/')
    }
}

export function GetUser () {
    return (dispatch: Dispatch) => {
        agent.UserAccount.current()
            .then(res => {
                dispatch({
                    type: USER_ACTION_TYPES.GET_USER,
                    payload: res
                })
            })
            .catch(err => console.log(err))
        }
}
