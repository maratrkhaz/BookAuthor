import { Reducer } from 'react';
import { ModalState } from '../../models/modalType';
import { MODAL_ACTION_TYPES } from '../actions/modalActionType';

const initialState : ModalState  = {
    open: false,
    body: null
 }
 
 export const modalReducer: Reducer<ModalState, any> = (state: ModalState = initialState, action: any) => {
    switch (action.type) {
        case MODAL_ACTION_TYPES.OPEN_MODAL:
            return {
                ...state,
                open: true,
                body: action.payload
            }

        case MODAL_ACTION_TYPES.CLOSE_MODAL:
                return {
                    ...state,
                    open: false,
                    body: action.payload
                }

            default:
                return state
        }
    }
