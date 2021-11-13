import { Dispatch } from 'redux';
import { MODAL_ACTION_TYPES } from './modalActionType';

export function OpenModal (data: JSX.Element ) {
    return (dispatch: Dispatch) => {
        dispatch({
            type: MODAL_ACTION_TYPES.OPEN_MODAL,
            payload: data
        })
    }
}

export function CloseModal () {
    return (dispatch: Dispatch) => {
        dispatch({
            type: MODAL_ACTION_TYPES.CLOSE_MODAL,
            payload: null
        })
    }
}
