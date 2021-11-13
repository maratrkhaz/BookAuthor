import { Dispatch } from 'redux';
import {ACTION_TYPES} from './bookActionTypes'
import agent from '../../api/agent';
import { Book } from '../../models/bookType';
import {history} from '../../../index';
import { IPagingParams, PageParams } from '../../models/pagination';

export function fetchAll (inputParams:IPagingParams) {
    //console.log(inputParams);

    const urlparams = new URLSearchParams();
    if (inputParams) {
        urlparams.append('pageNumber', inputParams.pageNumber.toString());
        urlparams.append('pageSize', inputParams.pageSize.toString());
    } else {
        urlparams.append('pageNumber', PageParams.pageNumber.toString());
        urlparams.append('pageSize', PageParams.pageSize.toString());
    }

    return (dispatch: Dispatch) => {
        agent.Books.list(urlparams)
        .then(response => {
            //console.log(response);
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response
            })
        })
        .catch(err => console.log(err))
    }
}

export function Create (data: Book/*, onSuccess: any*/) {
    return (dispatch: Dispatch) => {
    agent.Books.create(data)
        .then(res => {
            //console.log(res);
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: data//res.data
            })
            //onSuccess()
        })
        .then(() => {
            history.push('/books')
        })
        .catch(err => {
            dispatch({
                type: ACTION_TYPES.SET_ERROR_MESSAGE,
                payload: err
            })
        })
        //.catch(err => console.log('create'+err))
    }
}

export function Update (data: Book/*, onSuccess: any*/)  {
    return (dispatch: Dispatch) => {
    agent.Books.update(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: data
            })
            //onSuccess()
        })
        .then(() => {
            history.push('/books')
        })
        .catch(err => {
            dispatch({
                type: ACTION_TYPES.SET_ERROR_MESSAGE,
                payload: err
            })
        })
        //.catch(err => console.log('update'+err))
    }
}

export function Delete (id: string/*, onSuccess: any*/)  {
    return (dispatch: Dispatch) => {
    agent.Books.delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            //onSuccess()
        })
        .catch(err => console.log(err))
    }
}

export function SetLoading ()  {
    return (dispatch: Dispatch) => {
            dispatch({
                type: ACTION_TYPES.SET_LOADING,
                payload: true
            })
    }
}

export function SelectBook (id: string)  {
    return (dispatch: Dispatch) => {
        agent.Books.details(id)
        .then(response => {
            //console.log(response);
            dispatch({
                type: ACTION_TYPES.SELECT_BOOK,
                payload: response
            })
        })
        .catch(err => {
            dispatch({
                type: ACTION_TYPES.SET_ERROR_MESSAGE,
                payload: err
            })
        })
        //.catch(err => console.log('details'+err))
    }
}

export function SET_ERROR_MESSAGE (err: string[] | string )  {
    return (dispatch: Dispatch) => {
            dispatch({
                type: ACTION_TYPES.SET_ERROR_MESSAGE,
                payload: err
            })
    }
}

export function CLEAR_ERROR_MESSAGE ()  {
    return (dispatch: Dispatch) => {
            dispatch({
                type: ACTION_TYPES.CLEAR_ERROR_MESSAGE,
                payload: undefined
            })
    }
}

export function CancelSelectedBook ()  {
    return (dispatch: Dispatch) => {
            dispatch({
                type: ACTION_TYPES.CANCEL_SELECTED_BOOK,
                payload: undefined
            })
    }
}

export function CancelSubmitting ()  {
    return (dispatch: Dispatch) => {
            dispatch({
                type: ACTION_TYPES.CANCEL_SUBMITTING,
                payload: false
            })
    }
}

export function SET_PAGING_PARAMS (pparams: IPagingParams)  {
    return (dispatch: Dispatch) => {
            dispatch({
                type: ACTION_TYPES.SET_PAGING_PARAMS,
                payload: pparams
            })
    }
}





